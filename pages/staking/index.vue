<template>
  <div class="staking" :class="nightMode ? 'staking-night' : ''">
    <MultiSenderPopup
      v-if="modalPopup"
      @toggleMultiPopup="toggleMultiPopup"
      :showContent1="modalContent1"
      :showContent2="modalContent2"
      :showContent3="modalContent3"
    />
    <!-- Subscribe modal -->
    <div class="subscribe-modal" v-if="cards[tokenIndex]?.showSubscribeModal">
      <button class="close" @click="toggleSubscribeModal(tokenIndex)">X</button>
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
            <!-- <p class="card-value-white">0</p> -->
            <input
              type="text"
              class="card-value-white input-clear"
              placeholder="0"
              v-model="stakeAmount"
            />
            <p class="card-value-white">PLSX-WPLS LP</p>
          </div>
          <p class="token-value" v-if="stakeAmount">
            {{ (stakeAmount / 3).toFixed(2) }} USD
          </p>
        </div>
        <div class="no-tokens">
          <a href="#">No tokens to stake, get PLSX/WPLS LP</a>
        </div>
        <div class="flex-between">
          <p>Annual ROI at current rates</p>
          <p>$0.00</p>
        </div>
        <div class="btn-between btns-in">
          <button
            class="modal-btn btn-confirm"
            @click="toggleModal"
            :disabled="stakeAmount === 0 || stakeAmount === null"
          >
            Confirm
          </button>
          <button
            class="modal-btn btn-cancel"
            @click="toggleSubscribeModal(tokenIndex)"
          >
            Cancel
          </button>
        </div>
        <a href="#" class="get-link">Get PLSX-WPLS LP</a>
      </div>
      <div v-if="showInfo">
        <div v-if="cards[tokenIndex]?.infoText === '1'" class="flex-around grey-bg">
          <div>
            <p class="grey-title">APY</p>
            <p class="card-value-white">{{ cards[tokenIndex]?.apy }}</p>
          </div>
          <div>
            <p class="grey-title">Max Multiplier</p>
            <p class="card-value-white">
              {{ cards[tokenIndex]?.maxMultiplier }}
            </p>
          </div>
          <div>
            <p class="grey-title">Duration</p>
            <p class="card-value-white">{{ cards[tokenIndex]?.duration }}</p>
          </div>
        </div>

        <div v-if="cards[tokenIndex]?.infoText === '2'" class="flex-around grey-bg">
          <div>
            <p class="grey-title">Total Rewards</p>
            <p class="card-value-white">
              ${{ cards[tokenIndex]?.totalRewards }}
            </p>
          </div>
          <div>
            <p class="grey-title">Total Subscribed</p>
            <p class="card-value-white">
              ${{ cards[tokenIndex]?.totalSubscribed }}
            </p>
          </div>
        </div>
        <div class="flex-center">
          <div
            :class="cards[tokenIndex]?.infoText === '1' ? 'active-dot-btn' : ''"
            @click="toggleSubscribeInfoText1(cards, tokenIndex)"
            class="dot-btn"
          ></div>
          <div
            :class="cards[tokenIndex]?.infoText === '2' ? 'active-dot-btn' : ''"
            @click="toggleSubscribeInfoText2(cards, tokenIndex)"
            class="dot-btn"
          ></div>
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

    <!-- Main page -->
    <div class="row">
      <h1 :class="nightMode ? 'page-title-night' : ''" class="page-title">
        Reward Programs
      </h1>
      <!-- <div class="filterbar" :class="nightMode ? 'filterbar-night' : ''">
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
      </div> -->
      <div class="create-program">
        <button class="createBtn">Create Program</button>
      </div>

      <!-- Homepage cards -->

      <div class="cards">
        <div
          :class="nightMode ? 'card-night' : 'card-normal'"
          class="card"
          v-for="(card, index) in cards"
          :key="index"
        >
          <div
            class="card-status"
            :class="card.featured ? 'featured' : 'unverified'"
          >
            {{ card.featured ? "Featured" : "Unverified" }}
          </div>
          <div class="card-header">
            <div class="modal-header">
              <h3
                :class="nightMode ? 'token-name-night' : 'token-name-home'"
                class="token-nam"
              >
                {{ card?.heading }}
              </h3>
              <p
                :class="nightMode ? 'snippet-night' : 'snippet-home'"
                class="snipp"
              >
                {{ card.snippet }}
              </p>
            </div>
            <div class="optionIcon">
              <div class="optionBtn" @click="toggleShowOptions(index)">
                <Icon icon="iwwa:option-horizontal" color="white" :rotate="1" />
              </div>
              <div class="option-details" v-if="card.showOptions">
                <a class="normal-link" href="#"
                  ><Icon icon="solar:dollar-broken" :rotate="1" /> Reward
                  Pool</a
                >
                <a class="normal-link" href="#"
                  ><Icon icon="quill:link-out" :rotate="1" /> Program
                  Contract</a
                >
                <a class="normal-link" href="#"
                  ><Icon icon="ph:link" color="black" :rotate="1" /> Copy
                  Permalink</a
                >
              </div>
            </div>
          </div>
          <div>
            <div
              :class="nightMode ? 'grey-bg-night' : 'grey-bg-home'"
              v-if="infoText === '1'"
              class="flex-around"
            >
              <div>
                <p
                  :class="nightMode ? 'grey-title-night' : 'grey-title-home'"
                  class="grey-title"
                >
                  APY
                </p>
                <p
                  :class="nightMode ? 'card-value-night' : 'card-value-home'"
                  class="card-value-white"
                >
                  {{ card.apy }}
                </p>
              </div>
              <div>
                <p
                  :class="nightMode ? 'grey-title-night' : 'grey-title-home'"
                  class="grey-title"
                >
                  Max Multiplier
                </p>
                <p
                  :class="nightMode ? 'card-value-night' : 'card-value-home'"
                  class="card-value-white"
                >
                  {{ card?.maxMultiplier }}
                </p>
              </div>
              <div>
                <p
                  :class="nightMode ? 'grey-title-night' : 'grey-title-home'"
                  class="grey-title"
                >
                  Duration
                </p>
                <p
                  :class="nightMode ? 'card-value-night' : 'card-value-home'"
                  class="card-value-white"
                >
                  {{ card?.duration }}
                </p>
              </div>
            </div>

            <div
              :class="nightMode ? 'grey-bg-night' : 'grey-bg-home'"
              v-if="infoText === '2'"
              class="flex-around"
            >
              <div>
                <p
                  :class="nightMode ? 'grey-title-night' : 'grey-title-home'"
                  class="grey-title"
                >
                  Total Rewards
                </p>
                <p
                  :class="nightMode ? 'card-value-night' : 'card-value-home'"
                  class="card-value-white"
                >
                  ${{ card?.totalRewards }}
                </p>
              </div>
              <div>
                <p
                  :class="nightMode ? 'grey-title-night' : 'grey-title-home'"
                  class="grey-title"
                >
                  Total Subscribed
                </p>
                <p
                  :class="nightMode ? 'card-value-night' : 'card-value-home'"
                  class="card-value-white"
                >
                  ${{ card?.totalSubscribed }}
                </p>
              </div>
            </div>
            <div class="flex-center">
              <div
                :class="infoText === '1' ? 'active-dot-btn' : ''"
                @click="toggleInfoText1"
                class="dot-btn"
              ></div>
              <div
                :class="infoText === '2' ? 'active-dot-btn' : ''"
                @click="toggleInfoText2"
                class="dot-btn"
              ></div>
            </div>
          </div>
          <div @click="toggleSubscribeModal(index)" class="subscriberBtn">
            Subscribe
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Icon } from "@iconify/vue2";
import MultiSenderPopup from "~/components/multisender/MultiSenderPopup.vue";
export default {
  components: {
    Icon,
    MultiSenderPopup,
  },
  data() {
    return {
      stakeAmount: null,

      modalPopup: false,
      modalContent1: false,
      modalContent2: false,
      modalContent3: false,
      infoText: "1",

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
          showOptions: false,
          showSubscribeModal: false,
          featured: true,
          infoText: "1",

        },
        {
          heading: "PLSX V2",
          snippet: "Pulse Network | PLS-WETH LP",
          apy: 43.9,
          maxMultiplier: "2x over 60d",
          duration: "26d left",
          totalRewards: 1800,
          totalSubscribed: 24004,
          favourite: false,
          showOptions: false,
          showSubscribeModal: false,
          featured: false,
          infoText: "1",

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
      this.cards[index].showSubscribeModal =
        !this.cards[index].showSubscribeModal;
      //   console.log(this.cards[index].showSubscribeModal);
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
    toggleInfoText1() {
      this.infoText = "1";
    },
    toggleInfoText2() {
      this.infoText = "2";
    },
    toggleSubscribeInfoText1(item, index) {
      item[index].infoText = "1";
    },
    toggleSubscribeInfoText2(item, index) {
      item[index].infoText = "2";
    },
    toggleModal() {
      this.modalContent1 = false;
      this.modalContent2 = false;
      this.modalContent3 = true;
      this.modalPopup = !this.modalPopup;

      setTimeout(() => {
        this.modalContent3 = false;
        this.modalContent1 = true;
        setTimeout(() => {
          this.modalContent1 = false;
          this.modalContent2 = true;
        }, 3000);
      }, 3000);
    },
    toggleMultiPopup() {
      this.modalPopup = false;
      this.modalContent1 = false;
      this.modalContent2 = false;
      this.modalContent3 = false;
    },
    toggleShowOptions(index) {
      this.cards[index].showOptions = !this.cards[index].showOptions;
    },
    closeOptions(index) {
      this.cards[index].showOptions = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-status {
  position: absolute;
  top: -10px;
  left: 20px;
  background: #f2f2f2;
  color: #000000;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}
.featured {
  background: cyan;
}

.unverified {
  background: #ffd600;
}
button {
  cursor: pointer;
}

.flex-center {
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
}
.flex-gap {
  display: flex;
  gap: 12px;
  align-items: center;
}

.optionIcon {
  position: relative;
}

.optionBtn {
  cursor: pointer;
  background: rgb(170, 166, 166);
  padding: 4px 8px;
  border-radius: 8px;
}
.normal-link {
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-details {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: black;
  padding: 15px 10px;
  border-radius: 8px;
  width: 200px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dot-btn {
  cursor: pointer;
  margin-top: 8px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: white;
}

.active-dot-btn {
  width: 16px;
  height: 16px;
}

.input-clear {
  background: none;
  border: none;
  outline: none;
}

.token-value {
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;
  color: gainsboro;
  // margin-left: 8px;
}

.no-tokens {
  padding: 11px 0;
  a {
    color: red;
  }
}

.get-link {
  text-decoration: none;
  color: rgb(45, 199, 158);
  display: flex;
  justify-content: center;
  font-weight: 600;
}

.page-title {
  text-align: center;
  padding-top: 36px;
  line-height: 14px;
}

.page-title-night {
  background: #070e0c;
  color: white;
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

.grey-bg-night {
  background-color: rgb(12, 153, 115);
  color: white;
  padding: 20px;
  border-radius: 8px;
}

.grey-bg-home {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
}

.add-grey-bg {
  padding: 10px;
  background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
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
  // color: white;
  font-weight: 600;
}

.card-value-night {
  color: white;
}

.card-value-home {
  color: black;
}
.grey-title {
  // color: grey;
  font-weight: 400;
}

.grey-title-night {
  color: gainsboro;
}

.grey-title-home {
  color: grey;
}
.white-title {
  color: white;
  font-weight: 400;
}

.token-name {
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
}

.token-nam {
  font-size: 24px;
  font-weight: 600;
}

.token-name-night {
  color: white;
}

.token-name-home {
  color: black;
}
.snippet {
  font-size: 14px;
  font-weight: 400;
  color: gainsboro;
}

.snipp {
  font-size: 14px;
  font-weight: 400;
}

.snippet-night {
  color: gainsboro;
}

.snippet-home {
  color: grey;
}
.staking {
  display: relative;
  min-height: calc(100vh - 180px);
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

.card-night {
  background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
}
.staking-night {
  background: #070e0c;
  display: relative;
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

.card-normal {
  background: linear-gradient(
    95.34deg,
    rgba(9, 151, 110, 0.1) -21.44%,
    rgba(8, 79, 101, 0.1) 108.23%
  );
}

.cards {
  padding: 40px 0;
  display: flex;
  // justify-content: center;
  gap: 30px;
  .card {
    width: 340px;
    padding: 20px;
    color: black;
    position: relative;

    border-radius: 8px;
    margin-bottom: 40px;
    @media only screen and (max-width: 420px) {
      padding: 20px;
    }

    .subscriberBtn {
      margin-top: 10px;
      width: 100%;
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
    }
  }
}
</style>
