const mongoose = require('mongoose');

const sharedWishlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  products: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  }],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  shareCode: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SharedWishlist', sharedWishlistSchema);