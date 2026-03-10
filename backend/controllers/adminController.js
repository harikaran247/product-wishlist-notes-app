const User = require('../models/User');
const Product = require('../models/Product');
const Note = require('../models/Note');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }

    // Delete user's products and notes
    await Product.deleteMany({ user: req.params.id });
    await Note.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products (admin view)
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalProducts = await Product.countDocuments({});
    const totalNotes = await Note.countDocuments({});
    const purchasedProducts = await Product.countDocuments({ isPurchased: true });

    res.json({
      totalUsers,
      totalAdmins,
      totalProducts,
      totalNotes,
      purchasedProducts,
      pendingProducts: totalProducts - purchasedProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllProducts,
  getAdminStats,
};