const { Schema, model } = require('mongoose');

const brandSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true
    },
    photo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Brand', brandSchema);
