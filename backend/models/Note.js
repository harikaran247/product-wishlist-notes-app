const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a note title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please add note content'],
    trim: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);