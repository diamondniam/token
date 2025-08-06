const Token = artifacts.require("Token");
const NFT = artifacts.require("NFT");
const Staking = artifacts.require("Staking");
const Presale = artifacts.require("Presale");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0];

  await deployer.deploy(Token, owner);
  const token = await Token.deployed();

  await deployer.deploy(NFT, owner);
  const nft = await NFT.deployed();

  await deployer.deploy(Staking, token.address, nft.address);
  const staking = await Staking.deployed();

  const nftMinterRole = await nft.MINTER_ROLE();
  await nft.grantRole(nftMinterRole, staking.address, { from: owner });

  await deployer.deploy(Presale, token.address);
  const presale = await Presale.deployed();

  const tokenMinterRole = await token.MINTER_ROLE();
  await token.grantRole(tokenMinterRole, presale.address, { from: owner });
  await token.grantRole(tokenMinterRole, staking.address, { from: owner });
};
