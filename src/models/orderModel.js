const { Schema, model, Types } = require('mongoose');
const { displayMoney } = require('../services/support');
const OrderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    shipping: { type: Object },
    transaction: { type: Object },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          require: true
        },
        amount: {
          type: Number,
          require: true
        }
      }
    ],
    subTotal: { type: Number },
    shippingCharges: {
      type: Number,
      required: true,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    paymentType: {
      type: String,
      require: true
    },
    payment: {
      status: {
        type: String,
        required: true,
        default: 'payment-pending',
        enum: ['payment-pending', 'cod-pending', 'paid']
      },
      method: {
        type: String,
        enum: ['cod', 'paypal', 'onepay']
      }
    },
    orderDate: { type: Date, default: Date.now },
    shippedDate: { type: Date },
    deliveredDate: { type: Date },
    // shipper: { type: Schema.Types.ObjectId, ref: 'Shipper' },
    status: {
      type: String,
      default: 'processing',
      enum: ['processing', 'approved', 'shipped', 'delivered', 'cancelled']
    },
    events: [
      {
        date: Date,
        name: String,
        remarks: String
      }
    ]
  },
  {
    timestamps: true
  }
);

OrderSchema.methods = {
  calculateTotal: function () {
    this.totalAmount = this.subTotal + this.shippingCharges;
  },
  addEvent: function (name, remarks) {
    this.events.push({
      date: Date.now(),
      name,
      remarks
    });
  },
  initiateOrder: function () {
    this.addEvent('order', 'Order has been initiated');
    this.calculateTotal();
  },
  paymentOrder: function (type) {
    this.payment.method = type;
    switch (this.payment.method) {
      case 'cod':
        this.payment.status = 'cod-pending';
        this.addEvent('order', 'Order has been confirmed');
        this.addEvent(
          'payment',
          ` ${displayMoney(this.totalAmount)} to be paid using Cash on delivery`
        );
        break;

      case 'paypal':
        this.payment.status = 'payment-pending';
        this.addEvent(
          'payment',
          `${displayMoney(this.totalAmount)} to be paid using Paypal`
        );
        break;
      case 'onepay':
        this.payment.status = 'approved';
        this.addEvent(
          'payment',
          `${displayMoney(this.totalAmount)} to be paid using OnePay`
        );
        break;
    }
  },
  verifyPayment: function () {
    this.addEvent(
      'payment',
      `Payment of  ${displayMoney(this.totalAmount)} received successfully`
    );
    this.status = 'approved';
    this.payment.status = 'paid';
  },
  approveOrder: function () {
    if (this.status !== 'processing') {
      return false;
    }
    this.status = 'approved';
    this.addEvent('order', 'Order Approved');
    return true;
  },
  cancelOrder: function (remarks = '') {
    if (this.status === 'cancelled') {
      return false;
    }
    this.status = 'cancelled';
    this.addEvent('order', `Order Cancelled. ${remarks}`);
    return true;
  },
  addShipment: function (remarks = '') {
    if (this.status !== 'approved') {
      return false;
    }
    this.status = 'shipped';
    this.shippedDate = Date.now();
    this.addEvent('order', `Order Shipped. ${remarks}`);
    return true;
  },
  orderDelivey: function (remarks = '') {
    if (this.status !== 'shipped') {
      return false;
    }
    this.status = 'delivered';
    this.deliveredDate = Date.now();
    this.payment.status = 'paid';
    this.addEvent('order', `Order Delivered. ${remarks}`);
    this.addEvent(
      'payment',
      `Payment of  ${displayMoney(this.totalAmount)} received successfully`
    );
    return true;
  }
};
module.exports = model('Order', OrderSchema);
