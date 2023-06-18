<template>
  <div class="popup">
    <div class="popup-head">
      <h3>Connect a Wallet</h3>
      <div @click="toggleConnectWalletPopup(false)">
        <Icon
          class="close"
          icon="carbon:close-filled"
          color="#1bd19c"
          width="32"
          height="32"
        />
      </div>
    </div>
    <div class="popup-grid">
      <div class="left-grid">
        <h4 class="wallets-title">Recommended</h4>
        <div class="wallets">
          <div
            class="wallet"
            v-for="(wallet, index) in walletProviders"
            :key="index"
          >
            <img :src="require(`@/assets/wallets/${wallet.icon}`)" :alt="wallet.name" />
            <h4>{{ wallet.name }}</h4>
          </div>
        </div>
      </div>
      <div class="right-grid">
        <h3>What is a Wallet?</h3>
        <div>
          <h4>A home for your digital assets</h4>
          <p class="what-desc">
            Wallets are used to send, receive, store and display digital assets
            like Ethereum and NFTs.
          </p>
        </div>
        <div>
          <h4>A new way to log in</h4>
          <p class="what-desc">
            Instead of creating new accounts and passwords on every website,
            just connect your wallet.
          </p>
        </div>
        <div class="wallet-btns">
          <button class="btn-green">Get a Wallet</button>
          <a class="btn-green no-bg" href="#">Learn more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Icon } from "@iconify/vue2";
export default {
  name: "ConnectWalletPopup",
  components: {
    Icon,
  },
  data() {
    return {
      walletProviders: [
        {id: 1,
          name: "Metamask",
          icon: "Metamask.svg",
        },
        {id: 2,
          name: "Coinbase",
          icon: "coinbase.svg",
        },
        {id: 3,
          name: "OKX Wallet",
          icon: "okx.svg",
        },
        {id: 4,
          name: "Trust Wallet",
          icon: "trustwallet.svg",
        },
        {id: 5,
          name: "Wallet Connect",
          icon: "WalletConnect.svg",
        },
      ]
    };
  },
  computed: {
    ...mapState(["showWalletPopup"]),
  },
  methods: {
    ...mapMutations(["toggleConnectWalletPopup"]),
  },
  mounted() {
    this.toggleConnectWalletPopup(false)
  }
};
</script>

<style lang="scss" scoped>
.popup {
  background: rgba(7, 14, 12, 0.85);
  color: white;
  backdrop-filter: blur(20px);
  border: 2px solid #1bd19c;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 40px 30px;
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  .popup-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid grey;
    div {
      cursor: pointer;
    }
    h3 {
      color: #fff;
      text-align: center;
      margin-bottom: 15px;
    }
  }

  .popup-grid {
    display: grid;
    grid-template-columns: 0.4fr 0.6fr;
    grid-gap: 20px;
    .left-grid {
      display: flex;
      flex-direction: column;
      .wallets-title {
        color: gainsboro;
        margin-bottom: 10px;
      }
      .wallets {
        display: flex;
        flex-direction: column;
        gap: 15px;
        .wallet {
          display: flex;
          align-items: center;
          gap: 10px;
          img {
            width: 45px;
            height: 45px;
            object-fit: contain;
            background: gainsboro;
            border-radius: 8px;
            padding: 8px;
          }
        }
      }
    }
    .right-grid {
      display: flex;
      flex-direction: column;
      gap: 30px;
      // justify-content: center;
      align-items: center;
      .wallet-btns {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      div {
        .what-desc {
          font-size: 14px;
          color: gainsboro;
          font-weight: 400;
        }
      }
      h3 {
        margin-bottom: 20px;
      }
      .btn-green {
        background: #1bd19c;
        color: white;
        border-radius: 10px;
        padding: 12px;
        border: none;
        font-weight: 600;
        font-size: 16px;
      }
      .no-bg {
        background: none;
        color: #1bd19c;
        border: none;
      }
    }
  }
}
</style>
