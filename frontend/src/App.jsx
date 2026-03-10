import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import Notes from './pages/Notes';
import AdminDashboard from './pages/AdminDashboard';
import Explore from './pages/Explore';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import SampleWishlist from './pages/SampleWishlist';
import LikedProducts from './pages/LikedProducts';
import PurchasedItems from './pages/PurchasedItems';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              } />
              
              <Route path="/notes" element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/explore" element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              } />
              
              <Route path="/explore/user/:userId" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              
              <Route path="/users/:userId" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              <Route path="/sample-wishlist/:userId" element={
                <ProtectedRoute>
                  <SampleWishlist />
                </ProtectedRoute>
              } />
              
              <Route path="/liked" element={
                <ProtectedRoute>
                  <LikedProducts />
                </ProtectedRoute>
              } />
              
              <Route path="/purchased" element={
                <ProtectedRoute>
                  <PurchasedItems />
                </ProtectedRoute>
              } />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;