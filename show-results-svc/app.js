// app.js (Show Results Backend)

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', async (req, res) => {
  try {
    const db = client.db(process.env.MONGO_DB); // Assuming 'process.env.MONGO_DB' is your MongoDB database name
    const collection = db.collection(process.env.MONGO_COLLECTION); // Assuming 'process.env.MONGO_COLLECTION' is your MongoDB collection name

    // Fetch data from MongoDB and perform analytics (max, min, average, etc.)
    const data = await collection.find().toArray();
    // Perform analytics calculations here

    // Return analytics as JSON response
    res.json({
      // Your calculated analytics data
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
