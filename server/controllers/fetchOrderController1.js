import Order from '../models/Order.js'; 

export const fetchOrders = async () => {
    try {
      const orders = await Order.find()
        .populate({
          path: 'buyer',
          select: 'phone' // Only select the phone field from the Buyer
        })
        .populate({
          path: 'seller',
          select: 'phone' // Only select the phone field from the Seller
        });
  
      return orders; // Return the orders for the route to use
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error; // Re-throw error for route handling
    }
  };
  
