// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgeVerification {
    struct User {
        string name;
        uint256 birthYear;
        bool exists;
    }

    mapping(string => User) private users;

    event UserRegistered(string username, string name, uint256 birthYear);

    function registerUser(string memory _username, string memory _name, uint256 _birthYear) public {
        users[_username] = User(_name, _birthYear, true);
        emit UserRegistered(_username, _name, _birthYear);
    }

    function isEligible(string memory _username) public view returns (bool) {
        require(users[_username].exists, "User does not exist");
        uint256 currentYear = block.timestamp / 31556952 + 1970;
        return currentYear - users[_username].birthYear >= 18;
    }

    function getUser(string memory _username) public view returns (string memory, uint256) {
        User memory user = users[_username];
        require(user.exists, "User does not exist");
        return (user.name, user.birthYear);
    }

    function isUserRegistered(string memory _username) public view returns (bool) {
        return users[_username].exists;
    }
}
