// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// CapsuleLib.sol
library CapsuleLib {
    function isUnlockable(uint256 unlockTime) internal view returns (bool) {
        return block.timestamp >= unlockTime;
    }
}