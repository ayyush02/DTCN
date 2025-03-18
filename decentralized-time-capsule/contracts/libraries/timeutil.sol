library TimeUtils {
    function getCurrentTime() internal view returns (uint256) {
        return block.timestamp;
    }
}
