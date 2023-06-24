<template>
  <div class="top-container">
    <div class="liquidity-container">
      <div class="liquidity-header flex-between">
        <div>x</div>
        <NuxtLink class="lockBtn" to="/liquiditylocker/view-lock">
          <img src="@/assets/lockIcon.png" alt="" class="lockIcon" />
          Lock Liquidity
        </NuxtLink>
      </div>
      <div class="uniswap-pair">
        <p>Uniswap V2 pair:</p>
        <div>0xcaf34673663783</div>
      </div>
      <p class="locked-heading">Locked Liquidity</p>
      <h3 class="locked-percentage">85.0{{"%"}}</h3>
      <div class="locked-liquidity">
        <div class="lock-token-icon"></div>
        <div class="divider"></div>
        <div class="lock-percentage"></div>
        <div class="divider"></div>
        <div class="lock-token-icon"></div>
      </div>
      <div class="flex-between">
        <P>WETH</P>
        <P>FLOKI</P>
      </div>
      <div class="flex-between">
        <div>1.2k</div>
        <div>79.49B</div>
      </div>
      <div class="flex-between">
        <div>1.5k</div>
        <div>99.49B</div>
      </div>
      <div class="chart-views">
        <div>Etherscan</div>
        <div>Uniswap</div>
        <div>Dext</div>
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
        <h3>Liquidity Locks</h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
        praesentium ex culpa non quod ipsum blanditiis voluptatem? Atque,
        suscipit deleniti.
      </p></div>
      <div class="unlock-section">
        <div class="flex-between unlock-date">
          <p>Value</p>
          <p>Unlock date</p>
        </div>
        <div class="flex-between unlock-token-value">
          <p>$0</p>
          <p>in 2 years</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div.top-container {
  margin: 40px 0;
}

.liquidity-container {
  max-width: 700px;
  background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 30px;
  min-height: 75vh;
  color: white;
  padding: 30px;

  .liquidity-header {
    font-size: 18px;
    margin: 0;
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
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: #fff;
    }
    .divider {
      width: calc(50% - 50px);
      background: gainsboro;
      height: 1px;
    }
    .lock-percentage {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: #fff;
    }
  }
  .chart-views {
    display: flex;
    justify-content: center;
    padding: 8px;
    margin: 18px 0;
    gap: 30px;
    border: 1px solid gainsboro;
    border-left: none;
    border-right: none;
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
  font-size: 40px;
  margin: 10px 0;
  font-weight: 500;
}
</style>
