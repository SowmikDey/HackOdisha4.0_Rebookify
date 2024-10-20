import express from "express";
import multer from "multer";
import {
    registerSeller,
    registerBuyer,
    registerDriver,
    login,
} from '../controllers/authController.js';


const router = express.Router();

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]); // Generate a unique file name
    },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// Define your routes
router.post('/regSeller', registerSeller);
router.post('/regBuyer', registerBuyer);
router.post('/regDel', upload.fields([
    { name: 'passportPhoto', maxCount: 1 }, 
    { name: 'policeClearanceCertificate', maxCount: 1 }
]), registerDriver);
router.post('/login', login);



export default router;
