const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');


dotenv.config();


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? true : (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.options('*', cors());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Please kill the process or use a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});