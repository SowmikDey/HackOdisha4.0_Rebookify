import mongoose from 'mongoose';

const { Schema } = mongoose; 

const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    email:{type:String, required:true},
    name: { type: String, required: true }, // Changed 'Product' to 'name' for clarity
    description: String, 
    price: { type: Number, required: true }, // Ensure price is required
    location: String, 
    category: String, 
    yearsUsed: Number, 
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

const Product = mongoose.model('Product', ProductSchema);

export default Product;
