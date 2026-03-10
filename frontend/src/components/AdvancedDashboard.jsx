import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Star,
  Calendar,
  Target,
  Award,
  Activity
} from 'lucide-react';

const AdvancedDashboard = () => {
  const { products } = useProducts();
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    calculateAnalytics();
  }, [products]);

  const calculateAnalytics = () => {
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const purchasedValue = products.filter(p => p.isPurchased).reduce((sum, p) => sum + p.price, 0);
    const highPriority = products.filter(p => p.priority === 'high').length;
    const avgPrice = products.length > 0 ? totalValue / products.length : 0;
    const mostExpensive = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0;
    const categoryStats = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const topCategory = Object.keys(categoryStats).reduce((a, b) => 
      categoryStats[a] > categoryStats[b] ? a : b, 'None'
    );

    setAnalytics({
      totalValue,
      purchasedValue,
      highPriority,
      avgPrice,
      mostExpensive,
      topCategory,
      savingsGoal: totalValue - purchasedValue,
      completionRate: products.length > 0 ? (products.filter(p => p.isPurchased).length / products.length * 100) : 0
    });
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => (
    <div className={`p-6 rounded-xl ${bgColor} border-l-4 ${color} hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color.replace('border-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Advanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Wishlist Value"
          value={`$${analytics.totalValue?.toFixed(2) || '0.00'}`}
          subtitle={`Avg: $${analytics.avgPrice?.toFixed(2) || '0.00'}`}
          color="border-blue-500 text-blue-600"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        
        <StatCard
          icon={ShoppingCart}
          title="Money Spent"
          value={`$${analytics.purchasedValue?.toFixed(2) || '0.00'}`}
          subtitle={`${analytics.completionRate?.toFixed(1) || 0}% completed`}
          color="border-green-500 text-green-600"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        
        <StatCard
          icon={Target}
          title="Savings Goal"
          value={`$${analytics.savingsGoal?.toFixed(2) || '0.00'}`}
          subtitle="Remaining to buy"
          color="border-purple-500 text-purple-600"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
        
        <StatCard
          icon={TrendingUp}
          title="High Priority"
          value={analytics.highPriority || 0}
          subtitle={`Top: ${analytics.topCategory}`}
          color="border-red-500 text-red-600"
          bgColor="bg-red-50 dark:bg-red-900/20"
        />
      </div>

      {/* Progress Visualization */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Wishlist Progress
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Completion Rate</span>
            <span>{analytics.completionRate?.toFixed(1) || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${analytics.completionRate || 0}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {products.filter(p => !p.isPurchased).length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Pending</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {products.filter(p => p.isPurchased).length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Purchased</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {products.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(
            products.reduce((acc, p) => {
              acc[p.category] = (acc[p.category] || 0) + 1;
              return acc;
            }, {})
          ).map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {category}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / products.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;