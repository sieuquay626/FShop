require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const service = require('../services/support');
const sendMail = require('../services/sendMail');
const passport = require('passport');
const { findByIdAndUpdate } = require('../models/userModel');
const { resetEmail } = require('../config/template');
const userCtrl = {
  register: async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password, role, avatar, mobile, address } = req.body;
      console.log(role, avatar, mobile, address);
      if (!service.validateEmail(email))
        return res.status(400).json({ msg: "The email dont't match " });
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'The email already exits' });
      }

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password is at least 6 characters long' });
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashPassword,
        profile: {
          name
        }
      });
      role && (newUser.role = role);
      avatar && (newUser.profile.avatar = avatar);
      address && (newUser.profile.address = address);
      if (mobile) {
        Object.keys(mobile).length && (newUser.profile.mobile = mobile);
      }

      console.log(newUser);
      await newUser.save();

      res.status(200).json({ msg: 'Registerd successfully!', newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ msg: 'This email does not exist' });
    }

    const reset_token = createResetToken({
      user: user._id
    });
    res.cookie('resettoken', reset_token, {
      httpOnly: true,
      path: `user/resetpassword/${reset_token}`
    });

    const url = `${process.env.URL_SERVER_APP}/reset-password/${reset_token}`;
    const message = `${
      'You are receiving this because you have requested to reset your password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n'
    }`;
    const subject = 'Reset Password';
    sendMail(
      'tanphat102698@gmail.com',
      subject,
      url,
      message,
      'Reset Password'
    );
    res.json({
      reset_token,
      user
    });
  },
  resetPassword: async (req, res) => {
    try {
      const reset_password_token = req.params.resetToken;
      const token = jwt.verify(
        reset_password_token,
        process.env.RESET_TOKEN_SECRECT
      );
      await User.findOne({
        _id: token.user
      })
        .then(user => {
          user.password = req.body.password;

          user.save().then(result => {
            res.status(400).json({ msg: 'Success change password', result });
          });
        })
        .catch(err => {
          return res.status(500).json({ msg: err.message });
        });
    } catch (err) {
      res
        .status(400)
        .json({ msg: 'Tokken is Wrong or Expiration Token is over ' });
    }
  },
  activateEmail: async (req, res) => {
    try {
      // const { activation_token } = req.body;
      const activation_token = req.params.activation_token;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { email, password, name } = user.newUser;
      const check = await User.findOne({ email });
      if (check)
        return res.status(400).json({ msg: 'This email already exists.' });
      const newUser = new User({
        email,
        password
      });
      newUser.profile.name = name;
      await newUser.save();

      res.json({ msg: 'Account has been activated!', newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id).select('-password');
      if (!user) res.status(400).json({ msg: 'User does not exist' });
      res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProfile: async (req, res) => {
    try {
      console.log(req.user);
      const user = await User.findById(req.user._id).select('-password');
      if (!user) res.status(500).json({ msg: 'User does not exist' });
      res.status(400).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      console.log(req.params.id);
      const { name, avatar, address, mobile, role } = req.body;
      console.log(req.body);
      const user = await User.findById(req.params.id);
      name && (user.profile.name = name);
      avatar && (user.profile.avatar = avatar);
      address && (user.profile.address = address);
      role && (user.role = role);
      Object.keys(mobile).length && (user.profile.mobile = mobile);
      user.save();
      return res.status(200).json({ msg: 'Updated Profile Successful', user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, id } = req.body;
      const user = await User.findById(id);
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      user.save();
      return res.status(200).json({ msg: 'Updated Password Successful', user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json({ users });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.user_id).then(value => {
        res.status(200).json({ msg: 'Delete User Successful', user: value });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createAdmin: async (req, res) => {
    console.log('ok');
    const { name, email, password } = req.body;
    if (!service.validateEmail(email))
      return res.status(400).json({ msg: "The email dont't match " });
    const user = await User.findOne({ email });
    if (user) {
      user.role = 1;
      user.save();
      return res.status(400).json({ msg: 'The role had been upgrade', user });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'Password is at least 6 characters long' });

    const avatar = `https://www.google.com.vn/imgres?imgurl=https%3A%2F%2Fcdn1.vectorstock.com%2Fi%2F1000x1000%2F11%2F10%2Fadmin-icon-male-person-profile-avatar-with-gear-vector-25811110.jpg&imgrefurl=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fadmin-icon-male-person-profile-avatar-with-gear-vector-25811110&tbnid=XKTEYbKXoj-JbM&vet=12ahUKEwjzxYCiwLzwAhXiIaYKHYXyBCoQMygBegUIARCkAQ..i&docid=BmdWsJbQoRBmFM&w=1000&h=1080&q=avatat%20admin&ved=2ahUKEwjzxYCiwLzwAhXiIaYKHYXyBCoQMygBegUIARCkAQ`;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUserSuperAdmin = new User({
      email: email,
      password: hashPassword,
      role: 1
    });
    newUserSuperAdmin.profile.avatar = avatar;
    newUserSuperAdmin.name = name;
    newUserSuperAdmin.save();
    res.status(200).json({ msg: 'Admin account created' });
  },
  dataUser: async (req, res) => {
    const hashPassword = await bcrypt.hash(`521478963`, 10);
    try {
      for (let i = 1; i < 11; i++) {
        let newUser = new User({
          email: `customer${i}@gmail.com`,
          password: hashPassword,
          profile: {
            name: `customer${i}`
          }
        });
        await newUser.save();
      }
      res.status(200).json({ msg: 'Success data' });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  }
};

const createResetToken = user => {
  return jwt.sign(user, process.env.RESET_TOKEN_SECRECT, {
    expiresIn: '1d'
    //expiresIn: '5m'
  });
};

module.exports = userCtrl;
