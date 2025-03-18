import React, { useState } from "react";
import { useTimeCapsule } from "../hooks/useTimeCapsule";

const CapsuleCreator = () => {
    const { createCapsule } = useTimeCapsule();
    const [message, setMessage] = useState("");
    const [unlockTime, setUnlockTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCapsule(message, unlockTime);
    };

    return (
        <div>
            <h2>Create a Time Capsule</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={unlockTime}
                    onChange={(e) => setUnlockTime(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CapsuleCreator;
