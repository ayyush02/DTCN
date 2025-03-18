// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockTimeOracle {
    uint256 private _currentTime;

    constructor() {
        _currentTime = block.timestamp;
    }

    function setTime(uint256 newTime) external {
        _currentTime = newTime;
    }

    function getTime() external view returns (uint256) {
        return _currentTime;
    }
}
