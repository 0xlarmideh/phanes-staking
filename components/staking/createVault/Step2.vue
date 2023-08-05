<template>
  <div class="max-w-[1200px] mx-auto pb-[100px]">
    <div>
      <h1 class="text-center mb-[24px] text-[36px] font-[700]">
      Deploy Program to PLS
    </h1>
      <button @click="toggleStep1">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  methods: {
    toggleStep1(){
      this.$emit("toggleStep1")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>