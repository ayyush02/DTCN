import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY;

export const encrypt = (text) => {
    const cipher = crypto.createCipher(algorithm, secretKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

export const decrypt = (hash) => {
    const decipher = crypto.createDecipher(algorithm, secretKey);
    let decrypted = decipher.update(hash, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
