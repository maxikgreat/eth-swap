const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai').use(require('chai-as-promised')).should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
  let token, ethSwap;

  before(async () => {
    token = await Token.new()
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokens('1000000'));
  });

  describe('EthSwap',  () => {
    it('has a name', async () => {
      const name = await ethSwap.name();
      assert.equal(name, 'EthSwap Exchange');
    })

    it('has a 1 million tokens after deployment', async () => {
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), tokens('1000000'));
    })

    it('can buy tokens', async () => {
      const result = await ethSwap.buyTokens({
        from: investor,
        value: tokens('1'),
      });

      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens('100'));

      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens('999900'));

      const ethSwapEthBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapEthBalance.toString(), tokens('1'));

      const {account ,token: tokenAdr, amount, rate} = result.logs[0].args;

      assert.equal(account, investor);
      assert.equal(tokenAdr, token.address);
      assert.equal(amount.toString(), tokens('100').toString());
      assert.equal(rate.toString(), '100');
    })

    it('can sell tokens', async () => {
      await token.approve(ethSwap.address, tokens('100'), {from: investor});
      const result = await ethSwap.sellTokens(tokens('100'), {from: investor});

      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens('0'));

      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens('1000000'));

      const ethSwapEthBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapEthBalance.toString(), tokens('0'));

      const {account ,token: tokenAdr, amount, rate} = result.logs[0].args;

      assert.equal(account, investor);
      assert.equal(tokenAdr, token.address);
      assert.equal(amount.toString(), tokens('100').toString());
      assert.equal(rate.toString(), '100');

      // fail conditions

      await ethSwap.sellTokens('500', {from: investor}).should.be.rejected;
    })
  })
})
