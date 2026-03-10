const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats,
  purchaseProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getProducts).post(protect, createProduct);
router.get('/stats', protect, getDashboardStats);
router.post('/:id/purchase', protect, purchaseProduct);
router
  .route('/:id')
  .get(protect, getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;