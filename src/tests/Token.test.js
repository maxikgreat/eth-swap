const Token = artifacts.require('Token');

require('chai').use(require('chai-as-promised')).should();

contract(Token, accounts => {
  describe('Token deployment',  () => {
    it('contract has a name', async () => {
      let token = await Token.new();
      const name = await token.name();

      assert.equal(name, 'DApp Token');
    })
  })
})
