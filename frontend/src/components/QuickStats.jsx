import { TrendingUp, TrendingDown, DollarSign, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const QuickStats = () => {
  const { products } = useProducts();

  const highPriorityItems = products.filter(p => p.priority === 'high').length;
  const averagePrice = products.length > 0 
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
    : 0;
  const mostExpensive = products.length > 0 
    ? Math.max(...products.map(p => p.price)) 
    : 0;
  const averageRating = products.filter(p => p.rating).length > 0
    ? products.filter(p => p.rating).reduce((sum, p) => sum + p.rating, 0) / products.filter(p => p.rating).length
    : 0;

  const stats = [
    {
      icon: TrendingUp,
      label: 'High Priority',
      value: highPriorityItems,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: DollarSign,
      label: 'Avg Price',
      value: `$${averagePrice.toFixed(0)}`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: TrendingDown,
      label: 'Most Expensive',
      value: `$${mostExpensive}`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: Star,
      label: 'Avg Rating',
      value: averageRating > 0 ? averageRating.toFixed(1) : 'N/A',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`p-4 rounded-lg ${stat.bgColor}`}>
          <div className="flex items-center space-x-2">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {stat.label}
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;