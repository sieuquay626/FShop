const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const similarity = require('compute-cosine-similarity');
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort('-createdAt');
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

function Table() {
  this.rowNames = [];
  this.columnNames = [];
  this.cells = {};
  this.cellCount = 0;
  this.setCell = function (rowName, colName, value) {
    if (!this.rowNames.includes(rowName)) {
      this.rowNames = [...this.rowNames, rowName];
    }

    if (!this.columnNames.includes(colName)) {
      this.columnNames = [...this.columnNames, colName];
    }
    let key = `${rowName}-${colName}`;
    if (!(key in this.cells)) {
      this.cells[key] = value;
      this.cellCount++;
    }
  };
}
var table = new Table();

const commentCtrl = {
  createReview: async (req, res) => {
    try {
      let { content, product_id, postedBy, rating } = req.body;
      const newReview = new Review({
        content: content,
        rating: Number(rating),
        postedBy: postedBy,
        product_id: product_id
      });
      console.log(newReview);

      await newReview.save();

      return res.status(200).json({ msg: 'Review Product Success', newReview });
      // await Review.findOne({ postedBy: postedBy, product_id: product_id }).then(
      //   async review => {
      //     console.log('review', review);

      //     if (review) {
      //       review.rating = rating;
      //       review.content = content;
      //       review.save();
      //       return res
      //         .status(200)
      //         .json({ msg: 'You rated this product', review });
      //     } else {
      //       const newReview = new Review({
      //         content: content,
      //         rating: Number(rating),
      //         postedBy: postedBy,
      //         product_id: product_id
      //       });
      //       console.log(newReview);
      //       await newReview.save();
      //       await Product.findById(product_id).then(product => {
      //         product.rating.push(newReview._id);
      //         product.save();
      //       });
      //       return res
      //         .status(200)
      //         .json({ msg: 'Review Product Success', newReview });
      //     }
      //   }
      // );
      // res.json({ content, product_id, postedBy, rating });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },
  deleteReview: async (req, res) => {
    try {
      let { review_id } = req.body;
      await Review.findByIdAndDelete(review_id, (err, value) => {
        return res.status(200).json({ msg: 'Delete Review Success', value });
      });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },

  createReply: async (req, res) => {
    try {
      let { text, review_id, replyBy } = req.body;
      let reply = {
        text: text,
        created: new Date(),
        replyBy
      };
      console.log(reply);
      const result = await Review.findByIdAndUpdate(
        review_id,
        { $push: { reply: reply } }
        // { new: true }
      );
      //   .populate('reply.replyBy')
      //   // .populate('reply.replyBy', '_id name')
      //   .populate('postedBy')
      //   .exec();
      return res.status(200).json({ result, msg: 'Reply success' });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },

  like: async (req, res) => {
    let { review_id, user_id } = req.body;
    try {
      let result = await Review.findByIdAndUpdate(
        review_id,
        { $push: { likes: user_id } },
        { new: true }
      );
      res.sattus(200).json({ result, msg: 'Like this reivew' });
    } catch (err) {
      return res.status(400).json({
        msg: err
      });
    }
  },

  unlike: async (req, res) => {
    let { review_id, user_id } = req.body;
    try {
      let result = await Post.findByIdAndUpdate(
        review_id,
        { $pull: { likes: user_id } },
        { new: true }
      );
      res.sattus(200).json({ result, msg: 'Unlike this review' });
    } catch (err) {
      return res.status(400).json({
        msg: err
      });
    }
  },
  listByUser: async (req, res) => {
    let { user_id } = req.body;
    try {
      let result = await Review.find({ postedBy: user_id })
        .populate('reply.replyBy', '_id name')
        .populate('postedBy', '_id name')
        .exec();
      res.sattus(200).json({ result, msg: 'List review by user' });
    } catch (err) {
      return res.status(400).json({
        msg: err
      });
    }
  },
  listReview: async (req, res) => {
    try {
      const features = new APIfeatures(
        Review.find({ product_id: req.params.id })
          .populate('postedBy')
          .populate('reply.replyBy'),
        req.query
      )
        .sorting()
        .paginating();

      const reviews = await features.query;

      res.status(200).json({
        status: 'success',
        result: reviews.length,
        reviews
      });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },
  checkReview: async (req, res) => {
    try {
      await Review.find({
        product_id: req.params.productId,
        postedBy: req.params.userId
      }).then(review => {
        return res.status(200).json({ review });
      });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },
  reviewRandom: async (req, res) => {
    try {
      await User.find().then(users => {
        users.map(async user => {
          await Product.find().then(products => {
            products.map(async product => {
              if (Math.round(Math.random() * 10) > 3) {
                const newReview = new Review({
                  content: `Good_${user.profile.name}`,
                  rating: Math.floor(Math.random() * 5) + 1,
                  postedBy: user._id,
                  product_id: product._id
                });
                await newReview.save();
                await Product.findById(product._id).then(async product => {
                  product.rating.push(newReview._id);
                  await product.save();
                });
              }
            });
          });
        });
      });
      return res.status(200).json({ msg: 'Success Random Review' });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },
  recommentDataRating: async (req, res) => {
    let user = [];
    Review.find()
      .then(async review => {
        for (let i = 0; i < review.length; i++) {
          table.setCell(
            JSON.stringify(review[i].product_id),
            JSON.stringify(review[i].postedBy),
            Number(review[i].rating)
          );
        }
      })
      .then(async val => {
        let a = [];
        let userRecomment = req.body.user;
        console.log(userRecomment);
        let vtUserRecomment = table.columnNames.indexOf(
          JSON.stringify(userRecomment)
        );
        for (let i = 0; i < table.rowNames.length; i++) {
          let x = [];
          for (let j = 0; j < table.columnNames.length; j++) {
            let key = `${table.rowNames[i]}-${table.columnNames[j]}`;
            if (key in table.cells) {
              x.push(table.cells[key]);
            } else {
              x.push('?');
            }
          }
          a.push(x);
        }
        console.table(a);
        let arrCopy = () => {
          let x = [];
          for (let i = 0; i < a.length; i++) {
            let t = [];
            for (j = 0; j < a[i].length; j++) {
              t.push(a[i][j]);
            }
            x.push(t);
          }
          return x;
        };
        let b = arrCopy(a);
        console.table(b);

        console.log('Bước 1');
        function sumByColumn(vt) {
          let t = { sum: 0, count: 0 };
          for (let j = 0; j < a.length; j++) {
            if (a[j][vt] != '?') {
              t.sum += a[j][vt];
              t.count++;
            }
          }
          return t;
        }
        let tb = [];
        for (let i = 0; i < table.columnNames.length; i++) {
          let x = sumByColumn(i);
          tb.push(Number((x.sum / (x.count ? x.count : 1)).toFixed(2)));
        }
        console.log('Đánh giá trung bình', tb);
        let arrPredict = [];
        console.log('Bước 2');
        for (let i = 0; i < a.length; i++) {
          for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] == '?') {
              if (j == vtUserRecomment) {
                arrPredict.push(i);
              }
              a[i][j] = 0;
            } else {
              a[i][j] = Number((a[i][j] - tb[j]).toFixed(2));
            }
          }
        }
        // res.json({ a });
        console.table(a);

        console.log('Bước 3');
        function ArrByColumn(arr, col) {
          let x = [];
          for (let i = 0; i < arr.length; i++) {
            x.push(arr[i][col]);
          }
          return x;
        }
        let t = [];
        for (let i = 0; i < table.columnNames.length; i++) {
          t.push([]);
          for (let j = 0; j < table.columnNames.length; j++) {
            if (i == j) {
              t[i].push(1);
            } else {
              t[i].push(
                Number(
                  similarity(ArrByColumn(a, i), ArrByColumn(a, j)).toFixed(2)
                )
              );
            }
          }
        }
        console.table(t);

        console.log('Bước 4 ');
        let k = 2;

        function userRatedWithProduct(arr, indexProduct) {
          let temp = [];
          for (let j = 0; j < arr[indexProduct].length; j++) {
            if (arr[indexProduct][j] != 0) {
              temp.push(j);
            }
          }
          return temp;
        }

        function compute(mappingvt, mappingvalue, k) {
          let index = [];

          mappingvalue.map(item => {
            for (let z = 0; z < mappingvt.length; z++) {
              if (mappingvt[z].value == item) {
                index.push(mappingvt[z].vt);
              }
            }
          });
          return index;
        }

        for (let i = 0; i < a.length; i++) {
          let temp = userRatedWithProduct(a, i);
          let vt;

          for (let j = 0; j < a[i].length; j++) {
            let mappingvt = [];
            let mappingvalue = [];
            if (a[i][j] == 0) {
              temp.map(item => {
                mappingvt.push({ value: t[item][j], vt: item });
                mappingvalue.push(t[item][j]);
              });
              mappingvalue.sort((a, b) => {
                return b - a;
              });
              mappingvalue = mappingvalue.slice(0, k);
              vt = compute(mappingvt, mappingvalue, k);
              // console.log(`(${i},${j})`);
              a[i][j] = Number(
                (
                  (t[vt[0]][j] * a[i][vt[0]] + t[vt[1]][j] * a[i][vt[1]]) /
                  (Math.abs(t[vt[0]][j]) + Math.abs(t[vt[1]][j]))
                ).toFixed(2)
              );
            }
          }
        }
        console.table(a);

        console.log('Bước 5');
        for (let i = 0; i < a.length; i++) {
          for (let j = 0; j < a[i].length; j++) {
            a[i][j] = Number((a[i][j] + tb[j]).toFixed(2));
          }
        }
        console.table(a);

        let arrtempPredict = [];
        let arrtempRated = [];
        for (let i = 0; i < a.length; i++) {
          if (arrPredict.indexOf(i) != -1) {
            arrtempPredict.push({
              x: i,
              value: a[i][Number(vtUserRecomment)]
            });
          } else {
            arrtempRated.push({
              x: i,
              value: a[i][Number(vtUserRecomment)]
            });
          }
        }

        arrtempRated = arrtempRated.sort((a, b) => {
          return b.value - a.value;
        });

        arrtempPredict = arrtempPredict.sort((a, b) => {
          return b.value - a.value;
        });

        arrtempPredict = [...arrtempPredict, ...arrtempRated];

        arrtempPredict = arrtempPredict.slice(0, 10);

        for (let i = 0; i < table.rowNames.length; i++) {
          arrtempPredict.map(c => {
            if (c.x == i) {
              c.product = table.rowNames[i];
            }
          });
        }

        let jsonProduct = [];
        let prom = new Promise((resolve, reject) => {
          arrtempPredict.map((predict, index) => {
            Product.findById(JSON.parse(predict.product))
              .populate('detail.category')
              .then(result => {
                jsonProduct = [...jsonProduct, result];
                return jsonProduct;
              })
              .then(v => {
                if (index === 9) {
                  resolve(v);
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        }).then(value => {
          res.json({ product: value });
        });
      });
  }
};

module.exports = commentCtrl;
