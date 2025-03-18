contract AccessControl {
    mapping(address => bool) public admins;
    event AdminAdded(address indexed admin);

    constructor() {
        admins[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not an admin");
        _;
    }

    function addAdmin(address admin) external onlyAdmin {
        admins[admin] = true;
        emit AdminAdded(admin);
    }
}
