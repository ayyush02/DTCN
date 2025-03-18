import React, { useEffect } from "react";
import { useTimeCapsule } from "../hooks/useTimeCapsule";

const Dashboard = () => {
    const { capsules, getCapsules } = useTimeCapsule();

    useEffect(() => {
        getCapsules();
    }, []);

    return (
        <div>
            <h2>My Capsules</h2>
            <ul>
                {capsules.map((capsule, index) => (
                    <li key={index}>
                        <p>Content Hash: {capsule.contentHash}</p>
                        <p>Unlock Time: {new Date(capsule.unlockTime * 1000).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
