const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['created', 'updated', 'deleted', 'purchased', 'unpurchased', 'rated']
  },
  itemType: {
    type: String,
    required: true,
    enum: ['product', 'note']
  },
  itemName: {
    type: String,
    required: true
  },
  details: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);