<template>
  <div class="tokenLocker" :class="nightMode ? 'tokenLocker-night' : ''">
    <div class="row">
      <div class="filterbar" :class="nightMode ? 'filterbar-night' : ''">
        <div v-if="createLock"></div>
        <div class="searchbar" v-else>
          <input
            type="text"
            class="searchInput"
            placeholder="Pair name or address"
          />
          <img
            src="@/assets/searchIcon-night.png"
            class="searchIcon"
            alt=""
            v-if="nightMode"
          />
          <img src="@/assets/searchIcon.png" class="searchIcon" alt="" v-else />
        </div>
        <div class="createLock">
          <p
            :class="createLock ? 'active-lock' : ''"
            @click="createLock = true"
          >
            createLock
          </p>
          <p
            :class="createLock ? '' : 'active-lock'"
            @click="createLock = false"
          >
            Your lock
          </p>
        </div>
      </div>
      <div
        class="lockWrapper"
        v-if="createLock"
        :class="nightMode ? 'lockWrapper-night' : ''"
      >
        <h3 class="message">
          Gain investors’ trust by locking your project’s liquidity. This
          section is only for project deployer.
        </h3>
        <div class="searchbox">
          <input
            type="text"
            class="searchInput"
            placeholder="Enter token contract address"
          />
          <img src="@/assets/searchIcon-night.png" class="searchIcon" alt="" />
        </div>
      </div>
      <ul class="cards" v-else>
        <li
          class="card-col"
          v-for="(card, index) in cards"
          :key="index"
          :class="nightMode ? 'card-night' : ''"
        >
          <div @click="toggleExpanded(card)" class="card">
            <div class="card-heading">
              <img
                :src="require(`@/assets/${card.icon}`)"
                alt=""
                class="icon"
              />
              <h3 class="title">{{ card.title }}</h3>
            </div>
            <div class="col">
              <h3 class="title">APR</h3>
              <p class="value">{{ card.apr }}%</p>
            </div>
            <div class="col">
              <h3 class="title">Locked for</h3>
              <p class="value">{{ card.nextIn }}</p>
            </div>
            <div class="col">
              <h3 class="title">amount</h3>
              <p class="value">{{ card.amount }}</p>
            </div>
            <div class="lockBtn">
              <img src="@/assets/lockIcon.png" alt="" class="lockIcon" />
              Lock
            </div>
          </div>
          <div class="expanded" v-if="isExpanded(card)">
            <h3>Pair</h3>
            <div class="item-flex-between">
              <p>Links</p>
              <a :href="card.links"
                ><img
                  :src="require(`@/assets/${card?.icon}`)"
                  alt=""
                  class="icon1"
              /></a>
            </div>
            <div class="item-flex-between">
              <p>Contract</p>
              <p>{{ card.contract }}</p>
            </div>
            <div class="item-flex-between">
              <p>TERA</p>
              <a :href="card.links"
                ><div class="icons">
                  <img
                    :src="require(`@/assets/${card?.icon}`)"
                    alt=""
                    class="icon1"
                  />
                  </div
              ></a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      expandedTab: null,
      createLock: false,
      showSortPopup: false,
      cards: [
        {
          icon: "eth-icon.png",
          title: "ETH",
          apr: 99.9,
          nextIn: "6 Months, 3 Days",
          amount: 38.72,
          links: "etherscan.com",
          contract: "0xdre573gghd737dbbd9728",
        },
        {
          icon: "eth-icon.png",
          title: "ETH",
          apr: 99.9,
          nextIn: "2 Months, 25 Days",
          amount: 38.72,
          links: "etherscan.com",
          contract: "0xdre573gghd737dbbd9728",
        },
        {
          icon: "eth-icon.png",
          title: "ETH",
          apr: 99.9,
          nextIn: "3 Months, 10 Days",
          amount: 38.72,
          links: "etherscan.com",
          contract: "0xdre573gghd737dbbd9728",
        },
        {
          icon: "eth-icon.png",
          title: "ETH",
          apr: 99.9,
          nextIn: "6 Months, 0 Days",
          amount: 38.72,
          links: "etherscan.com",
          contract: "0xdre573gghd737dbbd9728",
        },
        {
          icon: "eth-icon.png",
          title: "ETH",
          apr: 99.9,
          nextIn: "12 Months, 11 Days",
          amount: 38.72,
          links: "etherscan.com",
          contract: "0xdre573gghd737dbbd9728",
        },
      ],
    };
  },
  methods: {
    toggleExpanded(item) {
      this.expandedTab = this.expandedTab === item ? null : item;
    },
    isExpanded(item) {
      return this.expandedTab === item;
    },
  },
  computed: {
    ...mapState(["nightMode"]),
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.tokenLocker {
  padding: 70px 0;
}
.tokenLocker-night {
  background: #070e0c;
  backdrop-filter: blur(20px);
}

.filterbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
  .searchbar {
    position: relative;
    width: 483px;
    height: 42px;
    border: 1px solid #cbcbcb;
    border-radius: 60px;
    @media only screen and (max-width: 980px) {
      width: 283px;
      height: 32px;
      margin-right: 15px;
    }
    @media only screen and (max-width: 600px) {
      width: 80%;
      min-width: 330px;
      margin-right: 0;
      margin-bottom: 20px;
    }
    .searchInput {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-style: italic;
      font-weight: 500;
      font-size: 18px;
      color: #646464;
      padding: 0 30px;
      padding-right: 60px;
      @media only screen and (max-width: 980px) {
        font-size: 14px;
        padding: 0 15px;
      }
      &:focus {
        border: 1px solid #1bd19c;
        border-radius: 60px;
      }
    }
    .searchIcon {
      position: absolute;
      right: 30px;
      top: 11.5px;
      width: 19px;
      @media only screen and (max-width: 980px) {
        right: 15px;
        width: 15px;
        top: 8px;
        right: 10px;
      }
    }
  }
  .createLock {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #095c67;
    overflow: hidden;
    justify-self: flex-end;
    p {
      min-width: 115px;
      text-align: center;
      padding: 14px 10px;
      text-transform: capitalize;
      font-weight: 600;
      font-size: 16px;
      color: #000000;
      background: transparent;
      @media only screen and (max-width: 980px) {
        padding: 5px 10px;
        font-size: 14px;
      }
      &:hover {
        cursor: pointer;
        background: linear-gradient(180deg, #095866 0%, #09856c 100%);
        color: #fff;
      }
    }
    .active-lock {
      background: linear-gradient(180deg, #095866 0%, #09856c 100%);
      color: #fff;
    }
  }
}
.filterbar-night {
  .createLock {
    p {
      color: #ffffff;
    }
  }
}
.lockWrapper {
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 0;
  text-align: center;
  .searchbox {
    position: relative;
    width: 655px;
    height: 119px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #063841 0%, #054d3e 100%);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    margin-top: 40px;
    @media only screen and (max-width: 680px) {
      width: 540px;
      height: 119px;
    }
    @media only screen and (max-width: 580px) {
      width: 340px;
      height: 80px;
    }

    .searchInput {
      width: 483px;
      height: 42px;
      outline: none;
      border: 1px solid #cbcbcb;
      border-radius: 60px;
      background: transparent;
      font-style: italic;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      padding: 0 30px;
      padding-right: 60px;
      @media only screen and (max-width: 680px) {
        width: 350px;
        border-radius: 30px;
        height: 60px;
        padding: 0 20px;
        padding-right: 40px;
      }
      @media only screen and (max-width: 580px) {
        width: 280px;
        height: 40px;
        font-size: 16px;
      }

      &:focus {
        border: 1px solid #1bd19c;
        border-radius: 60px;
      }
    }
    .searchIcon {
      position: absolute;
      right: 100px;
      width: 19px;
      @media only screen and (max-width: 680px) {
        right: 120px;
      }
      @media only screen and (max-width: 580px) {
        right: 40px;
      }
    }
  }
}
.lockWrapper-night {
  color: #fff;
}
.cards {
  padding: 40px 0;
  .card {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px 8px 0px 0px;
    padding: 42px 38px;
    background: linear-gradient(
      95.34deg,
      rgba(9, 151, 110, 0.1) -21.44%,
      rgba(8, 79, 101, 0.1) 108.23%
    );
    &:hover{
      cursor: pointer;
    }
    
    @media only screen and (max-width: 980px) {
      flex-direction: column;
      align-items: flex-start;
    }
    & > * {
      margin-bottom: 10px;
    }
    .card-heading {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 18px;
        height: 40px;
        width: 40px;
        padding: 8px;
        border-radius: 50%;
        background-color: #172852;
        transform: translateX(8px);
      }
      .title {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        color: #070e0c;
      }
    }
    .col {
      @media only screen and (max-width: 980px) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .title {
        font-weight: 500;
        font-size: 20px;
        color: #505050;
        margin-bottom: 10px;
        text-transform: capitalize;
      }
      .value {
        font-weight: 500;
        font-size: 20px;
        color: #010d09;
      }
      .liquidityVal {
        font-weight: 700;
        color: #09976e;
      }
    }
    .lockBtn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      width: 134px;
      height: 46px;
      background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
      border-radius: 8px;
      transition: all 0.25s;
      cursor: pointer;
      &:active,
      &:hover {
        background: #09976e;
      }
      img {
        width: 16px;
        margin-right: 15px;
      }
      .sortPopup {
      }
    }
  }
  .card-night {
    background: linear-gradient(
      95.34deg,
      rgba(9, 151, 110, 0.1) -21.44%,
      rgba(8, 79, 101, 0.1) 108.23%
    );
    .card-heading {
      .title {
        color: #e0e0e0;
      }
    }
    .col {
      .title {
        color: #a5a5a5;
      }
      .value {
        color: #ffffff;
      }
      .liquidityVal {
        font-weight: 700;
        color: #09976e;
      }
    }
  }
}
.card-col {
    margin-bottom: 40px;
    
}

.expanded {
    background: whitesmoke;
    padding: 20px 40px;
        border-radius: 0px 0px 8px 8px;
    background: linear-gradient(
      95.34deg,
      rgba(9, 151, 110, 0.1) -21.44%,
      rgba(8, 79, 101, 0.1) 108.23%
    );

}
li {
    list-style: none;
}

.item-flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid gainsboro;
    height: 50px;
    padding: 10px 0;

    a img {
          height: 30px;
          width: 30px;
          padding: 8px;
          border-radius: 50%;
        }
    .icon1 {
          background-color: #172852;
          transform: translateX(0px);
          height: 30px;
          width: 30px;
          padding: 8px;
          border-radius: 50%;
        }
    
        .icons {
        margin-right: 0px;
        img {
          height: 30px;
          width: 30px;
          padding: 8px;
          border-radius: 50%;
        }
      }
    }
</style>
