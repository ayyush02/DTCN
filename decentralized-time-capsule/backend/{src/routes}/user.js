import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { address, email } = req.body;
    const newUser = await User.create({ address, email });
    res.json(newUser);
});

router.get('/:address', async (req, res) => {
    const user = await User.findOne({ address: req.params.address });
    res.json(user);
});

export default router;