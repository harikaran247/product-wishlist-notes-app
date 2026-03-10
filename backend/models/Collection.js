const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  icon: {
    type: String,
    default: 'folder'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);