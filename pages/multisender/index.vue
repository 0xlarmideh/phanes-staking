<template>
  <div class="multisender" :class="nightMode ? 'multisender-night' : ''">
    <div class="row">
      <div class="address">
        <div class="send">
          <p class="text">send</p>
          <div class="token">
            <p
              class="token-item"
              @click="activeToken = false"
              :class="activeToken ? '' : 'active-token'"
            >
              PLS
            </p>
            <p
              class="token-item"
              @click="activeToken = true"
              :class="activeToken ? 'active-token' : ''"
            >
              token
            </p>
          </div>
        </div>
        <div class="inputToken" v-if="activeToken">
          <input v-model="ethAddress" type="text" placeholder=" Input Token Contract  Address" />
          <div class="flex-between">
            <div v-if="showBalance">You have 193.56 PLS (PulseChain Token)</div>
            <button @click="toggleBalance" class="load">Load</button>
          </div>
          
        </div>
      </div>
      <div class="recipients" v-if="showBalance">
        <h3>Recipients and amount</h3>
        <p>
          Enter one address and amount in <span v-if="activeToken">Token</span
          ><span v-else>ETH</span> on each line. Supports any format
        </p>
        <textarea
          name=""
          id="addresses"
          cols="30"
          rows="10"
          placeholder="0xc731159C350d6B0590DBA419F1FF7F726251912d,2.1543
0xE32cC3Eb8beD62C33b3f2095854aa5A2c8aD879A,0.3017
0x2e5cC3Eb8beD62C33b3f2095854aa5A2c8aD834d,1.0024"
        >
        </textarea>
        <button class="confirmBtn" @click="confirmData">Confirm</button>
        <div class="confirmData" v-if="addresses.length > 0">
          <h3 class="main-title">
            Confirm the above information before sending.
          </h3>
          <ul class="details">
            <li class="item">
              <p class="item-heading">Address</p>
              <p class="item-heading">Amount</p>
            </li>
            <li class="item" v-for="(item, index) in addresses" :key="index">
              <p class="address">{{ item.address }}</p>
              <hr class="h-line" />
              <p class="amount">{{ item.amount }}</p>
            </li>
            <li class="item">
              <p class="title">Total</p>
              <p class="amount">{{ totalAmount }}</p>
            </li>
            <li class="item">
              <p class="title">Your balance</p>
              <p class="amount">{{ walletBalance }}</p>
            </li>
            <li class="item">
              <p class="title">Remaining</p>
              <p class="amount">{{ remaining }}</p>
            </li>
          </ul>
        </div>
        <p class="inspiredText">
          Inspired by
          <a href="https://disperse.app" target="_blank">Disperse.app</a>
        </p>
        <button
          class="sendBtn"
          v-if="addresses.length > 0"
          @click="toggleModal"
        >
          Approve
        </button>
      </div>
    </div>
    <MultiSenderPopup class="fix" v-if="modalPopup" @toggleMultiPopup="toggleMultiPopup" :showContent1="modalContent1" :showContent2="modalContent2" :showContent3="modalContent3" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MultiSenderPopup from "~/components/multisender/MultiSenderPopup.vue";
import MultisenderContract from "@/assets/abi/MultisenderABI.json";
import { set } from 'vue';
export default {
  components: {
    MultiSenderPopup,
  },
  data() {
    return {
      activeToken: false,
      addresses: [],
      totalAmount: 0,
      showBalance: false,
      ethAddress: "",
      modalPopup: false,
      modalContent1: false,
      modalContent2: false,
      modalContent3: false,
    };
  },
  computed: {
    ...mapState([
      "nightMode",
      "isConnected",
      "walletBalance",
      "web3",
      "walletAddress",
      "networkID",
      "showMintTokenPopup",
    ]),
    remaining() {
      const balance = this.walletBalance - this.totalAmount;
      return balance < 0 ? "Not enough balance" : balance;
    },
  },
  methods: {
    ...mapMutations(["toggleMintTokenPopup"]),
    toggleModal() {
      this.modalContent3 = true
      this.modalPopup = !this.modalPopup;

      // Change the inner content of the modal to showContent1 after 2 seconds, then to showContent2 after 2 seconds, 
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
      this.modalPopup = !this.modalPopup;
      this.modalContent1 = false;
      this.modalContent2 = false;
      this.modalContent3 = false;
    },
    toggleBalance() {
      // test if ethAddress matches ETH regex
      const ethRegex = /^0x[a-fA-F0-9]{40}$/;
      if (ethRegex.test(this.ethAddress)) {
        this.showBalance = true;
      } else {
        this.showBalance = false;
        alert("Invalid ETH address")
      }
    },
    confirmData() {
      const textarea = document.getElementById("addresses");
      const lines = textarea.value.split("\n");

      this.totalAmount = 0; // Reset the totalAmount
      this.addresses = [];

      lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0 && trimmedLine.includes(",")) {
          const [address, amount] = trimmedLine.split(",");
          const trimmedAddress = address.trim();
          const strippedAmount = parseFloat(amount.trim());

          // Additional validation checks
          if (
            trimmedAddress &&
            !isNaN(strippedAmount) &&
            strippedAmount >= 0 &&
            !this.isDuplicateAddress(trimmedAddress)
          ) {
            this.totalAmount += strippedAmount; // Calculate the total amount
            this.addresses.push({
              address: trimmedAddress,
              amount: strippedAmount,
            });
          }
        }
      });
    },
    isDuplicateAddress(address) {
      return this.addresses.some((item) => item.address === address);
    },
    async send() {
      if (this.isConnected) {
        console.log(this.web3);
        // Load the contract
        const contractData = MultisenderContract.networks[this.networkID];
        const contract = new this.web3.eth.Contract(
          MultisenderContract.abi,
          contractData.address
        );
        // Distribute tokens
        try {
          const result = await contract.methods
            .distribute(recipients, amounts)
            .send({ from: walletAddress });
          console.log("Transaction hash:", result.transactionHash);
          // You can add a success message or redirect to another page here
        } catch (error) {
          console.error("Error:", error);
          // You can show an error message to the user here
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.fix {
  position: fixed;
  top: 30%
}
.multisender {
  padding: 90px 0;
  .address {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    @media only screen and (max-width: 580px) {
      flex-direction: column;
    }
    .send {
      display: flex;
      align-items: center;
      @media only screen and (max-width: 580px) {
        margin-bottom: 20px;
      }
      .text {
        font-weight: 600;
        font-size: 20px;
        color: #070e0c;
        margin-right: 15px;
        text-transform: capitalize;
      }
      .token {
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 1px solid #095c67;
        overflow: hidden;
        p {
          width: 80px;
          text-align: center;
          padding: 14px 10px;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 16px;
          color: #070e0c;
          @media only screen and (max-width: 680px) {
            padding: 5px 10px;
          }
          &:hover {
            cursor: pointer;
            background: linear-gradient(180deg, #095866 0%, #09856c 100%);
            color: #fff;
          }
        }
        .active-token {
          background: linear-gradient(180deg, #095866 0%, #09856c 100%);
          color: #fff;
        }
      }
    }
    .inputToken {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      @media only screen and (max-width: 800px) {
        width: 50%;
      }
      @media only screen and (max-width: 580px) {
        width: 100%;
      }
      input[type="text"] {
        width: 483px;
        height: 42px;
        border: 1px solid #070e0c;
        border-radius: 60px;
        background: transparent;
        font-style: italic;
        font-weight: 500;
        font-size: 18px;
        color: #676767;
        padding: 10px 30px;
        margin-bottom: 12px;
        @media only screen and (max-width: 800px) {
          width: 100%;
        }
        @media only screen and (max-width: 580px) {
          height: 32px;
          font-size: 14px;
        }
        &:focus {
          border: 1px solid #09976e;
          outline: 1px solid #09976e;
        }
      }

      .flex-between {
        display: flex;
        gap: 30px;
        align-items: center;

        div {
          font-size: 18px;
        }

        .load {
        width: 96px;
        height: 40px;
        background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
        border-radius: 8px;
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
        border: none;
        &:hover {
          background: #09976e;
          cursor: pointer;
        }
      }
      }
      
    }
  }
  .recipients {
    display: flex;
    flex-direction: column;

    h3 {
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      margin-bottom: 12px;
    }
    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 35px;
    }
    textarea {
      width: 100%;
      max-width: 100%;
      min-height: 300px;
      padding: 40px 35px;
      font-weight: 500;
      font-size: 20px;
      color: rgba(73, 73, 73, 1);
      background: linear-gradient(
        95.34deg,
        rgba(9, 151, 110, 0.1) -21.44%,
        rgba(8, 79, 101, 0.1) 108.23%
      );
      border-radius: 8px;
      border: none;
      margin-bottom: 40px;
      line-height: 25px;
      @media only screen and (max-width: 480px) {
        padding: 20px 15px;
        min-height: 400px;
      }
      &:focus {
        outline: 1px solid #09976e;
        border: 1px solid #09976e;
      }
    }
    .confirmBtn {
      align-self: flex-end;
      width: 120px;
      height: 40px;
      background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      color: #ffffff;
      border: none;
      margin-bottom: 10px;
      &:hover {
        background: #09976e;
        cursor: pointer;
      }
    }
    .confirmData {
      width: 100%;
      padding: 37px 42px;
      background: linear-gradient(180deg, #085b66 0%, #09856b 100%);
      margin-bottom: 14px;
      @media only screen and (max-width: 480px) {
        padding: 15px;
      }
      .main-title {
        font-weight: 500;
        font-size: 24px;
        color: #ffffff;
        border-bottom: 3px solid rgba(255, 255, 255, 0.5);
        padding-bottom: 17px;
        margin-bottom: 40px;
        @media only screen and (max-width: 480px) {
          font-size: 20px;
          margin-bottom: 20px;
        }
      }
      .details {
        width: 100%;
        list-style: none;
        .item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-heading {
            font-weight: 700;
            font-size: 24px;
            color: #ffffff;
            @media only screen and (max-width: 800px) {
              font-size: 20px;
            }
          }

          .h-line {
            min-width: 20px;
            width: 100%;
            height: 0;
            margin: 0 20px;
            border: 1px solid #ffffff;
            margin-bottom: 40px;
            @media only screen and (max-width: 660px) {
              width: 10px;
            }
            @media only screen and (max-width: 510px) {
              display: none;
            }
          }
          .title,
          .amount,
          .address {
            font-weight: 400;
            font-size: 19px;
            color: #ffffff;
            @media only screen and (max-width: 1080px) {
              font-size: 18px;
            }
            @media only screen and (max-width: 800px) {
              font-size: 14px;
            }
            @media only screen and (max-width: 660px) {
              font-size: 12px;
            }
          }
          .address {
            @media only screen and (max-width: 660px) {
              font-size: 10px;
            }
            @media only screen and (max-width: 510px) {
              font-size: 8px;
            }
          }
          .title {
            font-weight: 700px;
          }
        }
      }
    }
    .inspiredText {
      font-style: italic;
      font-weight: 500;
      font-size: 18px;
      color: #070e0c;
      margin-bottom: 18px;
      a {
        text-decoration: none;
        color: #086a68;
      }
    }
    .sendBtn {
      align-self: flex-end;
      width: 96px;
      height: 40px;
      background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      color: #ffffff;
      border: none;
      &:hover {
        background: #09976e;
        cursor: pointer;
      }
    }
  }
}
.multisender-night {
  background: #070e0c;
  .address {
    .send {
      .text {
        color: #fff;
      }
      .token {
        p {
          color: #fff;
        }
      }
    }
    .inputToken {
      input[type="text"] {
        border: 1px solid #d3f1e9;
        color: #d3f1e9;
      }
    }
  }
  .recipients {
    h3 {
      color: #fff;
    }
    p {
      color: rgba(255, 255, 255, 0.5);
    }
    textarea {
      background: linear-gradient(
        95.34deg,
        rgba(9, 151, 110, 0.1) -21.44%,
        rgba(8, 79, 101, 0.1) 108.23%
      );
      color: rgba(255, 255, 255, 0.8);
    }
    .confirmData {
      background: linear-gradient(180deg, #085b66 0%, #09856b 100%);
    }
    .inspiredText {
      color: #fff;
    }
  }
}
</style>
