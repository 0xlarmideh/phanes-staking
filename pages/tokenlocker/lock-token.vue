<template>
  <div :class="nightMode ? 'top-container-night' : ''" class="top-container">
    <div class="liquidity-container">
      <div class="liquidity-header">
        <div class="back-btn" @click="goBack">
          <Icon icon="ep:back" width="36" />
        </div>
      </div>
      <h3 class="lock-title">Lock Liquidity</h3>
      <div class="token-pair">
        <img width="21px" src="@/assets/PLS.png" alt="left token" />
        <p>PLS</p>
      </div>

      <div class="lock-tokens-amount">
        <p class="section-title">Lock how many LP tokens?</p>
        <div class="lock-tokens-box">
          <p class="small-text">Balance 0</p>
          <div class="flex-between">
            <p>0</p>
            <div class="flex-gap"><button class="normal-btn">PLS</button> <button class="green-btn">MAX</button></div>
          </div>
          <div class="flex-gap btn-gap">
            <button class="btn-percentage">25%</button>
            <button class="btn-percentage">50%</button>
            <button class="btn-percentage">75%</button>
            <button class="btn-percentage">100%</button>
          </div>
        </div>
      </div>

      <div class="lock-tokens-date">
        <p class="section-title">Unlock Date</p>
        <div class="lock-tokens-box">
          <div class="flex-between">
            <div class="flex-col">
              <strong class="bold-text">Fri 23 Nov, 2023 12:52</strong>
              <p class="no-padding">in 5 months</p>
            </div>
            <div>
              <Icon icon="ep:calendar" width="24" />
            </div>
          </div>
        </div>
      </div>
      <p class="section-title">Who can withdraw the tokens?</p>
      <div class="flex-gap">
        <button class="green-btn">Me</button>
        <button class="normal-btn" >Someone else</button>
      </div>
      <p class="section-title">Fee (excluding gas fee)</p>
      <div class="token-balance">
        <button class="big-btn">14 PLS</button>
        <p class="small-text">Your balance is 334 PLS</p>
      </div>
      

      <p class="warning-text">Once tokens are locked they cannot be withdrawn under any circumstances untile the timer has expired. Please ensure the parameters are correct as they are final.</p>
      <div class="btns-grid">
        <button>Approve</button>
        <button>Lock</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import { mapState } from "vuex";
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
div.top-container {
  padding: 40px 0;
  min-height: calc(100vh - 180px);
}

div.top-container-night {
  background: #070e0c;
  min-height: calc(100vh - 180px);
}

.liquidity-container {
  max-width: 700px;
  background: #08241F;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 30px;
  color: white;
  padding: 30px;
  text-align: center;

  .liquidity-header {
    font-size: 18px;
    margin: 0;

    .back-btn {
      cursor: pointer;
      text-align: left;
    }
  }

  .lock-title {
    font-size: 36px;
    font-weight: 700;
    color: gainsboro;
    margin-bottom: 18px;
  }

  .token-pair {
    font-size: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 33px;
  }

  .section-title {
    font-size: 20px;
    font-weight: 500;
    margin-top: 27px;
    margin-bottom: 10px;
  }

  
}
.lock-tokens-box {
  background: #06312a;
  border-radius: 10px;
  padding: 16px;
  }

  

  .small-text {
    font-size: 12px;
    color: gainsboro;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-gap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  button {
    color: white;
  }
  .btn-gap {
    justify-content: start;

    .btn-percentage {
      background: transparent;
      border: 1px solid grey;
      padding: 4px 10px;
      border-radius: 16px;
    }
  }
  .normal-btn, .green-btn, .big-btn {
    padding: 10px;
    font-size: 16px;
    border: none;
  }
  .normal-btn {
    background: transparent;
  }

  .green-btn, .big-btn {
    background: #09976e;
    min-width: 70px;
    border-radius: 4px;
    color: white;
  }

  .token-balance {
    margin-bottom: 30px;
  }

  .big-btn {
    width: 160px;
    height: 60px;
    border-radius: 8px;
    font-size: 22px;
  }

  .btns-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    grid-template-rows: 70px;

    button {
      background: grey;
      border: none;
      font-size: 21px;
      cursor: pointer;
    }
  }

  .warning-text {
    color: gainsboro;
    margin-bottom: 30px;
  }

</style>
