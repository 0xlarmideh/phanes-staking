<template>
  <div
    :class="nightMode ? 'vault-container-night' : ''"
    class="vault-container "
  >
    <div class="stepper max-w-[1200px] mx-auto items-center flex gap-4 ">
      <div :class="[(nightMode ? 'border-white' : 'border-black'), (step===1 ? 'bg-green-400' : '')]" class="h-[60px] w-[60px] flex justify-center items-center rounded-full border-[2px]">1</div>
      <div class="divider" :class="nightMode ? 'bg-white' : 'bg-black'"></div>
      <div :class="[(nightMode ? 'border-white' : 'border-black'), (step===2 ? 'bg-green-400' : '')]" class="h-[60px] w-[60px] flex justify-center items-center rounded-full border-[2px]">2</div>
      <div class="divider" :class="nightMode ? 'bg-white' : 'bg-black'"></div>
      <div :class="nightMode ? 'border-white' : 'border-black'" class="h-[60px] w-[60px] flex justify-center items-center rounded-full border-[2px]">3</div>
    </div>
    <Step1 v-if="step===1" @toggleStep2="toggleStep(2)" />
    <Step2 v-if="step===2" @toggleStep1="toggleStep(1)"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Step1 from "../../components/staking/createVault/Step1.vue"
import Step2 from "../../components/staking/createVault/Step2.vue"
export default {
  name: "CreateVaultView",
  components: {Step1, Step2},
  data() {
    return {
      step: 1,
      steps: 3,
    };
  },
  computed: {
    ...mapState(["nightMode"]),
  },
  methods: {
    toggleStep(step) {
      this.step = step
      console.log("step 2")
    }
  }
};
</script>

<style lang="scss" scoped>
.vault-container {
  min-height: calc(100vh - 150px);
  // width: 100vw;
  padding: 20px;
}


.vault-container-night {
  color: white;
  background: #070e0c;
}

.divider {
      width: calc(50% - 100px);
      // background: gainsboro;
      height: 2px;
    }


</style>
