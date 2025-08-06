// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract NFT is ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  string[] private _NFTs;
  string private baseCID = "bafybeigwj6oft4eg5xgba5jfa762qffbj7khmg3icgfxw4tsq6vsorpksa";
  string[] private nftFiles = [
    "ada.png",
    "dymka.png",
    "israeli.png",
    "krasotaYrodstvo.png",
    "mbm.png",
    "mouse.png",
    "rodeo.png"
  ];
  uint256 private _tokenIdCounter;
  mapping(string => bool) private _minted;
  mapping(address => mapping(string => bool)) private _userMinted;

  address public stakingContract;

  constructor(address initialOwner) ERC721("Diamond", "DiamondNFT") {
    _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
    _grantRole(MINTER_ROLE, initialOwner);

    for (uint256 i = 0; i < nftFiles.length; i++) {
      string memory fullURI = string.concat(baseCID, "/", nftFiles[i]);
      _NFTs.push(fullURI);
    }

    for (uint256 i = 0; i < _NFTs.length; i++) {
      _minted[_NFTs[i]] = false;
    }
  }

  function safeMint(address to) public onlyRole(MINTER_ROLE) returns (string memory) {
    require(_NFTs.length > 0, "No NFTs initialized");

    for (uint256 i = 0; i < _NFTs.length; i++) {
      string memory currentNFT = _NFTs[i];

      if (!_userMinted[to][currentNFT]) {
        uint256 tokenId = _tokenIdCounter++;
        _userMinted[to][currentNFT] = true;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, currentNFT);

        return currentNFT;
      }

      // if (!_minted[currentNFT]) {
      //   uint256 tokenId = _tokenIdCounter++;
      //   _minted[currentNFT] = true;

      //   _safeMint(to, tokenId);
      //   _setTokenURI(tokenId, currentNFT);

      //   return currentNFT;
      // }
    }

    return "";
  }

  function getAvailableNFTs() public view returns (string[] memory) {
    return _NFTs;
  }

  // The following functions are overrides required by Solidity.

  function _update(
    address to,
    uint256 tokenId,
    address auth
  ) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(
    address account,
    uint128 value
  ) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
