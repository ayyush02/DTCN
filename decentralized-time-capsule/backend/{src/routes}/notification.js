import express from 'express';
import Notification from '../models/notification.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { user, message, timestamp } = req.body;
    const newNotification = await Notification.create({ user, message, timestamp });
    res.json(newNotification);
});

router.get('/:user', async (req, res) => {
    const notifications = await Notification.find({ user: req.params.user });
    res.json(notifications);
});

export default router;