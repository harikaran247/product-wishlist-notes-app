import { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Check, 
  X, 
  ExternalLink, 
  StickyNote,
  ShoppingCart,
  CheckCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { productsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onEdit, onViewNotes }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { updateProduct, deleteProduct, fetchProducts } = useProducts();
  const { user, updateUser } = useAuth();

  const handlePurchase = async () => {
    if (product.isPurchased) {
      await updateProduct(product._id, { isPurchased: false });
      return;
    }
    
    setIsPurchasing(true);
    try {
      const response = await productsAPI.purchase(product._id);
      // Update user balance in auth context
      updateUser({ balance: response.data.newBalance });
      // Refresh products to show updated status
      fetchProducts();
      alert(`Purchased ${product.name} for $${product.price}! New balance: $${response.data.newBalance}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Purchase failed');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      await deleteProduct(product._id);
      setIsDeleting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className={`card hover-lift transition-all duration-300 ${
      product.isPurchased ? 'opacity-75 bg-green-50 dark:bg-green-900/20' : ''
    }`}>
      <div className="relative">
        {product.isPurchased && (
          <div className="absolute top-2 right-2 z-10">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        )}
        
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
            loading="lazy"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400 ml-2">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              {product.category}
            </span>
            {product.priority && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                product.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                product.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              }`}>
                {product.priority}
              </span>
            )}
            {product.isPurchased && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                Purchased
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Edit Product"
              >
                <Edit className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => onViewNotes(product)}
                className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                title="View Notes"
              >
                <StickyNote className="h-4 w-4" />
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                title="Delete Product"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                product.isPurchased
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
              }`}
            >
              {isPurchasing ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                  <span>Purchasing...</span>
                </>
              ) : product.isPurchased ? (
                <>
                  <X className="h-3 w-3" />
                  <span>Unpurchase</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3" />
                  <span>Purchase ${product.price}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;