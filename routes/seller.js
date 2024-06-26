const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// Create a new seller
router.post('/', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).send(seller);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).send(sellers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
