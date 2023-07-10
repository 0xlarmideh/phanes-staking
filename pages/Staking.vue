<template>
  <div class="staking" :class="nightMode ? 'staking-night' : ''">
    <div class="subscribe-modal" v-if="showSubscribeModal">
      <button class="close" @click="toggleSubscribeModal">X</button>
      <div class="modal-header">
        <h3 class="token-name">{{ cards[tokenIndex]?.heading }}</h3>
        <p class="snippet">{{ cards[tokenIndex]?.snippet }}</p>
      </div>
      <div class="btn-between">
        <button
          class="modal-btn"
          :class="showSubscribeDetails ? 'modal-btn-blue' : ''"
          @click="toggleShowSubscribeDetails"
        >
          Subscribe
        </button>
        <button
          class="modal-btn"
          :class="showInfo ? 'modal-btn-blue' : ''"
          @click="toggleShowInfo"
        >
          Information
        </button>
      </div>
      <div v-if="showSubscribeDetails">
        <!-- <h3>Connect your wallet</h3> -->
        <h3>Stake LP token</h3>
        <div class="grey-bg">
          <div class="flex-between">
            <p class="card-value-white">Stake</p>
            <p class="card-value-white">Balance</p>
          </div>
          <div class="add-grey-bg flex-between">
            <p class="card-value-white">0</p>
            <p class="card-value-white">PLSX-WPLS LP</p>
          </div>
        </div>
        <div class="no-tokens"><a href="#">No tokens to stake, get PLSX/WPLS LP</a></div>
        <div class="flex-between">
          <p>Annual ROI at current rates</p>
          <p>$0.00</p>
        </div>
        <div class="btn-between btns-in">
          <button
            class="modal-btn btn-confirm"
          >
            Confirm
          </button>
          <button
            class="modal-btn btn-cancel"
            @click="toggleSubscribeModal"
          >
            Cancel
          </button>
        </div>
        <a href="#" class="get-link">Get PLSX-WPLS LP</a>
      </div>
      <div v-if="showInfo" class="flex-around grey-bg">
        <div>
          <p class="grey-title">APY</p>
          <p class="card-value-white">{{ cards[tokenIndex]?.apy }}</p>
        </div>
        <div>
          <p class="grey-title">Max Multiplier</p>
          <p class="card-value-white">{{ cards[tokenIndex]?.maxMultiplier }}</p>
        </div>
        <div>
          <p class="grey-title">Duration</p>
          <p class="card-value-white">{{ cards[tokenIndex]?.duration }}</p>
        </div>
      </div>
      <div v-if="showInfo" class="grey-bg subscribe-details">
        <div>
          <p class="card-value-white">Description</p>
          <p class="grey-title">
            This requires PLS token in order to earn XXX. The max multiplier is
            10x which can be achieved over 60 days.
          </p>
        </div>
        <div>
          <p class="card-value-white">Maintainer</p>
          <p class="white-title">{{ cards[tokenIndex]?.snippet }}</p>
        </div>
        <div>
          <p class="card-value-white">Staking token</p>
          <p class="grey-title-box">PLS/PHNS</p>
        </div>
        <div>
          <p class="card-value-white">Contract address</p>
          <p class="white-title">0x93c...6bc</p>
        </div>
        <div>
          <p class="card-value-white">Pool address</p>
          <p class="white-title">0xc73..B79</p>
        </div>
        <div>
          <p class="card-value-white">Reward tokens</p>
          <div class="flex-gap">
            <p class="grey-title-box">PLS</p>
            <p class="grey-title-box">PHNS</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h1 class="page-title">Reward Programs</h1>
      <div class="filterbar" :class="nightMode ? 'filterbar-night' : ''">
        <div class="leftFilter" @click="toggleStakingPopup(true)">
          <img
            :src="require(`@/assets/${selectedStakingCurrency.icon}`)"
            alt=""
            class="icon"
          />
          <p class="title">{{ selectedStakingCurrency.title }}</p>
          <img src="@/assets/dropdownIcon.png" alt="" class="dropdownIcon" />
        </div>
        <div class="sortWrapper">
          <div class="sortButton" @click="showSortPopup = !showSortPopup">
            Sort By <img src="@/assets/sort-night.png" alt="" />
          </div>
          <ul class="sortPopup" :class="showSortPopup ? '' : 'hideSortPopup'">
            <li class="sortItem">APR</li>
            <li class="sortItem">Next In</li>
            <li class="sortItem">Amount</li>
          </ul>
        </div>
      </div>

      <div class="cards">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-header">
            <div class="title-wrapper">
              <h3 class="title">{{ card.heading }}</h3>
              <p class="snippet">{{ card.snippet }}</p>
            </div>
            <div class="favoriteIcon" @click="card.favourite = !card.favourite">
              <img
                src="@/assets/favourite-red.png"
                alt=""
                class="icon"
                v-if="card.favourite"
              />
              <img src="@/assets/favourite.png" alt="" class="icon" v-else />
            </div>
          </div>
          <div class="column-wrapper">
            <div class="col">
              <h4 class="title">APY</h4>
              <p class="value">{{ card.apy }}%</p>
            </div>
            <div class="col">
              <h4 class="title">Max Multiplier</h4>
              <p class="value">{{ card.maxMultiplier }}</p>
            </div>
            <div class="col">
              <h4 class="title">Duration</h4>
              <p class="value">{{ card.duration }}</p>
            </div>
            <div class="col">
              <h4 class="title">Total Rewards</h4>
              <p class="value">${{ card.totalRewards }}</p>
            </div>
            <div class="col">
              <h4 class="title">Total Subscribed</h4>
              <p class="value">${{ card.totalSubscribed }}</p>
            </div>
            <div class="subscriberBtn" @click="toggleSubscribeModal(index)">
              subscribe
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      showSubscribeModal: false,
      showInfo: false,
      showSubscribeDetails: false,
      tokenIndex: null,
      showSortPopup: false,
      favourite: false,
      cards: [
        {
          heading: "Matter V1",
          snippet: "Material Network | MTRL-WETH LP",
          apy: 43.9,
          maxMultiplier: "2x over 30d",
          duration: "14d left",
          totalRewards: 3154,
          totalSubscribed: 11808,
          favourite: false,
        },
        {
          heading: "Matter V1",
          snippet: "Material Network | MTRL-WETH LP",
          apy: 43.9,
          maxMultiplier: "2x over 30d",
          duration: "14d left",
          totalRewards: 3154,
          totalSubscribed: 11808,
          favourite: false,
        },
        {
          heading: "Matter V1",
          snippet: "Material Network | MTRL-WETH LP",
          apy: 43.9,
          maxMultiplier: "2x over 30d",
          duration: "14d left",
          totalRewards: 3154,
          totalSubscribed: 11808,
          favourite: false,
        },
        {
          heading: "Matter V1",
          snippet: "Material Network | MTRL-WETH LP",
          apy: 43.9,
          maxMultiplier: "2x over 30d",
          duration: "14d left",
          totalRewards: 3154,
          totalSubscribed: 11808,
          favourite: false,
        },
      ],
    };
  },
  computed: {
    ...mapState(["nightMode", "selectedStakingCurrency"]),
  },
  methods: {
    ...mapMutations(["toggleStakingPopup"]),
    toggleSubscribeModal(index) {
      this.showSubscribeModal = !this.showSubscribeModal;
      this.showInfo = true;
      this.showSubscribeDetails = false;
      this.tokenIndex = index;
    },
    toggleShowInfo() {
      this.showInfo = true;
      this.showSubscribeDetails = false;
    },
    toggleShowSubscribeDetails() {
      this.showSubscribeDetails = true;
      this.showInfo = false;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}

.no-tokens {
    padding: 11px 0;
    a {
    color: red;

    }
}

.get-link {
    text-decoration: none;
    color:rgb(45, 199, 158);
    display: flex;
    justify-content: center;
    font-weight: 600;
}

.page-title {
  text-align: center;
  margin-top: 36px;
  line-height: 14px;
}
.flex-around {
  display: flex;
  justify-content: space-around;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.grey-bg {
  background-color: rgb(12, 153, 115);
  padding: 20px;
  border-radius: 8px;
}

.grey-title-box {
  background: rgb(80, 162, 140);
  padding: 6px 24px;
  display: inline-block;
  border-radius: 8px;
}

.card-value-white,
.grey-title,
.white-title {
  font-size: 14px;
  // line-height: 18px;
}

.card-value-white {
  color: white;
  font-weight: 600;
}
.grey-title {
  color: gainsboro;
  font-weight: 400;
}
.white-title {
  color: white;
  font-weight: 400;
}
.staking {
  display: relative;
}
.subscribe-modal {
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: fixed;
  top: 0;
  left: 50%;
  //   height: 600px;
  width: 420px;
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
  color: white;
  border-radius: 8px;
  z-index: 200;
  transform: translateX(-50%);
  .modal-header {
    .token-name {
      font-size: 24px;
      font-weight: 600;
      line-height: 28px;
    }
    .snippet {
      font-size: 14px;
      font-weight: 400;
      color: gainsboro;
    }
  }

  .close {
    background: #1bd19c;
    color: #ffff;
    border-radius: 50%;
    outline: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
  }
  .btn-between {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 3px;
    border-radius: 8px;
    border: 2px solid white;

    .modal-btn {
      padding: 9px 0;
      border: none;
      color: white;

      border-radius: 8px;
      background: transparent;
      font-weight: 600;
    }
    .modal-btn-blue {
      background: cyan;
      color: grey;
    }
  }
  .btns-in {
    border: none; 
    
    .btn-confirm {
        border: 2px solid rgb(45, 199, 158);
        background: none;
        font-size: 15px;

    }

    .btn-cancel {
        background: rgb(80, 162, 140);
        font-size: 15px;

    }
}
  .subscribe-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
.staking-night {
  background: #070e0c;
  backdrop-filter: blur(20px);
  .cards {
    .card {
      .card-header {
        .title-wrapper {
          .title {
            color: #fff;
          }
          .snippet {
            color: #cacaca;
          }
        }
      }
      .column-wrapper {
        .col {
          .title {
            color: #a5a5a5;
          }
          .value {
            color: #fff;
          }
        }
      }
    }
  }
}
.filterbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;

  .leftFilter {
    width: 200px;
    height: 53px;
    border: 1px solid #070e0c;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 980px) {
      height: min-content;
      padding: 5px 15px;
      width: 150px;
    }
    cursor: pointer;
    .icon {
      height: 25px;
      margin-right: 15px;
      @media only screen and (max-width: 980px) {
        height: 20px;
        margin-right: 10px;
      }
    }
    .title {
      font-weight: 600;
      font-size: 18px;
      line-height: 16px;
      color: #070e0c;
      margin-right: 5px;
      text-transform: uppercase;
      @media only screen and (max-width: 980px) {
        font-weight: 500;
        font-size: 14px;
      }
    }
    .dropdownIcon {
      width: 7px;
    }
  }
  .sortWrapper {
    position: relative;
    .sortPopup {
      opacity: 1;
      width: 100%;
      position: absolute;
      top: 50px;
      z-index: 999;
      background-color: #fff;
      list-style: none;
      padding: 25px 0px;
      border-radius: 20px;
      color: #09976e;
      border: 1px solid #09976e;
      transition: all 0.2s;
      .sortItem {
        padding: 0 30px;
        font-weight: 600;
        &:hover {
          cursor: pointer;
          background: rgb(134, 134, 134);
          color: #1bd19c;
        }
      }
    }
    .hideSortPopup {
      opacity: 0;
      z-index: -2;
    }
  }
  .sortWrapper-night {
    .sortPopup {
      background: #2a302e;
    }
    .sortButton {
      border: 1px solid #c5c5c5;
      color: #c5c5c5;
    }
  }
  .sortButton {
    width: 166px;
    height: 42px;
    border: 1px solid #070e0c;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
    color: #070e0c;
    cursor: pointer;
    @media only screen and (max-width: 980px) {
      width: 120px;
      height: 30px;
      font-size: 14px;
    }
    img {
      width: 26px;
      margin-left: 17px;
      @media only screen and (max-width: 980px) {
        width: 16px;
        margin-left: 10px;
      }
    }
  }
}
.filterbar-night {
  .leftFilter {
    border: 1px solid #c5c5c5;
    .title {
      color: #c5c5c5;
    }
  }
  .sortWrapper {
    .sortPopup {
      background: #2a302e;
    }
    .sortButton {
      border: 1px solid #c5c5c5;
      color: #c5c5c5;
    }
  }
}

.cards {
  padding: 40px 0;
  .card {
    width: 100%;
    padding: 36px;
    background: linear-gradient(
      95.34deg,
      rgba(9, 151, 110, 0.1) -21.44%,
      rgba(8, 79, 101, 0.1) 108.23%
    );
    border-radius: 8px;
    margin-bottom: 40px;
    @media only screen and (max-width: 420px) {
      padding: 20px;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-wrapper {
        @media only screen and (max-width: 420px) {
          width: 60%;
        }
        .title {
          font-weight: 700;
          font-size: 20px;
          color: #070e0c;
          margin-bottom: 8px;
        }
        .snippet {
          font-weight: 500;
          font-size: 16px;
          color: #505050;
          margin-bottom: 35px;
        }
      }
      .favoriteIcon {
        cursor: pointer;
        .icon {
          width: 25px;
        }
      }
    }
    .column-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media only screen and (max-width: 980px) {
        flex-direction: column;
      }
      .col {
        @media only screen and (max-width: 980px) {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .title {
          font-weight: 500;
          font-size: 20px;
          color: #505050;
          margin-bottom: 10px;
          @media only screen and (max-width: 980px) {
            flex-direction: column;
            margin-bottom: 0px;
          }
        }
        .value {
          font-weight: 500;
          font-size: 20px;
          color: #070e0c;
        }
      }

      .subscriberBtn {
        width: 159px;
        height: 44px;
        background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
        cursor: pointer;
        text-transform: capitalize;
        @media only screen and (max-width: 980px) {
          margin-top: 20px;
        }
        &:hover {
          background: #09976e;
        }
      }
    }
  }
}
</style>
