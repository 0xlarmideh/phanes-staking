// web3.js
import Web3 from 'web3';

export const getWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    // Modern dapp browsers
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return web3;
    } catch (error) {
      console.error('Failed to connect to the wallet:', error);
      throw error;
    }
  } else if (typeof window.web3 !== 'undefined') {
    // Legacy dapp browsers
    const web3 = new Web3(window.web3.currentProvider);
    return web3;
  } else {
    // Non-dapp browsers
    console.error('No wallet detected.');
    throw new Error('No wallet detected.');
  }
};

// Function to get the connected wallet address
export const getWalletAddress = async (web3) => {
  const accounts = await web3.eth.getAccounts();

  if (accounts.length === 0) {
    throw new Error('No accounts found in MetaMask');
  }

  return accounts[0];
};

// Function to get the wallet balance in ETH
export const getWalletBalance = async (web3,walletAddress) => {
  
  if (!web3.utils.isAddress(walletAddress)) {
    throw new Error('Invalid Ethereum address');
  }

  const balance = await web3.eth.getBalance(walletAddress);
  return web3.utils.fromWei(balance, 'ether');
};

// Function to get the network ID
export const getNetworkId = async (web3) => {
  const networkId = await web3.eth.getId();
  return networkId;
};