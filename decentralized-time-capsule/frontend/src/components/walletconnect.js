import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Wallet connection failed:", error);
            }
        } else {
            alert("Please install MetaMask to use this feature.");
        }
    };

    return (
        <div>
            {account ? <p>Connected: {account}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
        </div>
    );
};

export default WalletConnect;
