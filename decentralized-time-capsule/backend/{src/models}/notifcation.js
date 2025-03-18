const mongoose = require('mongoose');

/**
 * Schema for user notifications related to time capsules
 */
const NotificationSchema = new mongoose.Schema({
  // Target user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  walletAddress: {
    type: String,
    required: true,
    index: true
  },
  
  // Notification details
  type: {
    type: String,
    enum: [
      'capsule_created',
      'capsule_unlockable',
      'capsule_unlocked',
      'beneficiary_added',
      'content_added',
      'system_announcement'
    ],
    required: true
  },
  
  // Related capsule (if applicable)
  capsuleId: {
    type: String,
    index: true
  },
  
  // Notification content
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  
  // Deep link or action URL
  actionUrl: String,
  
  // Status flags
  isRead: {
    type: Boolean,
    default: false
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  
  // Delivery methods
  deliveryMethods: {
    inApp: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    push: { type: Boolean, default: false }
  },
  
  // For email/push tracking
  emailSentAt: Date,
  pushSentAt: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiresAt: {
    type: Date,
    index: true
  }
});

// Indexes for efficient querying
NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ walletAddress: 1, isRead: 1 });
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Virtual fields
NotificationSchema.virtual('isExpired').get(function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

// Methods
NotificationSchema.methods.markAsRead = async function() {
  this.isRead = true;
  return this.save();
};

NotificationSchema.methods.markAsDelivered = async function() {
  this.isDelivered = true;
  return this.save();
};

// Static methods
NotificationSchema.statics.findByUser = function(userId) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

NotificationSchema.statics.findByWalletAddress = function(walletAddress) {
  return this.find({ walletAddress }).sort({ createdAt: -1 });
};

NotificationSchema.statics.findUnreadByUser = function(userId) {
  return this.find({ userId, isRead: false }).sort({ createdAt: -1 });
};

NotificationSchema.statics.findByCapsule = function(capsuleId) {
  return this.find({ capsuleId }).sort({ createdAt: -1 });
};

NotificationSchema.statics.markAllAsRead = async function(userId) {
  return this.updateMany(
    { userId, isRead: false },
    { $set: { isRead: true } }
  );
};

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;