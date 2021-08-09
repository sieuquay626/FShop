const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' }
    }
  ]
});

module.exports = model('Wishlist', wishlistSchema);
