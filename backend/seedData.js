const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create sample users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isPublic: true,
        bio: 'Tech enthusiast and gadget lover'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isPublic: true,
        bio: 'Fashion and lifestyle blogger'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isPublic: true,
        bio: 'Book lover and coffee addict'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Sample users created');

    // Create sample products
    const products = [
      {
        name: 'iPhone 15 Pro',
        price: 999,
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
        description: 'Latest iPhone with amazing camera',
        category: 'Electronics',
        priority: 'high',
        user: createdUsers[0]._id,
        likesCount: 5
      },
      {
        name: 'MacBook Air',
        price: 1299,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
        description: 'Lightweight laptop for work',
        category: 'Electronics',
        priority: 'medium',
        user: createdUsers[0]._id,
        likesCount: 3
      },
      {
        name: 'Designer Handbag',
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        description: 'Elegant leather handbag',
        category: 'Clothing',
        priority: 'medium',
        user: createdUsers[1]._id,
        likesCount: 8
      },
      {
        name: 'Running Shoes',
        price: 120,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        description: 'Comfortable running shoes',
        category: 'Sports',
        priority: 'high',
        user: createdUsers[1]._id,
        likesCount: 2
      },
      {
        name: 'Programming Book',
        price: 45,
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
        description: 'Learn advanced programming',
        category: 'Books',
        priority: 'low',
        user: createdUsers[2]._id,
        likesCount: 1
      }
    ];

    await Product.insertMany(products);
    console.log('Sample products created');

    console.log('Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();