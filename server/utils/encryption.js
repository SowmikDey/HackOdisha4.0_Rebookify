// utils/encryption.js
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes
const IV = process.env.IV; // Must be 16 bytes

// Encrypt data
export const encryptData = (data) => {
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32); 
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); 

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV with the encrypted data
    return iv.toString('hex') + ':' + encrypted;
};

// Decrypt data
export const decryptData = (data) => {
  const parts = data.split(':'); // Split the IV from the encrypted data
  const iv = Buffer.from(parts.shift(), 'hex'); // Get IV
  const encryptedText = Buffer.from(parts.join(':'), 'hex'); // Get encrypted text
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
