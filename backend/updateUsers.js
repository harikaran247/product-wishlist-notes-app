const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const updateUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update all users to have isPublic: true
    const result = await User.updateMany({}, { $set: { isPublic: true } });
    console.log(`Updated ${result.modifiedCount} users`);

    // Show all users
    const users = await User.find({}).select('name email isPublic');
    console.log('All users:', users);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateUsers();