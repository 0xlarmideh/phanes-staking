<template>
  <div :class="nightMode ? 'top-container-night' : ''" class="top-container">
    <div class="liquidity-container">
      <div class="liquidity-header flex-between">
        <div class="back-btn" @click="goBack"><Icon icon="ep:back" width="36" /></div>
        <NuxtLink class="lockBtn" to="/tokenlocker/lock-token">
          <img src="@/assets/lockIcon.png" alt="" class="lockIcon" />
          Lock Token
        </NuxtLink>
      </div>
      <div class="uniswap-pair">
        <p>PulseX V1 pair:</p>
        <div>0x678af34673663783</div>
      </div>
      <a href="gopulse.com" class="pair-owner">Pair owner: 0x0D73****4e2</a>
      <p class="locked-heading">Locked Token</p>
      <h3 class="locked-percentage">85.0{{"%"}}</h3>
      <div class="locked-liquidity">
        <div class="lock-token-icon"><img src="@/assets/PLS.png" alt="left token" /></div>
        <div class="divider"></div>
        <div class="lock-percentage"><Icon icon="material-symbols:lock" width="66px" /></div>
        <div class="divider"></div>
        <div class="lock-token-icon"><img src="@/assets/logoPHNS.png" alt="left token" /></div>
      </div>
      <div class="token-names flex-between">
        <P>PLS</P>
        <P>PHNS</P>
      </div>
      <div class="flex-between">
        <div class="flex-green"><Icon icon="material-symbols:lock-outline" width="18" /><img src="@/assets/PLS.png" alt="locked token" width="18px" />1.2k</div>
        <div class="flex-green">79.49B<img src="@/assets/logoPHNS.png" width="18px" alt="locked token" /><Icon icon="material-symbols:lock-outline" width="18" /></div>
      </div>
      <div class="flex-between">
        <div class="flex-align-center"><Icon icon="fluent:drop-12-regular" width="18" /><img src="@/assets/PLS.png" alt="locked token" width="18px" />1.5k (0%)</div>
        <div class="flex-align-center">(1.2%) 99.49B<img src="@/assets/logoPHNS.png" width="18px" alt="locked token" /><Icon icon="fluent:drop-12-regular" width="18" /></div>
      </div>
      <div class="chart-views">
        <a href="gopulse.com"><div>Explorer</div><Icon icon="iconoir:arrow-br" :rotate="3" /></a>
        <a href="gopulse.com"><div>PulseX</div><Icon icon="iconoir:arrow-br" :rotate="3" /></a>
        <a href="gopulse.com"><div>Chart</div><Icon icon="iconoir:arrow-br" :rotate="3" /></a>
      </div>
      <div class="flex-between">
        <p>Total LP tokens</p>
        <p>457.67272</p>
      </div>
      <div class="flex-between">
        <p>Total Locked LP</p>
        <p>345.637</p>
      </div>

      <div class="liquidity-locks">
        <h3>Token Locks</h3>
      <p>
        Note: Only token pool tokens are locked, not the actual USD value. The USD value changes as people trade and more liquidity token are minted as more the pool increases.
      </p></div>
      <div class="unlock-section">
        <div class="flex-between unlock-date">
          <p>Value</p>
          <p>Unlock date</p>
        </div>
        <div class="flex-between unlock-token-value-container">
          <p class="unlock-token-value">$0</p>
          <p class="unlock-token-year">in 2 years</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import {mapState} from 'vuex';
export default {
  components: {
    Icon,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState(["nightMode"]),
  },
};
</script>

<style lang="scss" scoped>

.flex-align-center, .flex-green {
  display: flex;
  align-items: center;
  
  gap: 3px;
}

.flex-green {
  color: rgb(47, 255, 134);
}

.pair-owner {
  color: gainsboro;
  display: flex;
  justify-content: center;

}
.token-names {
  font-weight: 500;
  font-size: 22px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div.top-container, div.top-container-night {
  padding: 40px 0;
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
}

div.top-container-night {
  background: #070e0c;
}

.liquidity-container {
  max-width: 700px;
  background: #08241F;
  border-radius: 20px;
  margin: 0 10px;
  margin-top: 30px;
  color: white;
  padding: 30px;

  .liquidity-header {
    font-size: 18px;
    margin: 0;
    .back-btn {
      cursor: pointer;
    }
    .lockBtn {
      display: flex;
      margin-bottom: 15px;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      padding: 0 20px;
      height: 46px;
      background: linear-gradient(95.34deg, #a6146c -21.44%, #084f65 108.23%);
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
    }
  }
  .locked-liquidity {
    display: flex;
    align-items: center;
    .lock-token-icon {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      border-radius: 100%;
      border: 3px solid white;
      overflow: hidden;
      padding: 10px 20px;
    }
    .divider {
      width: calc(50% - 100px);
      // background: gainsboro;
      height: 2px;
      border-bottom: 2px dashed white;
    }
    .lock-percentage {
      width: 90px;
      height: 90px;
      // background: gainsboro;
      border-radius: 100%;
      border: 3px solid white;
      display: flex;
  justify-content: center;
  align-items: center;
    }
  }
  .chart-views {
    display: flex;
    justify-content: center;
    padding: 8px;
    margin: 18px 0;
    gap: 40px;
    border: 1px solid gainsboro;
    border-left: none;
    border-right: none;

    a {
      display: flex;
      text-decoration: none;
      color: gainsboro;
      align-items: center;
    }
  }

  .liquidity-locks {
    margin: 36px 0 
  }
}
.unlock-date {
      font-style: italic;
      color: gainsboro;
    }
.liquidity-locks h3 {
    font-weight: 500;
    font-size: 30px;
    
  }

.liquidity-locks p {
  color: gainsboro;
}

.uniswap-pair {
  margin: 10px 0;
  color: gainsboro;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.locked-heading {
  text-align: center;
  color: gainsboro;
  margin: 10px 0;
}
.locked-percentage {
  
  text-align: center;
  font-size: 36px;
  margin: 10px 0;
  font-weight: 500;
}

.unlock-token-value-container {
  margin-top: 10px;
  font-weight: 600;
  font-size: 21px;

  .unlock-token-value {
    color: rgb(47, 255, 134);
  }
  .unlock-token-date {
    color: white;
  }
}

</style>
