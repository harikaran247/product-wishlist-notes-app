import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const ProductComparison = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProduct = (product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
  };

  const comparisonFields = [
    { key: 'price', label: 'Price', format: (val) => `$${val}` },
    { key: 'category', label: 'Category' },
    { key: 'priority', label: 'Priority' },
    { key: 'brand', label: 'Brand' },
    { key: 'condition', label: 'Condition' },
    { key: 'availability', label: 'Availability' },
    { key: 'store', label: 'Store' },
    { key: 'isPurchased', label: 'Status', format: (val) => val ? 'Purchased' : 'Pending' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Product Comparison ({selectedProducts.length}/4)
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
          {selectedProducts.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Select Products to Compare
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 9).map((product) => (
                  <div
                    key={product._id}
                    onClick={() => addProduct(product)}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/100x100'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm text-center mb-1">
                      {product.name}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 text-center font-bold">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white border-b">
                      Feature
                    </th>
                    {selectedProducts.map((product) => (
                      <th key={product._id} className="text-center p-4 border-b min-w-48">
                        <div className="relative">
                          <button
                            onClick={() => removeProduct(product._id)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <img
                            src={product.imageUrl || 'https://via.placeholder.com/100x100'}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                          />
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {product.name}
                          </h4>
                        </div>
                      </th>
                    ))}
                    {selectedProducts.length < 4 && (
                      <th className="text-center p-4 border-b">
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg mx-auto flex items-center justify-center">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Add Product</p>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field) => (
                    <tr key={field.key} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium text-gray-900 dark:text-white">
                        {field.label}
                      </td>
                      {selectedProducts.map((product) => (
                        <td key={product._id} className="p-4 text-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            {field.format 
                              ? field.format(product[field.key]) 
                              : product[field.key] || 'N/A'
                            }
                          </span>
                        </td>
                      ))}
                      {selectedProducts.length < 4 && <td className="p-4"></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;