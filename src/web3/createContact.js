import EthSwapSource from '../abis/EthSwap.json';
import TokenSource from '../abis/Token.json';

const createContract = async (contractSource) => {
  const networkId = await window.web3.eth.net.getId();
  const address = contractSource.networks[networkId]?.address;

  if (!address) {
    return Promise.reject();
  }

  const contract = new window.web3.eth.Contract(contractSource.abi, address);

  return Promise.resolve(contract);
}

export const getAppContracts = async () => {
  const EthSwap = await createContract(EthSwapSource);
  const Token = await createContract(TokenSource);

  return {EthSwap, Token};
}
