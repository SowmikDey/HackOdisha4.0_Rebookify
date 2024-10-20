import Order from '../models/Order.js';

export const paymentStatus = async (req, res) => {
    const { transactionId } = req.query;  // Assuming transactionId is passed in the query params

    try {
        // Find the order by transaction ID
        const order = await Order.findOne({ transactionId });
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Send the payment status of the order
        res.status(200).json({ status: order.paymentStatus });
    } catch (error) {
        console.error('Error fetching payment status:', error);
        res.status(500).json({ error: 'Failed to fetch payment status', details: error.message });
    }
};
