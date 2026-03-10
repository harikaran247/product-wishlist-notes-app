import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Heart, Package, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  // All products from all users
  const allProducts = [
    {
      _id: '1',
      name: 'iPhone 15 Pro',
      price: 999,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      description: 'Latest iPhone with amazing camera',
      category: 'Electronics',
      priority: 'high',
      owner: 'John Doe',
      ownerId: '1'
    },
    {
      _id: '2',
      name: 'MacBook Air',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      description: 'Lightweight laptop for work',
      category: 'Electronics',
      priority: 'medium',
      owner: 'John Doe',
      ownerId: '1'
    },
    {
      _id: '3',
      name: 'Designer Handbag',
      price: 450,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      description: 'Elegant leather handbag',
      category: 'Clothing',
      priority: 'medium',
      owner: 'Jane Smith',
      ownerId: '2'
    },
    {
      _id: '4',
      name: 'Running Shoes',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      description: 'Comfortable running shoes',
      category: 'Sports',
      priority: 'high',
      owner: 'Jane Smith',
      ownerId: '2'
    },
    {
      _id: '5',
      name: 'Programming Book',
      price: 45,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
      description: 'Learn advanced programming',
      category: 'Books',
      priority: 'low',
      owner: 'Mike Johnson',
      ownerId: '3'
    }
  ];

  useEffect(() => {
    // Get liked product IDs from localStorage
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      const likedIds = JSON.parse(savedLikes);
      // Filter products that are liked
      const liked = allProducts.filter(product => likedIds.includes(product._id));
      setLikedProducts(liked);
    }
  }, []);

  const handleUnlike = (productId) => {
    // Remove from liked products
    setLikedProducts(prev => prev.filter(p => p._id !== productId));
    
    // Update localStorage
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      const likedIds = JSON.parse(savedLikes);
      const updatedLikes = likedIds.filter(id => id !== productId);
      localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Liked Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Products you've liked from other users' wishlists
          </p>
        </div>

        {likedProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No liked products yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visit other users' wishlists and like products to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedProducts.map((product) => (
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

                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {product.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      product.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {product.priority}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {product.description}
                  </p>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    From {product.owner}'s wishlist
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => handleUnlike(product._id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm">Unlike</span>
                    </button>
                    
                    <Link
                      to={`/sample-wishlist/${product.ownerId}`}
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">View Profile</span>
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

export default LikedProducts;