import express from 'express';
import { generateDeliveryOTP, verifyOTP } from '../controllers/otpController.js';

const router = express.Router();

router.post('/generate', generateDeliveryOTP);
router.post('/verify', verifyOTP);

export default router;
