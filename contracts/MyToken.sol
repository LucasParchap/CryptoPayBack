// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CryptoPayToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("CryptoPayToken", "CPT") {
        _mint(msg.sender, initialSupply);
    }
}
