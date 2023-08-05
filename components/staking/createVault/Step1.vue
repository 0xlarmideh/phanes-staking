<template>
  <div class="max-w-[1200px] mx-auto pb-[100px]">
    <h1 class="text-center mb-[24px] text-[36px] font-[700]">
      Create a new vault on PLS
    </h1>
    <div class="grid gap-[16px] mb-[20px] grid-cols-[1fr_1fr_1fr]">
      <div
        class="text-center card-bg py-[33px] px-[10px] rounded-[6px] bg-[grey]"
        v-for="card in cards"
      >
        <p class="uppercase mb-[16px] text-white font-[600] text-[18px]">
          {{ card?.title }}
        </p>
        <p class="grey-title font-[300]">{{ card?.description }}</p>
      </div>
    </div>

    <div
      class="card-bg mx-auto py-[33px] px-[10px] rounded-[6px] text-center max-w-[600px]"
    >
      <p
        class="font-[500] uppercase font-[600] text-white text-[18px] mb-[16px]"
      >
        Requirements
      </p>
      <p class="grey-title font-[300]">
        Before starting, please spend a few minutes to familiarise yourself with
        our reward program documentation.<br /><br />
        Launching a reward program is permissionless and is done via our
        factory. We welcome all protocols to launch a reward program via
        Crucible; giving you instant access to a vast, already existing
        community.<br /><br />

        Programs that appear to be made in bad faith will be delisted.<br />

        Programs that are deployed by new/unrecognised wallets will be
        automatically classified as Unverified. Please reach out to us on
        Discord if you wish to become a verified reward program maintainer.<br /><br />

        Token pricing data is retrieved from Coingecko & Fjord LBPS (historical
        pricing). Uniswap V2 & Balancer Pool Tokens are supported for automatic
        valuation (if underlying tokens are on coingecko), other pools such as
        AAVE can be supported by request. If your tokens are not being priced
        please ensure it is listed on Coingecko before contacting us.
      </p>
    </div>
    <div class="flex justify-end pb-[50px] pt-[30px]">
      <NuxtLink to="/staking"><button class="card-bg rounded-[8px] py-[10px] px-[22px]">Cancel</button></NuxtLink>
      <button @click="toggleStep2" class="card-bg rounded-[8px] py-[10px] px-[22px]">Proceed</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Step1",
      cards: [
        {
          title: "Self custody",
          description:
            "Crucible is a smart contract that lets users participate in reward programs using Proof of Stake. Users can keep control of their staked tokens while participating in a program.",
        },
        {
          title: "secure",
          description:
            "As users maintain control of their staked tokens, users funds are not pooled at a single point of failure, proving to be a safer and more accepted solution to participants.",
        },
        {
          title: "capital efficient",
          description:
            "You can run multiple reward programs using the same staking taken, allowing users to re-use the same staking balance which in turn adds an additional lock to the balance",
        },
      ],
    };
  },
  methods: {
    toggleStep2() {
      this.$emit("toggleStep2")
    }
  }
};
</script>

<style lang="scss" scoped>
.card-bg {
  background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
}

.grey-title {
  color: gainsboro;
}
</style>
