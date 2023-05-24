export const state = () => ({
  nightMode: false,
  showPopup: false,

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

// export const getters = {
//   getterValue: state => {
//     return state.value
//   }
// }

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
};

// export const actions = {
// }