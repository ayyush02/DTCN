interface IContentStorage {
    function storeContent(address user, string memory dataHash) external;
    function getContent(address user) external view returns (string memory);
}