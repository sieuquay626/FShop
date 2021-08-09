const Shipper = require('../models/shipperModel');
const User = require('../models/UsersModel');

const permissionCtrl = {
  getAllUsers: async (req, res) => {
    User.find()
      .select('-password')
      .then(users => {
        res.status(200).json({ users });
      })
      .catch(err => {
        res.json(err);
      });
  },

  getAllShippers: async (req, res) => {
    Shipper.find()
      .populate('user_id')
      .then(shippers => {
        res.status(200).json({ shippers });
      })
      .catch(err => {
        res.json(err);
      });
  }
};

module.exports = permissionCtrl;
