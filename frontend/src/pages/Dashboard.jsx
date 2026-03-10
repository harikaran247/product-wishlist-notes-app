import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Heart, 
  ShoppingCart, 
  Clock, 
  TrendingUp, 
  Plus,
  Package,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const { stats, fetchStats, products, fetchProducts } = useProducts();
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
    fetchProducts({ limit: 5 }); // Get recent products for preview
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className={`card ${bgColor} border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  const recentProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening with your wishlist today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Package}
            title="Total Products"
            value={stats?.totalProducts || 0}
            color="border-blue-500 text-blue-600"
            bgColor="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatCard
            icon={CheckCircle}
            title="Purchased"
            value={stats?.purchasedProducts || 0}
            color="border-green-500 text-green-600"
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            icon={Clock}
            title="Pending"
            value={stats?.pendingProducts || 0}
            color="border-orange-500 text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-900/20"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions Card */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Link
                to="/wishlist?action=add"
                className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <div className="p-2 bg-blue-500 text-white rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Add New Product
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add a new item to your wishlist
                  </p>
                </div>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
              >
                <div className="p-2 bg-purple-500 text-white rounded-lg group-hover:bg-purple-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    View Wishlist
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Browse all your wishlist items
                  </p>
                </div>
              </Link>

              <Link
                to="/wishlist?filter=purchased"
                className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
              >
                <div className="p-2 bg-green-500 text-white rounded-lg group-hover:bg-green-600 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Purchased Items
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View items you've already bought
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Products */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Products
              </h2>
              <Link
                to="/wishlist"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/60x60'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60x60';
                      }}
                    />
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {product.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        ${product.price}
                      </p>
                    </div>
                    {product.isPurchased && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No products yet</p>
                <Link
                  to="/wishlist?action=add"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Add your first product
                </Link>
              </div>
            )}
          </div>
        </div>





        {/* Progress Section */}
        {stats && stats.totalProducts > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Wishlist Progress
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Purchase Progress
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.purchasedProducts} of {stats.totalProducts} items
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${stats.totalProducts > 0 ? (stats.purchasedProducts / stats.totalProducts) * 100 : 0}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {stats.totalProducts > 0 
                  ? `${Math.round((stats.purchasedProducts / stats.totalProducts) * 100)}% of your wishlist completed`
                  : 'Start adding items to track your progress'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;