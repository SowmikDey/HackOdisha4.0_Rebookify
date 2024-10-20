import mongoose from 'mongoose';

const { Schema } = mongoose;

const BuyerSchema = new Schema({
    name: { type: String, required: true },
    shopnm: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); 
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    adharNo: {
        type: String,
        required: true,
        select: false 
    }
});

const Buyer = mongoose.model('Buyer', BuyerSchema);

export default Buyer;
