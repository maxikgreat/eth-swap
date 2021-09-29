import {SET_ADDRESS, SET_BALANCE, SET_CONTRACTS, SET_INITIAL_LOADING, SET_PURCHASE_LOADING} from './types';

export const fetchAddress = async () => {
  try {
    const accounts = await window.web3.eth.getAccounts();

    return {
      type: SET_ADDRESS,
      payload: accounts?.[0] ?? null
    }
  } catch (e) {
    return {
      type: SET_ADDRESS,
      payload: null,
    }
  }
}

export const fetchBalance = async (address, Token, EthSwap) => {
  try {
    const ethBalance = await window.web3.eth.getBalance(address);
    const tokenBalance = await Token.methods.balanceOf(address).call();
    const exchangeRate = await EthSwap.methods.rate().call();

    return {
      type: SET_BALANCE,
      payload: {
        tokens: tokenBalance,
        eth: ethBalance,
        exchangeRate,
      },
    }
  } catch (e) {
    return {
      type: SET_BALANCE,
      payload: {
        tokens: null,
        eth: null,
        exchangeRate: null,
      },
    }
  }
}

export const setContracts = (contracts) => ({
  type: SET_CONTRACTS,
  payload: contracts,
})

export const setInitialLoading = (value) => ({
  type: SET_INITIAL_LOADING,
  payload: value,
})

export const setPurchaseLoading = (value) => ({
  type: SET_PURCHASE_LOADING,
  payload: value,
})
