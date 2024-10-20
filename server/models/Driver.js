import mongoose from 'mongoose';

const { Schema } = mongoose;

const DriverSchema = new Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: {
        type: String,
        validate: {
            // Regex to validate numbers in E.164 format or 10-digit numbers
            validator: (v) => {
                return (
                    /^[+]?[0-9]{1,3}[0-9]{10}$/.test(v) ||  // Accept E.164 format
                    /^[0-9]{10}$/.test(v)                  // Accept 10-digit format
                );
            },
            message: (props) => `${props.value} is not a valid mobile number!`,
        },
        required: true,
    },
    email: { type: String, unique: true, required: true },
    aadharNumber: { type: String },
    panCard: { type: String },
    permanentAddress: { type: String },
    currentAddress: { type: String },
    vehicleType: { type: String },
    vehicleRegistrationNumber: { type: String },
    drivingLicenseNumber: { type: String },
    vehicleInsuranceDetails: { type: String },
    bankAccountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    branchName: { type: String },
    consentForBackgroundCheck: { type: Boolean, default: false },
}, { timestamps: true });

const Driver1 = mongoose.model('Driver1', DriverSchema);

export default Driver1;
