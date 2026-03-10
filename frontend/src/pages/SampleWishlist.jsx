import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Heart, Package, Calendar, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const SampleWishlist = () => {
  const { userId } = useParams();
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [purchasedProducts, setPurchasedProducts] = useState(new Set());
  const { createProduct } = useProducts();

  // Load likes from localStorage on component mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      setLikedProducts(new Set(JSON.parse(savedLikes)));
    }
  }, []);
  
  const users = {
    '1': {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Tech enthusiast and gadget lover',
      products: [
        {
          _id: '1',
          name: 'iPhone 15 Pro',
          price: 999,
          imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
          description: 'Latest iPhone with amazing camera',
          category: 'Electronics',
          priority: 'high'
        },
        {
          _id: '2',
          name: 'MacBook Air',
          price: 1299,
          imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
          description: 'Lightweight laptop for work',
          category: 'Electronics',
          priority: 'medium'
        }
      ]
    },
    '2': {
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Fashion and lifestyle blogger',
      products: [
        {
          _id: '3',
          name: 'Designer Handbag',
          price: 450,
          imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
          description: 'Elegant leather handbag',
          category: 'Clothing',
          priority: 'medium'
        },
        {
          _id: '4',
          name: 'Running Shoes',
          price: 120,
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
          description: 'Comfortable running shoes',
          category: 'Sports',
          priority: 'high'
        }
      ]
    },
    '3': {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      bio: 'Book lover and coffee addict',
      products: [
        {
          _id: '5',
          name: 'Programming Book',
          price: 45,
          imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
          description: 'Learn advanced programming',
          category: 'Books',
          priority: 'low'
        }
      ]
    }
  };

  const userData = users[userId];

  const handleLike = (productId) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      // Save to localStorage
      localStorage.setItem('likedProducts', JSON.stringify([...newLiked]));
      return newLiked;
    });
  };

  const handlePurchase = async (product) => {
    try {
      // Add product to user's own wishlist
      const result = await createProduct({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
        category: product.category,
        priority: product.priority || 'medium'
      });
      
      if (result.success) {
        setPurchasedProducts(prev => new Set([...prev, product._id]));
        alert(`"${product.name}" has been added to your wishlist!`);
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product to your wishlist');
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            User not found
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
                  <span>{userData.products.length} products</span>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userData.products.map((product) => (
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

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => handleLike(product._id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        likedProducts.has(product._id) 
                          ? 'text-red-600' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${
                        likedProducts.has(product._id) ? 'fill-current' : ''
                      }`} />
                      <span className="text-sm">
                        {likedProducts.has(product._id) ? 'Liked' : 'Like'}
                      </span>
                    </button>
                    
                    <button
                      onClick={() => handlePurchase(product)}
                      disabled={purchasedProducts.has(product._id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        purchasedProducts.has(product._id)
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <Plus className="h-3 w-3" />
                      <span>
                        {purchasedProducts.has(product._id) ? 'Added' : 'Add to Wishlist'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleWishlist;