const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
    content: {
      type: String,
      require: true,
      trim: true
    },
    rating: {
      type: Number,
      require: true,
      min: 1,
      max: 5
    },
    reply: [
      {
        text: String,
        created: { type: Date },
        replyBy: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Review', reviewSchema);
// const { Schema, model } = require('mongoose');

// const reviewSchema = new Schema(
//   {

//     content: String
//     // product_id: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
//     // rating: {
//     //   type: Number,
//     //   require: true,
//     //   min: 1,
//     //   max: 5
//     // },
//     // reply: [
//     //   {
//     //     text: String,
//     //     created: { type: Date },
//     //     replyBy: { type: Schema.Types.ObjectId, ref: 'User' }
//     //   }
//     // ]
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = model('Review', reviewSchema);
