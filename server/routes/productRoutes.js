import express from 'express';
import { postProduct,getAllProducts,getProductById } from '../controllers/productController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/create-post', authenticate, postProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);


export default router;
