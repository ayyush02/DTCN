import Notification from '../models/notification.js';

export const sendNotification = async (user, message) => {
    return await Notification.create({ user, message, timestamp: Date.now(), read: false });
};
