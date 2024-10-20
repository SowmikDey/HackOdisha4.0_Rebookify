import OTP from '../models/Otp.js';
import { generateOTP, sendOTP } from '../utils/otpUtils.js'; // Make sure generateOTP and sendOTP are implemented
import User from '../models/User.js';  // Assuming User model contains phone numbers

export const generateDeliveryOTP = async (req, res) => {
    const { userId } = req.body; // Ensure userId is provided

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const otpSeller = generateRandomOTP(); // Generate OTP for the seller
    const otpBuyer = generateRandomOTP(); // Generate OTP for the buyer

    try {
        const otp = new OTP({
            otpSeller,
            otpBuyer,
            userId // Ensure userId is passed here
        });

        await otp.save();
        // Optionally, you can send the OTP via SMS or email
        // await sendOTP(userId, otpSeller); // Example to send OTP

        res.status(201).json({ message: 'OTP generated successfully', otp });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(400).json({ error: 'Error generating OTP', details: error });
    }
};

function generateRandomOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

// Verify the OTPs for buyer and seller
export const verifyOTP = async (req, res) => {
    try {
        const { buyerId, sellerId, otpBuyer, otpSeller } = req.body;

        if (!buyerId || !sellerId || !otpBuyer || !otpSeller) {
            return res.status(400).json({ message: 'Buyer ID, Seller ID, and OTPs are required' });
        }

        const otpRecord = await OTP.findOne({ userId: buyerId }); 
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP request' });
        }

        console.log('OTP Record:', otpRecord);
        console.log('Provided Buyer OTP:', otpBuyer);
        console.log('Provided Seller OTP:', otpSeller);

        const isBuyerOTPValid = otpRecord.otpBuyer === otpBuyer;
        const isSellerOTPValid = otpRecord.otpSeller === otpSeller;

        if (isBuyerOTPValid && isSellerOTPValid) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        }

        res.status(400).json({ message: 'Invalid OTPs' });
    } catch (error) {
        console.error('Error verifying OTPs:', error);
        res.status(500).json({ message: 'Server error while verifying OTPs' });
    }
};
