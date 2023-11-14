<template>
  <div class="max-w-[1200px] mx-auto pb-[100px]">
    <div>
      <h1 class="text-center mb-[24px] text-[36px] font-[700]">
        Deploy Program to PLS
      </h1>
      <div class="flex flex-col gap-[30px]">
        <div class="p-[36px] border-slate-500 border-[1px] rounded-[8px]">
          <p class="font-[700] uppercase font-[600] text-[18px] mb-[16px]">
            1. Program Metadata
          </p>
          <p>
            Please set a reward program Name (max 32 characters) which will be
            displayed to users, and a starting date/time for when the program
            should be live. If you want the program to be live instantly, please
            use the current time.
          </p>
          <div class="flex gap-[10px] mt-[20px]">
            <div class="flex flex-col gap-[10px]">
              <label for="programName">Name <span class="text-red-900">*</span></label>
              <input
                type="text"
                id="programName"
                v-model="createVaultData.programName"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="date"
                >Start time (Africa/Lagos)
                <span class="text-red-900">*</span></label
              >
              <input
                type="datetime-local"
                v-model="createVaultData.startTime"
                id="date"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
          </div>
        </div>
        <div class="p-[36px] border-slate-500 border-[1px] rounded-[8px]">
          <p class="font-[700] uppercase font-[600] text-[18px] mb-[16px]">
            2. Select Staking Token
          </p>
          <p>
            The staking token is the token that users need to 'stake' in order to accure rewards. You can use the list by typing a token name, or enter a ERC20 token address.<br /><br />
The token purchase URL is a link that users can use to aquire the staking token.<br /><br />

Rebasing/elastic tokens are not supported: You must use a wrapper/buttoned contract, such as EEFI's `UnbuttonToken ERC20 Wrapper` if you wish for users to stake an elastic token.
          </p>
          <div class="flex gap-[10px] mt-[20px]">
            <div class="flex flex-col gap-[10px]">
              <label for="stakingToken">Select token <span class="text-red-900">*</span></label>
              <input
                type="text"
                id="stakingToken"
                v-model="createVaultData.stakingToken"
                placeholder="Select"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="tokenUrl"
                >Token purchase url
                </label
              >
              <input
                type="text"
                id="date"
                v-model="createVaultData.tokenPurchaseUrl"
                placeholder="https://"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
          </div>
        </div>
        <div class="p-[36px] border-slate-500 border-[1px] rounded-[8px]">
          <p class="font-[700] uppercase font-[600] text-[18px] mb-[16px]">
            3. Select Reward Token
          </p>
          <p>
            This is the primary reward token that you will be using to reward users. This token is used for all the primary accounting. You can use any type of ERC20 token including rebasing tokens. 
          </p>
          <div class="flex gap-[10px] mt-[20px]">
            <div class="flex flex-col gap-[10px]">
              <label for="rewardToken">Select token <span class="text-red-900">*</span></label>
              <input
                type="text"
                id="rewardToken"
                v-model="createVaultData.rewardToken"
                placeholder="Select"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="amountRewardToken"
                >Enter amount (optional)
                </label
              >
              <input
                type="number"
                id="amountRewardToken"
                v-model="createVaultData.rewardTokenAmount"
                placeholder="0"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="unlockDays"
                >Enter unlock days
                </label
              >
              <input
                type="number"
                id="unlockDays"
                v-model="createVaultData.unlockDays"
                placeholder="1"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
          </div>
        </div>
        <div class="p-[36px] border-slate-500 border-[1px] rounded-[8px]">
          <p class="font-[700] uppercase font-[600] text-[18px] mb-[16px]">
            4. Select Bonus Tokens (optional)
          </p>
          <p>
            These are additional tokens that you will be rewarding users, to a maximum of 50 different tokens. The users share of these tokens is based on the users share of the main reward token. Adding bonus tokens can also be done after the contract has been deployed. Once a token address is added it cannot be removed.
          </p>
          <div class="flex gap-[10px] mt-[20px]">
            <div class="flex flex-col gap-[10px]">
              <label for="bonusToken">Select token</label>
              <input
                type="text"
                id="bonusToken"
                v-model="createVaultData.bonusToken"
                placeholder="Select"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="amountBonusToken"
                >Enter amount (optional)
                </label
              >
              <input
                type="number"
                id="amountBonusToken"
                v-model="createVaultData.bonusTokenAmount"
                placeholder="0"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
          </div>
        </div>
        <div class="p-[36px] border-slate-500 border-[1px] rounded-[8px]">
          <p class="font-[700] uppercase font-[600] text-[18px] mb-[16px]">
            5. Multiplier
          </p>
          <p>
            The multiplier acts as a protection and scaling mechanism for rewards, read more here. Although it is not a requirement, it is recommended. Setting the floor and ceiling to the same number will disable the multiplier.
          </p>
          <div class="flex gap-[10px] mt-[20px]">
            <div class="flex flex-col gap-[10px]">
              <label for="scalingFloor">Scaling floor <span class="text-red-900">*</span></label>
              <input
                type="number"
                id="scalingFloor"
                v-model="createVaultData.scalingFloor"
                placeholder="1"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="scalingCeiling">Scaling ceiling <span class="text-red-900">*</span></label>
              <input
                type="number"
                id="scalingCeiling"
                v-model="createVaultData.scalingCeiling"
                placeholder="1"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
            <div class="flex flex-col gap-[10px]">
              <label for="scalingdays">Scaling days <span class="text-red-900">*</span></label>
              <input
                type="number"
                id="scalingDays"
                v-model="createVaultData.scalingDays"
                placeholder="1"
                class="border-[1px] border-[grey] text-black rounded-[6px] py-[10px] px-[10px]"
              />
            </div>
          </div>
        </div>
        <button @click="consoleThis">Console this</button>
        <!-- <button @click="toggleStep1">Back</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "Step2",
  data() {
    return {
      createVaultData: {
        programName: "",
        startTime: "",
        stakingToken: "",
        tokenPurchaseUrl: "",
        rewardToken: "",
        rewardTokenAmount: 0,
        unlockDays: "",
        bonusToken: "",
        bonusTokenAmount: 0,
        scalingFloor: 1,
        scalingCeiling: 1,
        scalingDays: 1,
      },
    };
  },
  methods: {
    toggleStep1() {
     
      this.$emit("toggleStep1");
    },
    consoleThis() {
      console.log(this.createVaultData);
    },
  },
  computed: {
    ...mapState(["nightMode"]),
  },
};
</script>

<style lang="scss" scoped></style>
