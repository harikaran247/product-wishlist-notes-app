import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import { 
  StickyNote, 
  Search, 
  Package,
  Calendar,
  Eye
} from 'lucide-react';

const Notes = () => {
  const { products, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewNotes = (product) => {
    setSelectedProduct(product);
    setShowNoteModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage notes for your wishlist items
          </p>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Products List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            {products.length === 0 ? (
              <>
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products in your wishlist
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add some products to your wishlist to start taking notes.
                </p>
              </>
            ) : (
              <>
                <StickyNote className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="card hover-lift">
                <div className="flex items-start space-x-4">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/80x80'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80';
                    }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {product.category}
                      </span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Added {formatDate(product.createdAt)}</span>
                    </div>

                    <button
                      onClick={() => handleViewNotes(product)}
                      className="w-full btn-primary text-sm py-2 flex items-center justify-center space-x-2"
                    >
                      <StickyNote className="h-4 w-4" />
                      <span>View Notes</span>
                    </button>
                  </div>
                </div>

                {product.description && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Note Modal */}
        <NoteModal
          isOpen={showNoteModal}
          onClose={() => {
            setShowNoteModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default Notes;