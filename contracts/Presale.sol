// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract Presale {
  Token public token;

  constructor(address tokenAddress) {
    token = Token(tokenAddress);
  }

  function buy() external payable {
    require(msg.value > 0, "Send ETH to buy tokens");
    uint256 amount = msg.value * token.getRate();
    token.mint(msg.sender, amount);
  }
}
