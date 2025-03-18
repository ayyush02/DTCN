import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();
const web3 = new Web3(process.env.BLOCKCHAIN_RPC);

export const initializeWeb3 = () => {
    console.log('Web3 initialized');
};

export const getContractInstance = (abi, address) => {
    return new web3.eth.Contract(abi, address);
};
