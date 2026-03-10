const express = require('express');
const {
  getPublicUsers,
  getUserWishlist,
  toggleLike,
  getTrendingProducts,
} = require('../controllers/socialController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/users', getPublicUsers);
router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find({}).select('name email bio');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/users/:id/wishlist', getUserWishlist);
router.post('/products/:id/like', toggleLike);
router.get('/trending', getTrendingProducts);

// Debug endpoint
router.get('/debug/users', async (req, res) => {
  try {
    const allUsers = await User.find({}).select('name email isPublic');
    res.json({ currentUser: req.user._id, allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;