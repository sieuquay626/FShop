const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Category', categorySchema);
