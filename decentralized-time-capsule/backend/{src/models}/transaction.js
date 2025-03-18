const mongoose = require('mongoose');

/**
 * Schema for tracking blockchain transactions related to capsules
 */
const TransactionSchema = new mongoose.Schema({
  // Transaction identifiers
  txHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Blockchain details
  chainId: {
    type: Number,
    required: true
  },
  blockNumber: {
    type: Number
  },
  blockHash: String,
  
  // Transaction type
  type: {
    type: String,
    enum: [
      'capsule_creation',
      'content_addition',
      'capsule_unlock',
      'beneficiary_addition',
      'beneficiary_removal',
      'metadata_update'
    ],
    required: true
  },
  
  // Related entities
  capsuleId: {
    type: String,
    index: true
  },
  contentId: String,
  
  // Transaction details
  from: {
    type: String,
    required: true,
    index: true
  },
  to: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: '0'
  },
  
  // Gas info
  gasUsed: Number,
  gasPrice: String,
  effectiveGasPrice: String,
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  confirmations: {
    type: Number,
    default: 0
  },
  error: String,
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: Date,
  
  // Additional data
  inputData: String,
  decodedData: mongoose.Schema.Types.Mixed,
  events: [{
    name: String,
    address: String,
    args: mongoose.Schema.Types.Mixed
  }],
  
  // Metadata
  metadata: mongoose.Schema.Types.Mixed
});

// Indexes for efficient querying
TransactionSchema.index({ from: 1, status: 1 });
TransactionSchema.index({ capsuleId: 1, type: 1 });
TransactionSchema.index({ submittedAt: -1 });
TransactionSchema.index({ status: 1, submittedAt: -1 });

// Methods
TransactionSchema.methods.markConfirmed = async function(blockNumber, blockHash, gasUsed, events = []) {
  this.status = 'confirmed';
  this.blockNumber = blockNumber;
  this.blockHash = blockHash;
  this.gasUsed = gasUsed;
  this.confirmedAt = new Date();
  if (events && events.length) {
    this.events = events;
  }
  return this.save();
};

TransactionSchema.methods.markFailed = async function(error) {
  this.status = 'failed';
  this.error = error;
  return this.save();
};

TransactionSchema.methods.updateConfirmations = async function(confirmations) {
  this.confirmations = confirmations;
  return this.save();
};

// Static methods
TransactionSchema.statics.findByTxHash = function(txHash) {
  return this.findOne({ txHash });
};

TransactionSchema.statics.findByAddress = function(address) {
  return this.find({ $or: [{ from: address }, { to: address }] }).sort({ submittedAt: -1 });
};

TransactionSchema.statics.findByCapsuleId = function(capsuleId) {
  return this.find({ capsuleId }).sort({ submittedAt: -1 });
};

TransactionSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ submittedAt: 1 });
};

TransactionSchema.statics.findByType = function(type) {
  return this.find({ type }).sort({ submittedAt: -1 });
};

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;