# Product Wishlist & Notes App

A full-stack MERN application for managing product wishlists with notes functionality. Features modern UI with dark mode, responsive design, and comprehensive product management.

## 🚀 Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Session management

### Product Management
- Add, edit, delete products
- Mark products as purchased
- Product categories and filtering
- Image support with fallbacks
- Search functionality

### Notes System
- Create notes for each product
- Edit and delete notes
- Timestamps for creation and updates
- Rich text support

### Dashboard
- Overview statistics
- Recent products display
- Quick actions
- Progress tracking

### UI/UX
- Modern, responsive design
- Dark/Light mode toggle
- Smooth animations
- Mobile-first approach
- Glassmorphism effects

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt.js** for password hashing
- **CORS** for cross-origin requests
- **Express Validator** for input validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/wishlist-app
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=30d
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/wishlist-app
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=30d
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?search=laptop&category=Electronics&purchased=false
Authorization: Bearer <token>
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "MacBook Pro",
  "price": 1299.99,
  "imageUrl": "https://example.com/image.jpg",
  "description": "Latest MacBook Pro",
  "category": "Electronics"
}
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "isPurchased": true
}
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

#### Get Dashboard Stats
```http
GET /api/products/stats
Authorization: Bearer <token>
```

### Notes Endpoints

#### Get Notes for Product
```http
GET /api/notes/:productId
Authorization: Bearer <token>
```

#### Create Note
```http
POST /api/notes/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Note Title",
  "content": "Note content here..."
}
```

#### Update Note
```http
PUT /api/notes/note/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Note
```http
DELETE /api/notes/note/:id
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
wishlist-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── noteController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── noteRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── NoteModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   └── Notes.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🎨 UI Components

### Custom CSS Classes
- `.btn-primary` - Primary gradient button
- `.btn-secondary` - Secondary button
- `.card` - Card container with shadow
- `.input-field` - Styled input field
- `.glass` - Glassmorphism effect
- `.hover-lift` - Hover lift animation

### Color Scheme
- Primary: Blue gradient (#3b82f6 to #2563eb)
- Secondary: Purple (#8b5cf6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Error handling middleware

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized for all screen sizes

## 🌙 Dark Mode

- System preference detection
- Manual toggle
- Persistent user preference
- Smooth transitions

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy using Git

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- MongoDB for the flexible database solution