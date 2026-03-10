const Product = require('../models/Product');

// @desc    Get all products for user
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
  try {
    const { search, category, purchased } = req.query;
    let query = { user: req.user._id };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (purchased !== undefined) {
      query.isPurchased = purchased === 'true';
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { name, price, imageUrl, description, category } = req.body;

    const product = await Product.create({
      name,
      price,
      imageUrl,
      description,
      category,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/products/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ user: req.user._id });
    const purchasedProducts = await Product.countDocuments({ 
      user: req.user._id, 
      isPurchased: true 
    });
    const pendingProducts = totalProducts - purchasedProducts;

    res.json({
      totalProducts,
      purchasedProducts,
      pendingProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Purchase product (mark as purchased and deduct from balance)
// @route   POST /api/products/:id/purchase
// @access  Private
const purchaseProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const User = require('../models/User');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (product.isPurchased) {
      return res.status(400).json({ message: 'Product already purchased' });
    }

    // Check if user has enough balance
    const user = await User.findById(req.user._id);
    if (user.balance < product.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct amount from balance and mark as purchased
    user.balance -= product.price;
    await user.save();

    product.isPurchased = true;
    await product.save();

    res.json({ 
      message: 'Product purchased successfully',
      product,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats,
  purchaseProduct,
};