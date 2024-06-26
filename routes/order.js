const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Item = require('../models/Item');
const Seller = require('../models/Seller');

// Create a new order
// Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, ...orderData } = req.body;

    // Check if seller exists
    const seller = await Seller.findById(orderData.seller);
    if (!seller) {
      return res.status(400).send({ error: 'Seller not found' });
    }

    // Process items and check if all exist
    const processedItems = await Promise.all(items.map(async (orderItem) => {
      const item = await Item.findById(orderItem.item);
      if (!item) {
        throw new Error(`Item with id ${orderItem.item} not found`);
      }
      return {
        item: item._id,
        quantity: orderItem.quantity,
        discount: orderItem.discount,
        netAmount: orderItem.netAmount,
        taxRate: orderItem.taxRate,
        totalAmount: orderItem.totalAmount,
        sellerTaxAmount:orderItem.sellerTaxAmount,
        buyerTaxAmount:orderItem.buyerTaxAmount,
        shippingCharges:orderItem.shippingCharges,
      };
    }));

    // Calculate totalFinalAmount
    const totalFinalAmount = processedItems.reduce((acc, curr) => acc + curr.totalAmount, 0);

    // Create order with processed item details and totalFinalAmount
    const order = new Order({ ...orderData, items: processedItems, totalFinalAmount });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(400).send({ error: error.message });
  }
});


// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('seller')
      .populate({
        path: 'items.item',
        model: 'Item'
      });
    res.status(200).send(orders);
  } catch (error) {
    console.error('Error getting orders:', error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
