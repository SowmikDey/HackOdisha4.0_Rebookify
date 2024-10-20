import express from 'express';
import {createOrder} from '../controllers/orderController.js';

    const router = express.Router();

    router.post('/confirmation-payment',createOrder);

    export default router;
