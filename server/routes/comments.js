import express from 'express';
import { getCommentsByProductId,addCommentToProduct } from '../controllers/commentcontroller.js';

const router = express.Router();

router.get('/products/:id/comments', getCommentsByProductId); // Route for fetching comments by product ID
router.post('/products/:id/comments', addCommentToProduct);

export default router;
