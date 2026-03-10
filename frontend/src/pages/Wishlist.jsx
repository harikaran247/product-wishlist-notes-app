import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import NoteModal from '../components/NoteModal';
import { 
  Plus, 
  Search, 
  Filter, 
  X,
  Package,
  Save,
  Image
} from 'lucide-react';

const Wishlist = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, fetchProducts, createProduct, updateProduct, loading } = useProducts();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    purchased: ''
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    category: 'Electronics',
    priority: 'medium',
    brand: '',
    store: '',
    condition: 'new',
    productUrl: ''
  });

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'];

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  useEffect(() => {
    // Check if we should show add form from URL params
    if (searchParams.get('action') === 'add') {
      setShowAddForm(true);
      // Remove the action param
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
    
    // Check for filter params
    const filterParam = searchParams.get('filter');
    if (filterParam === 'purchased') {
      setFilters(prev => ({ ...prev, purchased: 'true' }));
    }
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const result = await createProduct({
      ...newProduct,
      price: parseFloat(newProduct.price)
    });
    
    if (result.success) {
      setNewProduct({
        name: '',
        price: '',
        imageUrl: '',
        description: '',
        category: 'Electronics',
        priority: 'medium',
        brand: '',
        store: '',
        condition: 'new',
        productUrl: ''
      });
      setShowAddForm(false);
    }
  };

  const handleEditProduct = async (e, formData) => {
    e.preventDefault();
    const result = await updateProduct(editingProduct._id, {
      ...formData,
      price: parseFloat(formData.price)
    });
    
    if (result.success) {
      setEditingProduct(null);
    }
  };

  const handleViewNotes = (product) => {
    setSelectedProduct(product);
    setShowNoteModal(true);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Price', 'Category', 'Priority', 'Status'];
    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        `"${product.name}"`,
        product.price,
        product.category,
        product.priority || 'medium',
        product.isPurchased ? 'Purchased' : 'Pending'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wishlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const ProductForm = ({ product, onSubmit, onCancel, isEditing = false }) => {
    const [formData, setFormData] = useState(product);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isEditing) {
        // Pass formData directly to the submit handler
        onSubmit(e, formData);
      } else {
        setNewProduct(formData);
        onSubmit(e);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority *
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field h-24 resize-none"
              placeholder="Enter product description..."
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>{isEditing ? 'Update Product' : 'Add Product'}</span>
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {products.length} {products.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
          
          {!showAddForm && !editingProduct && (
            <div className="flex space-x-3 mt-4 sm:mt-0">
              {products.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Package className="h-5 w-5" />
                  <span>Export</span>
                </button>
              )}
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <ProductForm
            product={newProduct}
            onSubmit={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleEditProduct}
            onCancel={() => setEditingProduct(null)}
            isEditing={true}
          />
        )}

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filters.purchased}
              onChange={(e) => handleFilterChange('purchased', e.target.value)}
              className="input-field"
            >
              <option value="">All Items</option>
              <option value="false">Pending</option>
              <option value="true">Purchased</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {Object.values(filters).some(f => f) 
                ? 'Try adjusting your filters or search terms.'
                : 'Start building your wishlist by adding your first product.'
              }
            </p>
            {!Object.values(filters).some(f => f) && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span>Add Your First Product</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => setEditingProduct(product)}
                onViewNotes={handleViewNotes}
              />
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

export default Wishlist;