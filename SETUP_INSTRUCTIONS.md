# 🚀 Quick Setup Instructions

## Prerequisites
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- MongoDB - [Install locally](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- Git (optional) - [Download here](https://git-scm.com/)

## 🔧 Setup Steps

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Start MongoDB (if using local installation)
# Windows: mongod
# macOS/Linux: sudo systemctl start mongod

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Environment Configuration

The `.env` file in the backend directory is already configured for local development:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/wishlist-app
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=30d
```

**For production, make sure to:**
- Change the JWT_SECRET to a secure random string
- Update MONGO_URI to your production database
- Set NODE_ENV to 'production'

### 4. Database Setup

The app will automatically create the database and collections when you start using it. No manual setup required!

### 5. Test the Application

1. Open your browser and go to `http://localhost:3000`
2. Click "Sign up" to create a new account
3. Or use the demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`

## 🎯 Quick Test Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] MongoDB connection successful
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard loads with stats
- [ ] Can add new products
- [ ] Can edit/delete products
- [ ] Can mark products as purchased
- [ ] Can add/edit/delete notes
- [ ] Dark mode toggle works
- [ ] Responsive design on mobile

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9
```

**MongoDB connection error:**
- Make sure MongoDB is running
- Check if the connection string in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

**JWT Secret error:**
- Make sure JWT_SECRET in `.env` is set and not empty

### Frontend Issues

**Port 3000 already in use:**
- The Vite dev server will automatically suggest an alternative port
- Or kill the process using the port

**API connection error:**
- Make sure the backend is running on port 5000
- Check if the API_URL in `frontend/src/services/api.js` is correct

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Mobile Testing

Test the responsive design by:
1. Opening browser developer tools (F12)
2. Clicking the device toggle button
3. Selecting different device sizes
4. Testing touch interactions

## 🔒 Security Notes

- The demo uses a simple JWT secret for development
- In production, use a strong, randomly generated JWT secret
- Enable HTTPS in production
- Use environment variables for all sensitive data
- Consider implementing rate limiting for production

## 🚀 Production Deployment

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Use MongoDB Atlas for database
3. Deploy using Git or Docker

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set up environment variables if needed

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check the troubleshooting section above

## 🎉 You're Ready!

Once both servers are running, you can start using the Product Wishlist & Notes App. Enjoy managing your wishlist! 🛍️