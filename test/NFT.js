const MyNFT = artifacts.require("NFT");
const Staking = artifacts.require("Staking");
const Token = artifacts.require("Token");

contract("NFT", (accounts) => {
  const [owner, user1] = accounts;

  let instance;

  beforeEach(async () => {
    const token = await Token.new(owner, { from: owner });
    instance = await MyNFT.new(owner, { from: owner });
    const staking = await Staking.new(token.address, instance.address, { from: owner });

    const minterRole = await instance.MINTER_ROLE();
    await instance.grantRole(minterRole, staking.address, { from: owner });
  });

  it("should mint a token and assign it to the correct user", async () => {
    const tx = await instance.safeMint(user1, { from: owner });

    const event = tx.logs.find((log) => log.event === "Transfer");
    assert(event, "Transfer event should be emitted");

    const tokenId = event.args.tokenId.toNumber();
    assert.equal(await instance.ownerOf(tokenId), user1, "Token not owned by user1");

    const tokenURI = await instance.tokenURI(tokenId);
    assert.equal(typeof tokenURI, "string", "Token URI is not an IPFS link");
  });
});
