import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Lightbulb, TrendingUp, DollarSign, Star } from 'lucide-react';

const SmartRecommendations = () => {
  const { products } = useProducts();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    generateRecommendations();
  }, [products]);

  const generateRecommendations = () => {
    const recs = [];

    // Budget recommendations
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const avgPrice = products.length > 0 ? totalValue / products.length : 0;
    const expensiveItems = products.filter(p => p.price > avgPrice * 1.5);
    
    if (expensiveItems.length > 0) {
      recs.push({
        type: 'budget',
        icon: DollarSign,
        title: 'Budget Optimization',
        message: `You have ${expensiveItems.length} items above average price. Consider prioritizing or finding alternatives.`,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
      });
    }

    // Priority recommendations
    const highPriorityItems = products.filter(p => p.priority === 'high' && !p.isPurchased);
    if (highPriorityItems.length > 3) {
      recs.push({
        type: 'priority',
        icon: TrendingUp,
        title: 'Priority Focus',
        message: `You have ${highPriorityItems.length} high-priority items. Consider purchasing the most important ones first.`,
        color: 'text-red-600',
        bgColor: 'bg-red-50 dark:bg-red-900/20'
      });
    }

    // Category recommendations
    const categoryStats = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const topCategory = Object.keys(categoryStats).reduce((a, b) => 
      categoryStats[a] > categoryStats[b] ? a : b, null
    );
    
    if (topCategory && categoryStats[topCategory] > products.length * 0.4) {
      recs.push({
        type: 'category',
        icon: Star,
        title: 'Diversify Your Wishlist',
        message: `${Math.round((categoryStats[topCategory] / products.length) * 100)}% of your items are ${topCategory}. Consider exploring other categories.`,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20'
      });
    }

    // Completion recommendations
    const completionRate = products.length > 0 ? (products.filter(p => p.isPurchased).length / products.length) : 0;
    if (completionRate < 0.2 && products.length > 5) {
      recs.push({
        type: 'completion',
        icon: Lightbulb,
        title: 'Start Shopping',
        message: `You've only purchased ${Math.round(completionRate * 100)}% of your wishlist. Time to treat yourself!`,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20'
      });
    }

    setRecommendations(recs);
  };

  if (recommendations.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <Lightbulb className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Recommendations Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add more products to get personalized recommendations!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
        Smart Recommendations
      </h3>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className={`p-4 rounded-lg ${rec.bgColor} border-l-4 border-current ${rec.color}`}>
            <div className="flex items-start space-x-3">
              <rec.icon className={`h-5 w-5 mt-0.5 ${rec.color}`} />
              <div>
                <h4 className={`font-medium ${rec.color} mb-1`}>
                  {rec.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {rec.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;