import {fetchBalance} from '../state/actions';

export const buyTokens = async (state, dispatch, etherValue) => {
  const {address, contracts: {EthSwap, Token}} = state;
  try {
    const weiValue = window.web3.utils.toWei(etherValue, 'Ether');
    await EthSwap.methods.buyTokens().send({
      from: address,
      value: weiValue
    });

    const data = await fetchBalance(address, Token, EthSwap);
    dispatch(data);
  } catch (e) {
    console.log(e);
  }
}

export const sellTokens = async (state, dispatch, tokensValue) => {
  const {address, contracts: {EthSwap, Token}} = state;
  try {
    const weiValue = window.web3.utils.toWei(tokensValue, 'Ether');

    console.log(EthSwap._address);

    await Token.methods.approve(EthSwap._address, weiValue).send({from: address});
    await EthSwap.methods.sellTokens(weiValue).send({from: address});

    const data = await fetchBalance(address, Token, EthSwap);
    dispatch(data);
  } catch (e) {
    console.log(e);
  }
}
