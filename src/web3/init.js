import Web3 from 'web3';

export const init = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    return Promise.resolve();
  }

  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return Promise.resolve();
  }

  alert('Non-ethereum browser detected!. You should consider trying Metamask');
  return Promise.reject();
}
