const { ethers } = require("ethers");

const Token = artifacts.require("Token");
const Presale = artifacts.require("Presale");
const Staking = artifacts.require("Staking");
const NFT = artifacts.require("NFT");

contract("Staking", (accounts) => {
  const [owner, user1] = accounts;
  let staking, token, nft, presale;

  const stakeAmount = ethers.parseEther("0.1");

  beforeEach(async () => {
    token = await Token.new(owner, { from: owner });
    nft = await NFT.new(owner, { from: owner });
    presale = await Presale.new(token.address, { from: owner });
    staking = await Staking.new(token.address, nft.address, { from: owner });

    const minterRole = await token.MINTER_ROLE();
    await token.grantRole(minterRole, staking.address, { from: owner });
    await token.grantRole(minterRole, presale.address, { from: owner });

    const nftMinterRole = await nft.MINTER_ROLE();
    await nft.grantRole(nftMinterRole, staking.address, { from: owner });
  });

  it("should stake and update balances", async () => {
    await staking.stake({ value: stakeAmount.toString(), from: user1 });

    const rate = await token.getRate();
    const balance = await token.balanceOf(user1);
    const staked = await staking.getBalance(user1);

    const resultTokens = BigInt(rate) * stakeAmount;

    assert.equal(
      balance.toString(),
      resultTokens.toString(),
      "User1 balance should be rate * stakeAmount",
    );
    assert.equal(
      staked.toString(),
      resultTokens.toString(),
      "User1 staked should be rate * stakeAmount",
    );
  });

  it("if stake tokensAmount >= getAmountToGetNFT, NFT should be minted", async () => {
    const stakeAmountToGetNFT = await staking.getAmountToGetNFT();
    const rate = await token.getRate();

    const stakeAmountToGetNFTtoWei = ethers.parseEther((stakeAmountToGetNFT / rate).toString());

    await staking.stake({ value: stakeAmountToGetNFTtoWei.toString(), from: user1 });

    const balance = await token.balanceOf(user1);

    assert.equal(
      Number(balance),
      Number(stakeAmountToGetNFTtoWei) * Number(rate),
      "User1 balance should be stakeAmountToGetNFT",
    );

    const nftBalance = await nft.balanceOf(user1);
    assert.equal(nftBalance.toNumber(), 1, "NFT should be minted");
  });

  it("should stake multiple times and get correct balance of tokens and NFTs", async () => {
    const amountSteps = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
    const rate = await token.getRate();

    function stake(amount) {
      return staking.stake({ value: amount.toString(), from: user1 });
    }

    let staked = BigInt(0);

    for (let i = 0; i < amountSteps.length; i++) {
      await stake(amountSteps[i]);
      staked += amountSteps[i];

      const balance = await token.balanceOf(user1);

      assert.equal(
        balance.toString(),
        (BigInt(rate) * staked).toString(),
        "User1 balance should be rate * amount",
      );

      const NFTs = await nft.balanceOf(user1);
      assert.equal(NFTs.toNumber(), i + 1, "NFT should be minted");
    }
  });
});
