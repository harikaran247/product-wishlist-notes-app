import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Users as UsersIcon, Eye } from 'lucide-react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Tech enthusiast and gadget lover'
    },
    {
      _id: '2', 
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Fashion and lifestyle blogger'
    },
    {
      _id: '3',
      name: 'Mike Johnson', 
      email: 'mike@example.com',
      bio: 'Book lover and coffee addict'
    }
  ]);
  const [loading, setLoading] = useState(false);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Browse other users' public wishlists
          </p>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <UsersIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No other users found
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="card hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                {user.bio && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {user.bio}
                  </p>
                )}
                
                <Link
                  to={`/sample-wishlist/${user._id}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Wishlist</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;