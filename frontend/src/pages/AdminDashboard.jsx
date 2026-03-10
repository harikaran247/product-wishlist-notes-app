import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Users, 
  Package, 
  StickyNote, 
  ShoppingCart,
  Trash2,
  Eye
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, productsRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/products')
      ]);
      
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {user?.name}! Manage your application here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats?.totalUsers || 0}
            color="border-blue-500 text-blue-600"
            bgColor="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatCard
            icon={Package}
            title="Total Products"
            value={stats?.totalProducts || 0}
            color="border-green-500 text-green-600"
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            icon={StickyNote}
            title="Total Notes"
            value={stats?.totalNotes || 0}
            color="border-purple-500 text-purple-600"
            bgColor="bg-purple-50 dark:bg-purple-900/20"
          />
          <StatCard
            icon={ShoppingCart}
            title="Purchased Items"
            value={stats?.purchasedProducts || 0}
            color="border-orange-500 text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-900/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Management */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Users Management
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Products */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Products
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.slice(0, 10).map((product) => (
                <div key={product._id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      by {product.user?.name} • ${product.price}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.isPurchased
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {product.isPurchased ? 'Purchased' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;