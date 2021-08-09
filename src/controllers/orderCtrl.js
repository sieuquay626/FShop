const Order = require('../models/orderModel');
const Users = require('../models/userModel');
const Products = require('../models/productModel');
//POST

const orderCtrl = {
  orderByUser: async (req, res) => {
    try {
      await Order.find({ user_id: req.params.id })
        .populate('products.product')
        .populate('user_id')
        .sort('-createdAt')
        .then(oderByUser => {
          return res.status(200).json({ oderByUser });
        });
    } catch (er) {
      return res.status(500).json({ msg: err.message });
    }
  },

  orderById: async (req, res) => {
    try {
      console.log(req.params.id);
      await Order.findById(req.params.id)
        .populate('products.product')
        .then(value => {
          return res.status(200).json({ order: value });
        });
      // .populate('products.product')
      // .populate('user_id');

      // return res.status(200).json({ oderById });
      // return res.status(200).json({ oderById });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  listOrders: async (req, res) => {
    try {
      const listOrder = await Order.find()
        .populate('user_id')
        .populate('products.product')
        .sort('-created');

      res.status(200).json({ listOrder });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createOder: async (req, res) => {
    try {
      const { order, type } = req.body;
      if (!order.carts.length) {
        return res.status(400).json({ msg: 'No order items' });
      }
      const newOrder = new Order({
        user_id: order.profile._id,
        shipping: order.shipping,
        subTotal: order.subTotal,
        shippingCharges: order.shippingCharges
      });
      order.carts.map(value => {
        newOrder.products.push({ ...value, product: value.product._id });
      });
      await newOrder.initiateOrder();

      await newOrder.paymentOrder(type);
      console.log(newOrder);

      await newOrder
        .save()
        .then(value => {
          return res.status(200).json({ orderId: value._id, value, newOrder });
        })
        .catch(err => {
          return res.status(500).json({ msg: err.message });
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  cancelStatusOrder: async (req, res) => {
    const { id } = req.body;
    console.log(id);
    const order = await Order.findById(id);
    await order.cancelOrder();
    order
      .save()
      .then(value => {
        return res.status(200).json({ msg: 'Order has been cancel', order });
      })
      .catch(err => {
        return res.status(500).json({ msg: err.message });
      });
  },
  updatatePayment: async (req, res) => {},
  updateOrderStatus: async (req, res) => {
    try {
      const { id, status } = req.body;
      console.log(status);
      await Order.findById(id)
        .then(async order => {
          if (status === 'approved') {
            await order.approveOrder();
          } else if (status === 'shipped') {
            console.log('vao day');
            await order.addShipment();
          } else if (status === 'delivered') {
            console.log('vao kia');
            await order.orderDelivey();
          } else if (status === 'canceled') {
            await order.cancelOrder();
          }
          await order.save();
          res.status(200).json({ order, msg: 'Update Status Sucess' });
        })
        .then(value => {});
      // await Order.findByIdAndUpdate(
      //   req.body.id,
      //   { $set: { status: req.body.status } },
      //   (err, order) => {
      //     if (err) {
      //       return res.status(400).json({
      //         msg: 'Something went wrong'
      //       });
      //     }
      //     res.status(200).json({ order, msg: 'Update Status Sucess' });
      //   }
      // );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStatusValues: async (req, res) => {
    res.json(await Order.schema.path('status').enumValues);
  }

  // sold = async (id, quantity, oldSold) => {
  //   await Products.findOneAndUpdate(
  //     { _id: id },
  //     {
  //       sold: quantity + oldSold
  //     }
  //   );
  // }
};

module.exports = orderCtrl;
