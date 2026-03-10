import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const BudgetTracker = () => {
  const { products } = useProducts();
  const { user } = useAuth();
  const [budget, setBudget] = useState(user?.budget || 0);

  const totalWishlistValue = products.reduce((sum, product) => sum + product.price, 0);
  const purchasedValue = products
    .filter(product => product.isPurchased)
    .reduce((sum, product) => sum + product.price, 0);
  const remainingValue = totalWishlistValue - purchasedValue;

  const budgetUsed = budget > 0 ? (purchasedValue / budget) * 100 : 0;
  const isOverBudget = purchasedValue > budget && budget > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Budget Tracker
        </h2>
        <DollarSign className="h-6 w-6 text-green-500" />
      </div>

      <div className="space-y-4">
        {/* Budget Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Set Budget
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="input-field"
            placeholder="Enter your budget"
          />
        </div>

        {/* Budget Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Budget</span>
            </div>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-300">
              ${budget.toFixed(2)}
            </p>
          </div>

          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Spent</span>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-green-300">
              ${purchasedValue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {budget > 0 && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Budget Usage</span>
              <span className={isOverBudget ? 'text-red-500' : 'text-green-500'}>
                {budgetUsed.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isOverBudget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetUsed, 100)}%` }}
              ></div>
            </div>
            {isOverBudget && (
              <p className="text-red-500 text-xs mt-1">
                Over budget by ${(purchasedValue - budget).toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* Remaining Wishlist Value */}
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
              Remaining Wishlist
            </span>
          </div>
          <p className="text-lg font-bold text-purple-900 dark:text-purple-300">
            ${remainingValue.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;