const Token = artifacts.require("Token");
const Presale = artifacts.require("Presale");

contract("Presale", (accounts) => {
  const [owner, user1] = accounts;

  let instance, token;

  beforeEach(async () => {
    token = await Token.new(owner, { from: owner });
    instance = await Presale.new(token.address, { from: owner });

    await token.transferOwnership(instance.address, { from: owner });
  });

  it("should mint a token and assign it to the correct user", async () => {
    const amountToBuyETH = 1;
    const tx = await instance.buy({ from: user1, value: String(amountToBuyETH ** 18) });
    const rate = Number(await token.getRate());

    const user1Balance = Number(await token.balanceOf(user1));
    assert.equal(user1Balance, amountToBuyETH * rate, "Token not owned by user1");
  });
});
