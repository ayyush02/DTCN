// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ITimeCapsuleRegistry.sol
interface ITimeCapsuleRegistry {
    function createCapsule(string memory contentHash, uint256 unlockTime) external;
}