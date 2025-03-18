/**
 * Models index file - exports all models from a single entry point
 */

const mongoose = require('mongoose');
const User = require('./user');
const Capsule = require('./capsule');
const Notification = require('./notification');
const Transaction = require('./transaction');

// Configure mongoose (can be moved to db config file)
const configureMongoose = (uri) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: process.env.NODE_ENV !== 'production' // Disable autoIndex in production
  };
  
  mongoose.connect(uri, options);
  
  // Event listeners
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
  
  // Handle application termination
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
  });
};

module.exports = {
  User,
  Capsule,
  Notification,
  Transaction,
  configureMongoose
};