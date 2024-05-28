
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  nearbyFacilities: { type: [String], required: true },
  rent: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Property', propertySchema);
