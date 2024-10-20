import express from 'express';
import User from '../models/User.js';
import Buyer from '../models/Buyer.js';
import Driver1 from '../models/Driver.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { encryptData } from '../utils/encryption.js';

dotenv.config();

export const registerSeller = async (req, res) => {
    const { name, email, password, address, adharNo, licenseNo, phone, bankDetails } = req.body;

    try {
        if (!name || !address || !phone || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingSeller = await User.findOne({ email });
        if (existingSeller) {
            return res.status(409).json({ error: 'Seller with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const seller = new User({
            name,
            email,
            password : hashedPassword,
            address,
            phone,
            bankDetails: {
                accountHolderName: bankDetails.accountHolderName,
                bankAccountNumber: encryptData(bankDetails.bankAccountNumber),
                ifscCode: encryptData(bankDetails.ifscCode),
                bankName: bankDetails.bankName,
                branchName: bankDetails.branchName,
                upiId: bankDetails.upiId ? encryptData(bankDetails.upiId) : undefined,
            },
        });

        await seller.save();
        res.status(201).json({ message: 'Seller registered successfully' });
    } catch (error) {
        console.error('Error registering seller:', error);
        res.status(500).json({ error: 'Failed to register seller', details: error.message });
    }
};

export const registerBuyer = async (req, res) => {
    const { name, email, password, adharNo, phone, shopnm, address } = req.body;

    if (!name || !email || !password || !adharNo || !phone || !shopnm || !address) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const existingBuyer = await Buyer.findOne({ email });
        if (existingBuyer) {
            return res.status(409).json({ error: 'Buyer with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const buyer = new Buyer({
            name,
            email,
            password: hashedPassword,
            adharNo,
            phone,
            shopnm,
            address,
        });
        await buyer.save();
        res.status(201).json({ message: 'Buyer registered successfully' });
    } catch (error) {
        console.error('Error registering buyer:', error);
        res.status(500).json({ error: 'Failed to register buyer', details: error.message });
    }
};

export const registerDriver = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            contactNumber,
            aadharNumber,
            panCard,
            passportPhoto,
            permanentAddress,
            currentAddress,
            vehicleType,
            vehicleRegistrationNumber,
            drivingLicenseNumber,
            vehicleInsuranceDetails,
            bankAccountNumber,
            ifscCode,
            bankName,
            branchName,
            policeClearanceCertificate,
            consentForBackgroundCheck,
        } = req.body;

        // Validate required fields
        if (!fullName || !password || !contactNumber || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingDriver = await Driver1.findOne({ email });
        if (existingDriver) {
            return res.status(409).json({ error: 'Driver with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new driver instance
        const driver = new Driver1({
            fullName,
            email,
            password: hashedPassword,
            contactNumber,
            aadharNumber,
            panCard,
            passportPhoto,
            permanentAddress,
            currentAddress,
            vehicleType,
            vehicleRegistrationNumber,
            drivingLicenseNumber,
            vehicleInsuranceDetails,
            bankAccountNumber,
            ifscCode,
            bankName,
            branchName,
            policeClearanceCertificate,
            consentForBackgroundCheck,
        });

        // Save the driver to the database
        await driver.save();

        // Respond with the newly created driver
        res.status(201).json({
            success: true,
            message: 'Driver registered successfully',
            driver,
        });
    } catch (error) {
        console.error('Error registering driver:', error); // Log error for debugging
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: error.errors,
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check the three models for the user
        const user = await User.findOne({ email }) || 
                     await Buyer.findOne({ email }) || 
                     await Driver1.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token, include name, phone, and address if needed
        const token = jwt.sign(
            { userId: user._id,email:user.email, role: user.role, address: user.address, name: user.name, phone: user.phone },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );

        // Return the token and user details
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                address: user.address, 
                name: user.name,
                phone: user.phone,
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Fetch all sellers
export const getAllSellers = async (req, res) => {
    try {
        const sellers = await User.find(); // Fetch all sellers from the User model
        res.status(200).json(sellers); // Return the sellers as JSON
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ error: 'Failed to fetch sellers', details: error.message });
    }
};

// Fetch all buyers
export const getAllBuyers = async (req, res) => {
    try {
        const buyers = await Buyer.find(); // Fetch all buyers from the Buyer model
        res.status(200).json(buyers); // Return the buyers as JSON
    } catch (error) {
        console.error('Error fetching buyers:', error);
        res.status(500).json({ error: 'Failed to fetch buyers', details: error.message });
    }
};

// Fetch all drivers
export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver1.find(); // Fetch all drivers from the Driver model
        res.status(200).json(drivers); // Return the drivers as JSON
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ error: 'Failed to fetch drivers', details: error.message});
}
};
