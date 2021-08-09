require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); //This sets various HTTP headers that can help defend against common web app security vulnerabilities, such as xss attacks.
const volleyball = require('volleyball');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// const csrf = require('csurf'); //This protects against Cross-site request forgery. This needs to be used after our cookie-session connect.
const cookieSession = require('cookie-session');
const paypal = require('paypal-rest-sdk');
const { OnePayInternational } = require('vn-payments');
const app = express();
const passport = require('passport');
const Review = require('./src/models/reviewModel');
const Order = require('./src/models/orderModel');
require('./src/config/passport');
//,https://www.sandbox.paypal.com'
var corsOptions = {
  origin: ['http://localhost:3000', 'https://www.sandbox.paypal.com'],
  credentials: true,
  withCredentials: true,
  crossorigin: true,

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const onepayIntl = new OnePayInternational({
  paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
  merchant: 'ONEPAY',
  accessCode: 'D67342C2',
  secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0'
});
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: false }));

app.use(volleyball);
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'Abjd4yKBVeiO0sRGEZjKE1ffdkluDq9veCiCcTD-uiqqgIHp2Z6WjPoIhsCqmyYBMHiBxwMCs0L4rjPq',
  client_secret:
    'EEBhgyn7B-C582JSQcrFjG02YsOBYGMVL8tYIczcmsaaXooik5SagTXIC0vquTyNOO0DG5ZZ0hAr_Ny2'
});
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/user', require('./src/routes/userRouter'));
app.use('/', require('./src/routes/google'));
app.use('/category', require('./src/routes/categoryRouter'));
app.use('/upload', require('./src/routes/upload'));
app.use('/brand', require('./src/routes/brandRouter'));
app.use('/product', require('./src/routes/productRouter'));
app.use('/review', require('./src/routes/reviewRouter'));
app.use('/order', require('./src/routes/orderRouter'));

// app.use("/payment", require("./src/routes/paymentRouter"));

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});

app.get('/', (req, res) => {
  // res.json({
  //   msg: `Hello 🤞😉🤞`
  // });
  res.redirect(
    'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-49160108KR0203539'
  );
});

app.post('/checkout/paypal', async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId).populate('products.product');
  order.save();
  let item_list = {
    amount: {
      currency: 'USD',
      total: order.subTotal + order.shippingCharges,
      details: {
        subtotal: order.subTotal,
        shipping: order.shippingCharges
      }
    },
    items: []
  };

  order.products.map(value => {
    let temp = {
      name: value.product.title,
      sku: value.product._id,
      price: (value.product.price * (100 - value.product.discount)) / 100,
      currency: 'USD',
      quantity: value.amount
    };
    item_list.items.push(temp);
  });
  let create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: `http://localhost:5000/success/${order._id}`,
      cancel_url: `http://localhost:5000/cancle/${order._id}`
    },
    transactions: [
      {
        item_list: {
          items: item_list.items
        },
        amount: item_list.amount,
        description: 'This is the payment description'
      }
    ]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          console.log(payment.links[i].href);
          res.status(200).json({ links: payment.links[i].href });
        }
      }
    }
  });
  // res.status(200).json({
  //   create_payment_json
  // });
});

app.get('/success/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const payerID = req.query.PayerID;
    const paymentId = req.query.paymentId;
    let execute_payment_json = {
      payer_id: payerID
      // transactions: [
      //   {
      //     amount: {
      //       currency: 'USD',
      //       total: '10.00'
      //     }
      //   }
      // ]
    };
    console.log(orderId);

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) {
          throw error;
        } else {
          console.log(orderId);
          await Order.findById(orderId)
            .then(async order => {
              order.payment.method = 'paypal';
              order.transaction = JSON.parse(JSON.stringify(payment));
              order.verifyPayment();
              await order
                .save()
                .then(value => {
                  // return res
                  //   .status(200)
                  //   .json({ order: value, payment, msg: 'success' });
                  return res.redirect(
                    `http://localhost:3000/account/orders/${value._id}`
                  );
                })
                .catch(err => {
                  return res.status(500).json({ msg: err.message });
                });
            })
            .catch(err => {
              return res.status(500).json({ msg: err.message });
            });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
/**60f584bbb9e03e06d083051d */

app.get('/cancle/:id', (req, res) => {
  const id = req.params.id;
  return res.redirect(`http://localhost:3000/account/orders/${id}`);
});

app.post('/checkout/onepay', (req, res) => {
  const params = Object.assign({}, req.body);

  // construct checkout payload from form data and app's defaults
  const checkoutData = {
    amount: parseInt(params.amount, 10),
    customerId: params.email,
    currency: 'VND',
    againLink: 'http://localhost:5000/payment/callback',
    clientIp: '10',
    orderId: '10',
    returnUrl: 'http://localhost:5000/payment/callback',
    transactionId: '12345',
    amount: 4

    /*...*/
  };

  // buildCheckoutUrl is async operation and will return a Promise
  onepayIntl
    .buildCheckoutUrl(checkoutData)
    .then(checkoutUrl => {
      console.log(checkoutUrl);
      res.writeHead(301, { Location: checkoutUrl.href });
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
  console.log(onepayIntl);
});
app.get('/payment/callback', (req, res) => {
  const query = req.query;

  onepayIntl.verifyReturnUrl(query).then(results => {
    if (results.isSucceed) {
      res.render('success', {
        title: 'Nau Store - Thank You',
        orderId: results.orderId,
        price: results.price,
        message: results.message
      });
    } else {
      res.render('errors', {
        title: 'Nau Store - Payment Errors',
        message: results.message
      });
    }
  });
});
app.get('*', (req, res) => {
  res.json({
    msg: "It seems like we couldn't find the page you were looking for 😢😢"
  });
});

let users = [];
io.on('connection', socket => {
  console.log(socket.id + ' connected.');
  socket.on('joinRoom', id => {
    const user = { userId: socket.id, room: id };
    users.push(user);
    socket.join(user.room);
    console.log(`Socket Id ${socket.id} join room ${id}`);
    console.log(users);
  });

  socket.on('leaveRoom', id => {
    socket.leave(id);
    console.log(`Socket Id ${socket.id} leave room ${id}`);
    users = users.filter(user => user.userId !== socket.id);
    console.log(users);
    socket.broadcast.emit('clients-total', users.length);
  });

  socket.on('createReview', async ({ data, type = 'createReview' }) => {
    if (type == 'createReview') {
      let { content, rating, product_id, postedBy } = data;
      let avgRating = 0;
      const review = new Review({
        content: content,
        rating: Number(rating),
        postedBy: postedBy,
        product_id: product_id
      });
      await review.save();
      await Product.findById(product_id).then(async product => {
        product.rating.push(review._id);
        await Review.aggregate(
          [
            { $match: { _id: { $in: product.rating } } },
            { $group: { _id: product_id, average: { $avg: '$rating' } } }
          ],
          (err, result) => {
            avgRating = Number(Math.round(result[0].average));
            console.log(avgRating);
            product.avgRating = avgRating;
            product.save();
          }
        );
      });

      const newReview = await Review.findOne({ _id: review._id }).populate(
        'postedBy'
      );
      io.to(product_id).emit('sendReviewToClient', newReview);
    } else {
      let { review_id, text, replyBy, product_id } = data;
      let reply = {
        text: text,
        created: new Date(),
        replyBy: replyBy
      };

      const result = await Review.findById(review_id);
      result.reply.push(reply);
      console.log(result);
      await result.save().then(res => {
        Review.populate(result, { path: 'reply.replyBy postedBy' }).then(
          review => {
            io.to(product_id).emit('sendReplyReviewToClient', review);
          }
        );
      });
    }
  });

  // Likes
  socket.on('likeReview', async ({ data, type = 'Like' }) => {
    let { review_id, user_id, product_id } = data;
    if (type == 'Like') {
      let result = await Review.findByIdAndUpdate(
        review_id,
        { $push: { likes: user_id } },
        { new: true }
      );
      Review.populate(result, { path: 'reply.replyBy postedBy' }).then(
        review => {
          console.log(review);
          io.to(product_id).emit('sendLikeReview', review);
        }
      );
    }

    if (type == 'UnLike') {
      let result = await Review.findByIdAndUpdate(
        review_id,
        { $pull: { likes: user_id } },
        { new: true }
      );
      Review.populate(result, { path: 'reply.replyBy postedBy' }).then(
        review => {
          io.to(product_id).emit('sendUnLikeReview', review);
        }
      );
    }
  });

  socket.on('deleteReply', async ({ data }) => {
    let { review_id, reply_id, product_id } = data;
    let result = await Review.findById(review_id);
    let temp;
    result.reply.map((value, index) => {
      if (value._id == reply_id) {
        temp = index;
      }
    });
    console.log(temp);
    result.reply = [
      ...result.reply.slice(0, temp),
      ...result.reply.slice(temp + 1, result.reply.length)
    ];
    await result.save();
    Review.populate(result, { path: 'reply.replyBy postedBy' }).then(review => {
      console.log(review);
      io.to(product_id).emit('sendDeleteReply', review);
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.id);
    users = users.filter(user => user.userId !== socket.id);
    console.log(users);
    socket.broadcast.emit('clients-total', users.length);
  });
});
server.listen(PORT, () => {
  console.log('Server is running');
});
