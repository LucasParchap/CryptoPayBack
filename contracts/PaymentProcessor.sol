// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PaymentProcessor {
    address public owner;
    IERC20 public token;

    event PaymentMade(address indexed from, address indexed to, uint256 amount);

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function makePayment(address to, uint256 amount) external {
        require(token.transferFrom(msg.sender, to, amount), "Token transfer failed");
        emit PaymentMade(msg.sender, to, amount);
    }
}
