const mongoose = require('mongoose');

/**
 * Schema for time capsules to be stored in database
 * This represents the off-chain metadata and tracking for capsules
 */
const CapsuleSchema = new mongoose.Schema({
  // Blockchain identifiers
  capsuleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  contractAddress: {
    type: String,
    required: true
  },
  
  // Owner information
  creatorAddress: {
    type: String,
    required: true,
    index: true
  },
  
  // Capsule metadata
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  unlockTime: {
    type: Date,
    required: true
  },
  
  // Status
  isUnlocked: {
    type: Boolean,
    default: false
  },
  unlockedAt: {
    type: Date
  },
  
  // Content references
  contentItems: [{
    contentId: String,
    contentType: String,
    metadataHash: String, // IPFS hash
    encryptionKey: String, // Encrypted encryption key (if any)
    name: String,
    description: String,
    mimeType: String,
    size: Number,
    thumbnailHash: String // IPFS hash for thumbnail (if applicable)
  }],
  
  // Beneficiaries who can access when unlocked
  beneficiaries: [{
    address: {
      type: String,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Metadata hash on IPFS
  metadataHash: {
    type: String
  },
  
  // Chain information
  chainId: {
    type: Number,
    required: true
  },
  
  // Transaction hashes
  creationTxHash: {
    type: String
  },
  unlockTxHash: {
    type: String
  }
});

// Indexes for efficient querying
CapsuleSchema.index({ creatorAddress: 1, isPublic: 1 });
CapsuleSchema.index({ unlockTime: 1, isUnlocked: 1 });
CapsuleSchema.index({ 'beneficiaries.address': 1 });

// Virtual fields
CapsuleSchema.virtual('isUnlockable').get(function() {
  return new Date() >= this.unlockTime && !this.isUnlocked;
});

CapsuleSchema.virtual('timeRemaining').get(function() {
  if (this.isUnlocked) return 0;
  const now = new Date();
  return Math.max(0, this.unlockTime - now);
});

// Methods
CapsuleSchema.methods.markAsUnlocked = async function(txHash) {
  this.isUnlocked = true;
  this.unlockedAt = new Date();
  if (txHash) {
    this.unlockTxHash = txHash;
  }
  return this.save();
};

CapsuleSchema.methods.addContent = async function(contentItem) {
  this.contentItems.push(contentItem);
  return this.save();
};

CapsuleSchema.methods.addBeneficiary = async function(address) {
  if (!this.beneficiaries.find(b => b.address === address)) {
    this.beneficiaries.push({
      address,
      addedAt: new Date()
    });
    return this.save();
  }
  return this;
};

// Static methods
CapsuleSchema.statics.findByCapsuleId = function(capsuleId) {
  return this.findOne({ capsuleId });
};

CapsuleSchema.statics.findByCreator = function(creatorAddress) {
  return this.find({ creatorAddress });
};

CapsuleSchema.statics.findPublic = function() {
  return this.find({ isPublic: true });
};

CapsuleSchema.statics.findUnlockable = function() {
  const now = new Date();
  return this.find({
    unlockTime: { $lte: now },
    isUnlocked: false
  });
};

const Capsule = mongoose.model('Capsule', CapsuleSchema);

module.exports = Capsule;