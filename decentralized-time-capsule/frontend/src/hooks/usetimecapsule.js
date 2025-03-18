import { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contracts";

export const useTimeCapsule = () => {
    const [capsules, setCapsules] = useState([]);

    const getCapsules = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const data = await contract.getCapsules();
        setCapsules(data);
    };

    const createCapsule = async (contentHash, unlockTime) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        await contract.createCapsule(contentHash, Math.floor(new Date(unlockTime).getTime() / 1000));
    };

    return { capsules, getCapsules, createCapsule };
};
