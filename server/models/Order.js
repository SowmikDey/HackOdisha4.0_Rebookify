import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
    productID: {type: String, required: true},
    buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },  // Updated field name
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },  // Updated field name
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryStatus: { type: String, enum: ['pending', 'accepted', 'delivered'], default: 'pending' },
    deliveryBoy: { type: Schema.Types.ObjectId, ref: 'Driver1' },  // Reference to the Driver schema
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;