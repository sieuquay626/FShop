const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
      },
      quantity: {
        type: Number,
        require: true
      },
      totalPrice: { type: Number, required: true }
    }
  ]
});

module.exports = model('Cart', cartSchema);

/*


  totalPrice: { type: Number },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      shipper: { type: Schema.Types.ObjectId, ref: "Shipper" },
      orderState: {
        pending: { type: Boolean },
        shipped: { type: Boolean },
        delivered: { type: Boolean },
        returned: { type: Boolean },
        refunded: { type: Boolean }
      }
    }
  ]

*/

/*

    user_id: {
      type: String,
      required: true,
    },
    phone:{
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      require: true,
    },
    status:{
      type: String,
      default: 'Not processed',
      enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }    


*/
