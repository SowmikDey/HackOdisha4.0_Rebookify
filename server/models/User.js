// models/Seller.js
import mongoose from 'mongoose';
import { encryptData, decryptData } from '../utils/encryption.js'; // Import encryption functions

const { Schema } = mongoose;

const SellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password:{type: String, required: true},
  address: { // Added address field
    type: String,
    required: true, // Assuming address is required, modify if necessary
  },
  adharNo: {
    type: String,
    required: true,
    select: false, // Exclude from queries
  },
  licenseNo: {
    type: String,
    required: true,
    select: false, // Exclude from queries
  },
  phone: {
    type: String,
    required: true,
  },
  bankDetails: {
    accountHolderName: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
      select: false, // This will exclude the field from queries by default
    },
    ifscCode: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
    },
  },
}, { timestamps: true });

// Pre-save hook to encrypt sensitive information
SellerSchema.pre('save', function (next) {
  if (this.isModified('adharNo')) {
    this.adharNo = encryptData(this.adharNo);
  }
  if (this.isModified('bankDetails.bankAccountNumber')) {
    this.bankDetails.bankAccountNumber = encryptData(this.bankDetails.bankAccountNumber);
  }
  if (this.isModified('licenseNo')) {
    this.licenseNo = encryptData(this.licenseNo);
  }
  next();
});

// Method to decrypt sensitive fields
SellerSchema.methods.getDecryptedData = function () {
  return {
    ...this._doc,
    adharNo: decryptData(this.adharNo),
    bankAccountNumber: decryptData(this.bankDetails.bankAccountNumber),
    licenseNo: decryptData(this.licenseNo),
  };
};

const Seller = mongoose.model('Seller', SellerSchema);

export default Seller;
