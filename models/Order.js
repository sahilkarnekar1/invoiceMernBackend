const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  sellerTaxAmount: { type: Number, default: 0},
  buyerTaxAmount: { type: Number},
  shippingCharges: { type: Number},
});

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true },
  orderDate: { type: Date, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  billingDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    stateCode: { type: String, required: true },
  },
  shippingDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    stateCode: { type: String, required: true },
  },
  placeOfSupply: { type: String, required: true },
  placeOfDelivery: { type: String, required: true },
  invoiceDetails: {
    invoiceNo: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
  },
  reverseCharge: { type: Boolean, default: false },
  items: [orderItemSchema],
  totalFinalAmount:{ type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
