// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// TimeCapsuleRegistry.sol
import "./TimeCapsule.sol";
import "./AccessControl.sol";
import "./interfaces/ITimeCapsuleRegistry.sol";

contract TimeCapsuleRegistry is ITimeCapsuleRegistry, AccessControl {
    mapping(address => address[]) public userCapsules;
    event CapsuleCreated(address indexed user, address capsuleAddress);

    function createCapsule(string memory contentHash, uint256 unlockTime) external {
        TimeCapsule capsule = new TimeCapsule(msg.sender, contentHash, unlockTime);
        userCapsules[msg.sender].push(address(capsule));
        emit CapsuleCreated(msg.sender, address(capsule));
    }
}