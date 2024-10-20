import authenticate from '../middleware/authenticate';
import express from 'express';

const router = express.Router();

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'You have access to this protected route!', user: req.user });
});

export default router;
