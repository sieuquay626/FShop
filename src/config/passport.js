require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/userModel');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
  console.log('serializeUserr');
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser');
  User.findById(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      console.log(err);
    });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      console.log(email, password);
      try {
        await User.findOne({ email: email }, (err, result) => {
          if (!result) {
            return done(null, false, {
              msg: `Email ${email} does not exist, please sign up.`
            });
          } else {
            bcrypt.compare(password, result.password).then(res => {
              if (!res) {
                console.log(851);
                return done(null, false, { msg: 'Incorrect Password' });
              } else {
                const user = { ...result._doc };
                delete user.password;
                console.log(852);
                return done(null, user);
              }
            });
          }
        });
      } catch (err) {
        return done(null, false, {
          msg: 'Something went wrong, please try again'
        });
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/google/callback',
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      await User.findOne({ google: profile.id }, (err, existingUser) => {
        if (err) return done(null, false);
        if (existingUser) {
          existingUser.profile.name = profile.displayName;
          existingUser.profile.avatar =
            profile._json.picture || existingUser.profile.avatar;
          existingUser.save();
          console.log(existingUser);
          const user = { ...existingUser._doc };
          console.log(user);
          console.log(1);
          return done(null, user);
        } else {
          const newGoogleUser = new User({
            email: profile.email,
            google: profile.id
          });
          newGoogleUser.profile.name = profile.displayName;
          newGoogleUser.profile.avatar =
            profile._json.picture || newGoogleUser.profile.avatar;
          newGoogleUser.save();
          const user = { ...existingUser._doc };
          console.log(user);
          return done(null, user);
        }
      });
      // if (req.user) {
      //   // console.log(req.user);
      //   User.findOne({ google: req.user.id }, (err, existingUser) => {
      //     if (err) {
      //       return done(null, false);
      //     }
      //     if (existingUser && existingUser.id !== req.user.id) {
      //       console.log("test");

      //       const msg =
      //         "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.";
      //       console.log(msg);
      //       done(err);
      //     } else {
      //       User.findOne({ google: profile.id }, (err, user) => {
      //         user.profile.name = profile.displayName;
      //         user.profile.avatar =
      //           profile._json.picture || user.profile.avatar;
      //         user.save((err) => {
      //           done(err, user);
      //         });
      //       });
      //     }
      //   });
      // } else {
      //   User.findOne({ google: profile.id }, (err, existingUser) => {
      //     if (err) {
      //       return done(err);
      //     }
      //     if (existingUser) {
      //       return done(null, existingUser);
      //     }
      //     const user = new User();
      //     user.email = profile.email;
      //     user.google = profile.id;
      //     user.profile.name = profile.displayName;
      //     user.profile.avatar = profile._json.picture || user.profile.avatar;
      //     console.log(user);
      //     user.save((err) => {
      //       done(err, user);
      //     });
      //   });
      // }
    }
  )
);
