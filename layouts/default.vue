<template class="container">
    <div> <div class="overlay" @click="togglePopup(false)" v-show="showPopup"></div>
    <PopupTokens1 v-show="showPopup"/>

    <!-- Staking Popup -->
    <div class="overlay" @click="toggleStakingPopup(false)" v-show="showStakingPopup"></div>
    <StakingPopup v-show="showStakingPopup"/>

    <Navbar/>
    <!-- Render pages inside here -->
    <Nuxt />
    <!--  -->
    <FooterComp/></div>
   
    
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Navbar from "~/components/Navbar.vue";
import FooterComp from "~/components/FooterComp.vue";
import StakingPopup from "~/components/StakingPopup.vue";
import PopupTokens1 from '~/components/popupTokens.vue';


  export default {
    computed: {
      ...mapState([
        'showPopup',
        'showStakingPopup'
      ]),
    },
    methods:{
      ...mapMutations([
          'togglePopup',
          'toggleStakingPopup'
      ]),
    },
    components:{
    Navbar,
    FooterComp,
    PopupTokens1,
    StakingPopup
}
  }
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
*,*::after,*::before{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html{
  font-family: 'Poppins', sans-serif;
  background: #f3f3f3;
  scroll-behavior: smooth;
}
a{
  text-decoration: none;
}
.row{
  width: 100%;
  max-width: 1600px;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 0 24px;
  @media only screen and (max-width:580px){
    padding: 0 10px;
  }
}
.container{
  position: relative;
}
.overlay{
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(20px);
    width: 100%;
    min-height: 120vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  a{
    text-decoration: none;
  }
</style>
