const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'DOLLAR',
      enum: ['VND', 'DOLLAR']
    },
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: []
      }
    ],
    avgRating: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    // inStock: {
    //   type: Boolean,
    //   default: true
    // },
    detail: {
      // color: {
      //   type: Array,
      //   default: []
      // },
      brand: { type: Schema.Types.ObjectId, ref: 'Brand', require: true },
      material: String,
      gender: {
        type: String,
        default: 'General',
        enum: ['Men', 'Women', 'Kid', 'General']
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    }
  },
  {
    timestamps: true
  }
);

productSchema.pre('save', async next => {
  // let product = this;
  // await Rating.count({ product: product._id }, function (err, count) {
  //   console.log(count);
  //   this.rateCount = Number(count);
  // });
  // await Product.findOne({ _id: product._id }, 'ratings', function (
  //   err,
  //   product
  // ) {
  //   // 2. Filter Comments to just those in product.Comments and average the Rating
  //   Rating.aggregate(
  //     [
  //       { $match: { _id: { $in: product.ratings } } },
  //       { $group: { _id: product._id, average: { $avg: '$value' } } },
  //     ],
  //     function (err, result) {
  //       this.avgRating = Number(Math.round(result[0].average));
  //     }
  //   );
  // });
  // console.log(this);
  // if (0 == 2) {
  //   console.log('2');
  //   next();
  // }
});

module.exports = model('Product', productSchema);
