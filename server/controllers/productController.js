import Product from '../models/Product.js';
import User from '../models/User.js';

export const postProduct = async (req, res) => {
    const { name, email, description, price, location, category, yearsUsed } = req.body;
    const sellerId = req.user.userId;

    try {
        const product = new Product({
            seller: sellerId,
            name,
            email,
            description,
            price,
            location,
            category,
            yearsUsed,
        });
        await product.save();
        const buyers = await User.find({ role: 'buyer' });
        buyers.forEach(buyer => {
            console.log(`Notifying buyer: ${buyer.email}`);
        });
        res.status(201).json({ message: 'Product posted and notifications sent' });
    } catch (error) {
        console.error('Error posting product:', error);
        res.status(500).json({ error: 'Failed to post product', details: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

// New function to get product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters

    try {
        const product = await Product.findById(id); // Find the product by ID

        if (!product) {
            return res.status(404).json({ error: 'Product not found' }); // Handle not found
        }

        res.status(200).json(product); // Return the product as JSON
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Failed to fetch product details', details: error.message });
    }
};
