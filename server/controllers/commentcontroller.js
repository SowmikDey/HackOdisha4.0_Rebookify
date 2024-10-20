import Comment from '../models/comments.js'; // Assuming you have a Comment model

// Get comments by product ID (existing function)
export const getCommentsByProductId = async (req, res) => {
    const { id } = req.params; // Product ID

    try {
        const comments = await Comment.find({ productId: id });
        res.status(200).json(comments); // Return comments as JSON
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments', details: error.message });
    }
};

// Post a new comment for a specific product (new function)
export const addCommentToProduct = async (req, res) => {
    const { id } = req.params; // Product ID from URL
    const { text, userId } = req.body; // Comment text and user ID from request body

    if (!text || !userId) {
        return res.status(400).json({ error: 'Comment text and user ID are required.' });
    }

    try {
        // Create a new comment document
        const newComment = new Comment({
            productId: id,
            text,
            userId,
            createdAt: new Date(),
        });

        // Save the comment to the database
        await newComment.save();

        res.status(201).json(newComment); // Return the saved comment
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment', details: error.message });
    }
};
