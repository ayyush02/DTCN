import { create } from 'ipfs-http-client';
const ipfs = create({ url: process.env.IPFS_API_URL });

export const uploadToIPFS = async (data) => {
    const { path } = await ipfs.add(data);
    return path;
};

export const fetchFromIPFS = async (hash) => {
    const stream = ipfs.cat(hash);
    let data = '';
    for await (const chunk of stream) {
        data += chunk.toString();
    }
    return data;
};