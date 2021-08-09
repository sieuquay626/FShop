const { Schema, model } = require('mongoose');

const ShipperSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  company: { type: String },
  address: { type: String },
  phone: { type: String },
  isActiveShipper: { type: Boolean }
});

module.exports = model('Shipper', ShipperSchema);
