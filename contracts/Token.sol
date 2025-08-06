// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract Token is ERC20, AccessControl, ERC20Permit {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  mapping(address => uint256) public tokensBought;
  mapping(address => bool) public whitelisted;

  uint256 public rate = 1000; // 1 ETH = 1000 tokens
  uint256 public tokenPrice = 1e15; // 0.001 ETH
  uint256 public hardCap = 10000; // 10000 tokens
  uint256 public softCap = 1000; // 1000 tokens
  uint256 public tokensSold = 0;
  uint256 public opensAt = block.timestamp;
  uint256 public closesAt = block.timestamp + 7 days;

  constructor(address initialOwner) ERC20("DiamondNiam", "DNM") ERC20Permit("DiamondNiam") {
    _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
    _grantRole(MINTER_ROLE, initialOwner);
  }

  function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    _mint(to, amount);
    tokensSold += amount;
    tokensBought[to] += amount;
    whitelisted[to] = true;
  }

  function getRate() external view returns (uint256) {
    return rate;
  }

  function getOverview()
    external
    view
    returns (
      string memory _name,
      string memory _symbol,
      uint8 _decimals,
      uint256 _totalSupply,
      uint256 _tokenPrice,
      uint256 _hardCap,
      uint256 _softCap,
      uint256 _tokensSold,
      uint256 _opensAt,
      uint256 _closesAt,
      bool _isOpen
    )
  {
    _name = name();
    _symbol = symbol();
    _decimals = decimals();
    _totalSupply = totalSupply();
    _tokenPrice = tokenPrice;
    _hardCap = hardCap;
    _softCap = softCap;
    _tokensSold = tokensSold;
    _opensAt = opensAt;
    _closesAt = closesAt;
    _isOpen = true;
  }

  function getAddressInfo(
    address buyer
  ) external view returns (bool isWhitelisted, uint256 buyerTokens) {
    isWhitelisted = whitelisted[buyer];
    buyerTokens = tokensBought[buyer];
  }
}
