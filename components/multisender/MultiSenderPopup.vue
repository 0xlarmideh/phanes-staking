<template>
  <div class="popup">
    <div class="close-cont" @click="toggleMultiPopup">
      <Icon
        class="close"
        icon="carbon:close-filled"
        color="#1bd19c"
        width="32"
        height="32"
      />
    </div>
    <div class="text-flex">
      <div class="spinner" v-if="showContent1 || showContent3"><img src="@/assets/eth.svg" /></div>
      <div class="success-cont" v-if="showContent2"><img src="@/assets/sucess-logo.svg" /></div>
      <div v-if="showContent1">
        <h3>Transaction pending</h3>
        <p>
          Ensure there is no pending transaction on your wallet before
          approving this transaction
        </p>
      </div>
      <div v-if="showContent2">
        <h3>Transaction Confirmed</h3>
        
      </div>
      <div v-if="showContent3">
        <h3>Approve this transaction in your wallet</h3>
        <p>
          Ensure there are is no pending transaction on your wallet before
          approving this transaction
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  name: "MultiSenderPopup",
  components: {
    Icon,
  },
  props: ["showContent1", "showContent2", "showContent3"],

  methods: {
    toggleMultiPopup() {
      this.$emit("toggleMultiPopup");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
  color: white;
  backdrop-filter: blur(20px);
  border: 2px solid #1bd19c;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 40px 30px;
  width: 100%;
  max-width: 450px;
  border-radius: 20px;

  .close-cont {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
  .text-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .spinner, .success-cont {
      width: 100px;
      height: 100px;
      margin: 10% 40%;
      position: relative;
      z-index: 1;
    }

    .spinner {
      border-radius: 50%;
      border: 10px solid #1bd19c;
    }
    .spinner:before {
      content: "";
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border-top: 10px solid #ccc;
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;
      position: absolute;
      z-index: 9;
      top: -10px;
      left: -10px;
      animation: rt 2s infinite;
    }
    @keyframes rt {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    h3 {
      margin-bottom: 30px;
      font-size: 18px;
    }
    strong,
    p {
      color: gainsboro;
    }
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
}

.spinner img {
  width: 100%;
  height: 100%;
}
</style>
