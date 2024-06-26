const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  panNo: String,
  gstRegistrationNo: String
});

module.exports = mongoose.model('Seller', sellerSchema);
