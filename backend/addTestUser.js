const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const addTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const testUser = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedPassword,
      role: 'user',
      isPublic: true,
      bio: 'This is a test user for demo purposes'
    });

    console.log('Test user created:', testUser.name);

    // Add some products for this user
    const products = [
      {
        name: 'Test Phone',
        price: 599,
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
        description: 'A great smartphone',
        category: 'Electronics',
        priority: 'high',
        user: testUser._id
      },
      {
        name: 'Test Laptop',
        price: 999,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
        description: 'Powerful laptop for work',
        category: 'Electronics',
        priority: 'medium',
        user: testUser._id
      }
    ];

    await Product.insertMany(products);
    console.log('Test products created');

    // Show all users
    const allUsers = await User.find({}).select('name email');
    console.log('All users in database:', allUsers);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addTestUser();