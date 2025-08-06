// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "./NFT.sol";

contract Staking {
  Token public immutable token;
  NFT public immutable nft;
  uint256 public immutable amountToGetNFT = 30;
  mapping(address => uint256) public staked;

  constructor(address tokenAddress, NFT _nft) {
    token = Token(tokenAddress);
    nft = _nft;
  }

  function stake() external payable {
    require(msg.value > 0, "Stake more than 0");
    uint256 rate = token.getRate();
    uint256 tokensAmount = msg.value * rate;
    token.mint(msg.sender, tokensAmount);
    staked[msg.sender] += tokensAmount;

    if (tokensAmount >= amountToGetNFT) {
      nft.safeMint(msg.sender);
    }
  }

  function getBalance(address user) external view returns (uint256) {
    return staked[user];
  }

  function getAmountToGetNFT() external pure returns (uint256) {
    return amountToGetNFT;
  }
}
