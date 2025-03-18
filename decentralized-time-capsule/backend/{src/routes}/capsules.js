import express from 'express';
import Capsule from '../models/capsule.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { owner, timestamp, dataHash } = req.body;
    const newCapsule = await Capsule.create({ owner, timestamp, dataHash });
    res.json(newCapsule);
});

router.get('/:owner', async (req, res) => {
    const capsules = await Capsule.find({ owner: req.params.owner });
    res.json(capsules);
});

export default router;