import express from 'express';
import { paymentStatus } from '../controllers/paymentStatusController.js';

const router = express.Router();

router.get('/payment-status', paymentStatus);


export default router;
