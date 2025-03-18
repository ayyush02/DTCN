contract TimeCapsule {
    address public owner;
    string private contentHash;
    uint256 public unlockTime;
    bool public unlocked;

    event CapsuleUnlocked(address owner, string contentHash);

    constructor(address _owner, string memory _contentHash, uint256 _unlockTime) {
        owner = _owner;
        contentHash = _contentHash;
        unlockTime = _unlockTime;
        unlocked = false;
    }

    function unlock() external {
        require(block.timestamp >= unlockTime, "Capsule is still locked");
        require(msg.sender == owner, "Only the owner can unlock");
        unlocked = true;
        emit CapsuleUnlocked(owner, contentHash);
    }
}
