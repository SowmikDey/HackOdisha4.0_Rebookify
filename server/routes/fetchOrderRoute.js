import express from 'express';
import { fetchOrders } from '../controllers/fetchOrderController1.js'; 

const router = express.Router();

router.get('/fetch-orders', async (req, res) => {
    try {
      const orders = await fetchOrders();
      res.status(200).json(orders || []); // Send an empty array if no orders
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });
  

export default router; 
