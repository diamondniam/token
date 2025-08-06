const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  const [owner, user1] = accounts;

  let instance;

  beforeEach(async () => {
    instance = await Token.new(owner, { from: owner });
  });

  it("should mint a token and assign it to the correct user", async () => {
    const tx = await instance.mint(user1, 100, { from: owner });

    const event = tx.logs.find((log) => log.event === "Transfer");
    assert(event, "Transfer event should be emitted");

    const user1Balance = await instance.balanceOf(user1);
    assert.equal(user1Balance.toNumber(), 100, "Token not owned by user1");
  });

  it("should has correct rate", async () => {
    const rate = await instance.getRate();
    assert.equal(rate.toNumber(), 1000, "Rate should be 100");
  });
});
