import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Heart, Package, Calendar } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/social/users/${userId}/wishlist`);
      setUserData(response.data.user);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (productId) => {
    try {
      const response = await axios.post(`/api/social/products/${productId}/like`);
      
      setProducts(products.map(product => 
        product._id === productId 
          ? { ...product, likesCount: response.data.likesCount }
          : product
      ));
    } catch (error) {
      console.error('Failed to like product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            User not found or profile is private
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Header */}
        <div className="card mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {userData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {userData.email}
              </p>
              
              {userData.bio && (
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  {userData.bio}
                </p>
              )}
              
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Package className="h-4 w-4" />
                  <span>{products.length} products</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(userData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {userData.name}'s Wishlist
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This user hasn't added any products to their wishlist.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="card hover-lift">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200';
                    }}
                  />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400 ml-2">
                        ${product.price}
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
                        {product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleLike(product._id)}
                        className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{product.likesCount || 0}</span>
                      </button>
                      
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;