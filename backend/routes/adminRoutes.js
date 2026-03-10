const express = require('express');
const {
  getAllUsers,
  deleteUser,
  getAllProducts,
  getAdminStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(protect);
router.use(adminOnly);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/products', getAllProducts);
router.get('/stats', getAdminStats);

module.exports = router;