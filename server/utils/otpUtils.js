import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config(); 

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (to, otp) => {
    if (!to) {
        throw new Error('The "to" parameter is required to send the OTP.');
    }
    if (!otp) {
        throw new Error('The "otp" parameter is required to send the OTP.');
    }

    try {
        const message = await twilioClient.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, 
            to: to, 
        });
        return message;
    } catch (error) {
        console.error('Error sending OTP:', error.message); 
        throw new Error('Failed to send OTP');
    }
};
