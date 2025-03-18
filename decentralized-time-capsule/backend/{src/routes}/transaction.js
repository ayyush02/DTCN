import express from 'express';
import Transaction from '../models/transaction.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { user, capsuleId, transactionHash, timestamp } = req.body;
    const newTransaction = await Transaction.create({ user, capsuleId, transactionHash, timestamp });
    res.json(newTransaction);
});

router.get('/:user', async (req, res) => {
    const transactions = await Transaction.find({ user: req.params.user });
    res.json(transactions);
});

export default router;