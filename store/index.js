import { getWeb3, getWalletAddress, getWalletBalance, getNetworkId } from '@/plugins/web3';


export const state = () => ({
  nightMode: false,
  showPopup: false,

  networkID: '',
  web3: null,
  isConnected: false,
  walletAddress: '',
  walletBalance: '',
  error: null,

  // Used in ConnectWallet
  currencyFrom: { icon: "eth-icon.png", title: "ETH" },
  currencyTo: { icon: "dpi.png", title: "DPI" },
  currencies: [
    { icon: "eth-icon.png", title: "ETH" },
    { icon: "dpi.png", title: "DPI" },
  ],
  sllipageVal: 1,
  balance: 0,
  popupType: "",

  // Staking
  showStakingPopup: false,
  selectedStakingCurrency: { icon: "eth-icon.png", title: "ETHEREUM" },
  stakingCurrencies: [
    { icon: "eth-icon.png", title: "ETHEREUM" },
    { icon: "dpi.png", title: "DPI" },
  ],
});

export const mutations = {
  changeMode(state, val) {
    state.nightMode = val;
  },
  togglePopup(state, val) {
    state.showPopup = val;
  },
  toggleStakingPopup(state, val) {
    state.showStakingPopup = val;
  },

  // Used in ConnectWallet
  updateSllipageVal(state, val) {
    state.sllipageVal = val;
  },
  setCurrency(state, info) {
    if (info.type === "swapFrom") {
      state.currencyFrom = info.currency;
    } else if (info.type === "swapTo") {
      state.currencyTo = info.currency;
    }
  },
  setPopupType(state, val) {
    state.popupType = val;
  },

  // Staking
  setStakingCurrency(state, info) {
    state.selectedStakingCurrency = info.currency;
  },
  
  SET_WEB3(state, web3) {
    state.web3 = web3;
  },
  SET_NETWORK_ID(state, id) {
    state.networkID = id;
  },
  SET_CONNECTED(state, connected) {
    state.isConnected = connected;
  },
  SET_WALLET_ADDRESS(state, address) {
    state.walletAddress = address;
  },
  SET_WALLET_BALANCE(state, balance) {
    state.walletBalance = balance;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
  RESET_STATE(state) {
    state.web3 = null;
    state.networkID = '';
    state.isConnected = false;
    state.walletAddress = '';
    state.walletBalance = '';
    state.error = null;
  },
};

export const actions = {
  async connectMetaMask({ commit, state }) {
    try {
      if (!state.isConnected) {
        const web3 = await getWeb3();
        
        // commit('SET_WEB3', web3);
        commit('SET_CONNECTED', true);

        const account = await getWalletAddress(web3);
        commit('SET_WALLET_ADDRESS', account);
      
        const balance = await getWalletBalance(web3, account);
        commit('SET_WALLET_BALANCE', balance);

        const networkID = await getNetworkId(web3);
        commit('SET_NETWORK_ID', networkID);
      }
    } catch (error) {
      commit('SET_ERROR', error.message);
    }
  },

  async disconnectMetaMask({ commit }) {
    try {
      commit('RESET_STATE');
    } catch (error) {
      commit('SET_ERROR', error.message);
    }
  },

  clearError({ commit }) {
    commit('CLEAR_ERROR');
  },
};