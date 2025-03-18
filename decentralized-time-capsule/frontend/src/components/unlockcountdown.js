import React, { useState, useEffect } from "react";

const UnlockCountdown = ({ unlockTime }) => {
    const [timeLeft, setTimeLeft] = useState(unlockTime - Math.floor(Date.now() / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(unlockTime - Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [unlockTime]);

    return (
        <div>
            <h3>Time Until Unlock:</h3>
            <p>{timeLeft > 0 ? `${timeLeft} seconds` : "Capsule is now unlockable!"}</p>
        </div>
    );
};

export default UnlockCountdown;
