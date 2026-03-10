import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Users, Heart, TrendingUp, Eye } from 'lucide-react';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('users');
  const loading = false;

  // Sample users data
  const users = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Tech enthusiast and gadget lover'
    },
    {
      _id: '2', 
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Fashion and lifestyle blogger'
    },
    {
      _id: '3',
      name: 'Mike Johnson', 
      email: 'mike@example.com',
      bio: 'Book lover and coffee addict'
    }
  ];

  // Sample trending products
  const trending = [
    {
      _id: '1',
      name: 'iPhone 15 Pro',
      price: 999,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      category: 'Electronics',
      likesCount: 15,
      user: { _id: '1', name: 'John Doe' }
    },
    {
      _id: '3',
      name: 'Designer Handbag',
      price: 450,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      category: 'Clothing',
      likesCount: 12,
      user: { _id: '2', name: 'Jane Smith' }
    },
    {
      _id: '2',
      name: 'MacBook Air',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      category: 'Electronics',
      likesCount: 8,
      user: { _id: '1', name: 'John Doe' }
    }
  ];

  const handleLike = (productId) => {
    console.log('Liked product:', productId);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore Community
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover other users' wishlists and trending products
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'trending'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Trending
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="card hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                {user.bio && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {user.bio}
                  </p>
                )}
                
                <Link
                  to={`/sample-wishlist/${user._id}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Wishlist</span>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trending.map((product) => (
              <div key={product._id} className="card hover-lift">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {product.category}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        by {product.user?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleLike(product._id)}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{product.likesCount || 0}</span>
                    </button>
                    
                    <Link
                      to={`/sample-wishlist/${product.user._id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      View Profile
                    </Link>
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

export default Explore;