require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Use cors middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const sellerRoutes = require('./routes/seller');
const orderRoutes = require('./routes/order');
const itemRoutes = require('./routes/item');

// Use routes
app.use('/api/sellers', sellerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
