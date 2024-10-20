import Order from "../models/Order.js";// Import Order schema

// Controller for creating a new order with payment details
export const createOrder = async (req, res) => {
  const {
    productID, buyer, seller, pickupAddress, deliveryAddress, transactionId, amountPaid, paymentTime,
  } = req.body;  // Fetch from the request body

  try {
    // Create a new order
    const newOrder = new Order({
      productID,
      buyer,                // Assuming buyer is the ObjectId from the Buyer schema
      seller,               // Assuming seller is the ObjectId from the Seller schema
      pickupAddress,
      deliveryAddress,
      transactionId,
      amountPaid,
      paymentTime,           // You might need to parse paymentTime if it's coming as a string
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Failed to create order', error});
}
};
