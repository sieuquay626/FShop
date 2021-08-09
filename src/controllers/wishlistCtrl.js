const Wishlist = require('../models/wishlistModel');
const User = require('../models/userModel');

const wishlistCtrl = {
  listWishlist: async (req, res) => {
    try {
      const wishlist = await Wishlist.find();
      return res.status(200).json(wishlist);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addToWishlist: async (req, res) => {
    try {
      let { user_id, product_id } = req.body;

      const existWishlist = await Wishlist.findOne({ user_id: user_id });
      const existUser = await User.findOne({ user_id: user_id });
      if (!existWishlist && !existUser) {
        return res.status(400).json({ msg: `Couldn't find user wish list` });
      } else if (!existWishlist && existUser) {
        let wishlist = new Wishlist({
          user_id,
          items: [product_id]
        });
        wishlist.save();
        return res.status(200).json({ msg: 'Added to wish List', wishlist });
      } else {
        let productsInWishlist = existWishlist.items.map(item => item.product);
        if (productsInWishlist.includes(product_id)) {
          res.status(400).json({ msg: 'You already added this item' });
        } else {
          existWishlist.items.push(product_id);
          existWishlist.save().then(wishlist => {
            return res
              .status(200)
              .json({ msg: 'Added to wish List', wishlist });
          });
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeToWishlist: async (req, res) => {
    try {
      const { user_id, product_id } = req.body;
      let result = await Wishlist.findOneAndUpdate(
        { user_id: user_id },
        { $pull: { items: { product: product_id } } },
        { new: true },
        err => {
          if (err) {
            res.status(400).json({ message: "Couldn't find wish list", err });
          } else {
            res.status(200).json({ message: 'Deleted Succefully', wishlist });
          }
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = wishlistCtrl;
