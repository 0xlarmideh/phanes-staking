<template>
  <div :class="nightMode ? 'container-night' : ''" class="container">
    Create Program Page
  </div>
</template>

<script>
import { mapState } from "vuex";
  export default {
    name: "CreateProgramView",
    computed: {
      ...mapState(["nightMode"]),
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: calc(100vh - 150px);
    padding: 20px;
  }
  .container-night {
    color: white;
    background: #070e0c;
  }
</style>