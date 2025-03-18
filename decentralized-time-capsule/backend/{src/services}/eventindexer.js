import Web3 from 'web3';
import dotenv from 'dotenv';
import Capsule from '../models/capsule.js';

dotenv.config();
const web3 = new Web3(process.env.BLOCKCHAIN_RPC);

export const listenToEvents = () => {
    console.log('Listening to blockchain events...');
    // Add logic to listen to smart contract events and update DB
};