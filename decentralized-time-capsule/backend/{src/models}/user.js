const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * User schema for authentication and user-specific settings
 */
const UserSchema = new mongoose.Schema({
  // Blockchain identity
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  
  // Optional user profile
  username: {
    type: String,
    sparse: true,
    index: true
  },
  email: {
    type: String,
    sparse: true,
    lowercase: true,
    index: true
  },
  
  // Authentication - for off-chain authentication
  nonce: {
    type: String,
    default: () => Math.floor(Math.random() * 1000000).toString()
  },
  passwordHash: String, // Optional password for non-wallet login
  
  // Profile information
  name: String,
  bio: String,
  avatarHash: String, // IPFS hash for avatar
  
  // Preferences
  notificationPreferences: {
    email: {
      unlockReminder: { type: Boolean, default: true },
      newBeneficiary: { type: Boolean, default: true }
    },
    pushNotifications: {
      unlockReminder: { type: Boolean, default: true },
      newBeneficiary: { type: Boolean, default: true }
    }
  },
  
  // User capsules
  capsules: [{
    capsuleId: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['creator', 'beneficiary'],
      default: 'beneficiary'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  
  // Push notification tokens
  pushTokens: [{
    token: String,
    device: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Indexes
UserSchema.index({ walletAddress: 1 });
UserSchema.index({ username: 1 }, { sparse: true });
UserSchema.index({ email: 1 }, { sparse: true });
UserSchema.index({ 'capsules.capsuleId': 1 });

// Password handling
UserSchema.methods.setPassword = async function(password) {
  if (!password) return;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function(password) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

// Signature verification for wallet login
UserSchema.methods.generateNewNonce = function() {
  this.nonce = Math.floor(Math.random() * 1000000).toString();
  return this.nonce;
};

// Methods for capsule interaction
UserSchema.methods.addCapsule = async function(capsuleId, role = 'beneficiary') {
  if (!this.capsules.find(c => c.capsuleId === capsuleId)) {
    this.capsules.push({
      capsuleId,
      role,
      addedAt: new Date()
    });
    return this.save();
  }
  return this;
};

UserSchema.methods.removeCapsule = async function(capsuleId) {
  this.capsules = this.capsules.filter(c => c.capsuleId !== capsuleId);
  return this.save();
};

// Push notification token management
UserSchema.methods.addPushToken = async function(token, device) {
  if (!this.pushTokens.find(t => t.token === token)) {
    this.pushTokens.push({
      token,
      device,
      createdAt: new Date()
    });
    return this.save();
  }
  return this;
};

UserSchema.methods.removePushToken = async function(token) {
  this.pushTokens = this.pushTokens.filter(t => t.token !== token);
  return this.save();
};

// Statics
UserSchema.statics.findByWalletAddress = function(walletAddress) {
  return this.findOne({ walletAddress: walletAddress.toLowerCase() });
};

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

UserSchema.statics.findByCapsuleId = function(capsuleId) {
  return this.find({ 'capsules.capsuleId': capsuleId });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;