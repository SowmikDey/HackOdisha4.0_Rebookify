import express from 'express';
import { createOrder } from '../controllers/orderController.js'; // Import the controller

const router = express.Router();

// Route to create an order
router.post('/create-order', createOrder); 

export default router;