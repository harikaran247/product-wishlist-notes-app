const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all public users
// @route   GET /api/social/users
// @access  Private
const getPublicUsers = async (req, res) => {
  try {
    console.log('=== getPublicUsers called ===');
    console.log('Current user ID:', req.user._id);
    
    // Get all users first
    const allUsers = await User.find({}).select('name email bio createdAt');
    console.log('All users in DB:', allUsers.length);
    
    // Get all users except current user
    const users = await User.find({ 
      _id: { $ne: req.user._id }
    }).select('name email bio createdAt').sort({ createdAt: -1 });
    
    console.log('Found users (excluding current):', users.length);
    console.log('Users data:', users);
    
    res.json(users);
  } catch (error) {
    console.error('Error in getPublicUsers:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's public wishlist
// @route   GET /api/social/users/:id/wishlist
// @access  Private
const getUserWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email bio isPublic');
    
    if (!user || !user.isPublic) {
      return res.status(404).json({ message: 'User not found or profile is private' });
    }

    const products = await Product.find({ 
      user: req.params.id 
    }).populate('user', 'name email').sort({ createdAt: -1 });

    res.json({ user, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like/Unlike a product
// @route   POST /api/social/products/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const isLiked = product.likes.includes(req.user._id);
    
    if (isLiked) {
      // Unlike
      product.likes = product.likes.filter(id => id.toString() !== req.user._id.toString());
      product.likesCount = Math.max(0, product.likesCount - 1);
    } else {
      // Like
      product.likes.push(req.user._id);
      product.likesCount += 1;
    }

    await product.save();
    
    res.json({ 
      liked: !isLiked, 
      likesCount: product.likesCount 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trending products
// @route   GET /api/social/trending
// @access  Private
const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('user', 'name email')
      .sort({ likesCount: -1, createdAt: -1 })
      .limit(20);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPublicUsers,
  getUserWishlist,
  toggleLike,
  getTrendingProducts,
};