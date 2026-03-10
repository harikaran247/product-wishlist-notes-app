import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import { CheckCircle, Package, Calendar } from 'lucide-react';

const PurchasedItems = () => {
  const { products, fetchProducts, loading } = useProducts();
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    fetchProducts({ purchased: 'true' });
  }, []);

  useEffect(() => {
    setPurchasedProducts(products.filter(product => product.isPurchased));
  }, [products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const totalSpent = purchasedProducts.reduce((total, product) => total + product.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Purchased Items
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Items you've successfully purchased from your wishlist
          </p>
        </div>

        {/* Summary Card */}
        {purchasedProducts.length > 0 && (
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {purchasedProducts.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Items Purchased
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatPrice(totalSpent)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Spent
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {formatPrice(totalSpent / purchasedProducts.length)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Price
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchased Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : purchasedProducts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No purchased items yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Items you purchase from your wishlist will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchasedProducts.map((product) => (
              <div key={product._id} className="card hover-lift bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  
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
                      <span className="text-xl font-bold text-green-600 dark:text-green-400 ml-2">
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
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                        ✓ Purchased
                      </span>
                    </div>

                    {product.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Calendar className="h-4 w-4" />
                        <span className="text-xs">
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                        OWNED
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedItems;