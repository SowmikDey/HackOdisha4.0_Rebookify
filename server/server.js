import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import productRoutes from './routes/productRoutes.js';
import ordersRoute from './routes/orderRoutes.js'; 
import fetchOrders from './routes/fetchOrderRoute.js';
import paymentStatus from './routes/paymentStatus.js';
import order from './routes/orderroute.js';


import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Use CORS middleware to allow requests from localhost:5173
app.use(cors({
  origin: 'https://hackodisha4-0-rebookify-2.onrender.com', // Specify the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified methods
  credentials: true, // Allow credentials if needed
}));

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/client', express.static('public'));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.use('/create-order', (req, res, next) => {
    console.log('Received a request to /create-order');
    next();
  });

// Route handlers
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', otpRoutes);
app.use('/', order);
app.use('/orders', ordersRoute);
app.use('/', fetchOrders);
app.use('/', paymentStatus);



// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
