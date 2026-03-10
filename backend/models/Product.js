const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other']
  },
  isPurchased: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);