interface ITimeCapsule {
    function unlock() external;
    function owner() external view returns (address);
    function contentHash() external view returns (string memory);
    function unlockTime() external view returns (uint256);
    function unlocked() external view returns (bool);
}
