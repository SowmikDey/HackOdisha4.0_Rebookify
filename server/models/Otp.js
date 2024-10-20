import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    otpSeller: {
        type: String,
        required: true, 
    },
    otpBuyer: {
        type: String,
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m' 
    }
});

const OTP = mongoose.model('OTP', otpSchema);


export default OTP;
