import "./interfaces/IContentStorage.sol";
contract ContentStorage is IContentStorage {
    mapping(address => string) private storageData;
    function storeContent(address user, string memory dataHash) external {
        storageData[user] = dataHash;
    }
}

// Interfaces
interface ITimeCapsuleRegistry {
    function createCapsule(string memory contentHash, uint256 unlockTime) external;
}

interface ITimeCapsule {
    function unlock() external;
}

interface IContentStorage {
    function storeContent(address user, string memory dataHash) external;
}

// Libraries
library CapsuleLib {
    function isUnlockable(uint256 unlockTime) internal view returns (bool) {
        return block.timestamp >= unlockTime;
    }
}

library TimeUtils {
    function getCurrentTime() internal view returns (uint256) {
        return block.timestamp;
    }
}
