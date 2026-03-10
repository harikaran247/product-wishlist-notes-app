import { createContext, useContext, useReducer } from 'react';
import { productsAPI } from '../services/api';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  stats: null,
  loading: false,
  error: null,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async (filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await productsAPI.getAll(filters);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to fetch products' });
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await productsAPI.create(productData);
      dispatch({ type: 'ADD_PRODUCT', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create product';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await productsAPI.update(id, productData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update product';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete product';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const fetchStats = async () => {
    try {
      const response = await productsAPI.getStats();
      dispatch({ type: 'SET_STATS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to fetch stats' });
    }
  };

  return (
    <ProductContext.Provider value={{
      ...state,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      fetchStats,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};