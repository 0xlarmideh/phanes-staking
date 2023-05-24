<script>
    import {mapMutations, mapState} from 'vuex'
    export default {
        data(){
            return{
                darkMode:false,
                hideMenu: true,
            }
        },
        computed:{
            ...mapState([
                'nightMode'
            ]),
        },
        methods:{
            ...mapMutations([
                'changeMode'
            ]),
            handleDarkMode(){
            this.darkMode = !this.darkMode;
            this.changeMode(this.darkMode)
            const dot = document.getElementById('toggleDot')
            if(this.darkMode === true){
                dot.style.left = '23px'
                dot.style.background= 'rgba(7, 14, 12, 0.85)';
            }else{
                dot.style.left = '3px'
                dot.style.background= '#fff';
            }
            },
            setActive(){
                const buttons = document.querySelectorAll('.btn')
                for(let i=0; i<buttons.length; i++){
                    buttons[i].classList.remove('active')
                }
                const btn = event.target
                btn.classList.add('active')
                
                if(btn.classList.contains('btn1')){                     
                    this.$router.push('/dashboard')
                }
                else if(btn.classList.contains('btn2')){this.$router.push('/dashboard/liquidityLocker')}
                else if(btn.classList.contains('btn3')){this.$router.push('/dashboard/tokenLocker')}
                else if(btn.classList.contains('btn4')){this.$router.push('/dashboard/tokenMinter')}
                else if(btn.classList.contains('btn5')){this.$router.push('/dashboard/staking')}
                else if(btn.classList.contains('btn6')){this.$router.push('/dashboard/multisender')}
                this.hideMenu = !this.hideMenu
            }
    
        },
        mounted(){
            this.darkMode = this.nightMode
        }
    }
</script>

<template>
    <div class="wrapper" :class="nightMode?'nav-night':''">
        <nav class="nav">
          <img src="@/assets/Logo-night.png" alt="" class="logo" v-if="nightMode" @click="$router.push('/')">  
          <img src="@/assets/logo.png" alt="" class="logo" v-else @click="$router.push('/')">
          <div>
              <ul class="buttons" :class="nightMode?'buttons-night':''">
                  <li><router-link to="" @click="setActive" class="btn btn1">Index</router-link></li>
                  <li><router-link to="" @click="setActive" class="btn btn2">Liquidity Locker</router-link></li>
                  <li><router-link to="" @click="setActive" class="btn btn3">Token Locker</router-link></li>
                  <li><router-link to="" @click="setActive" class="btn btn4">Token Minter</router-link></li>
                  <li><router-link to="" @click="setActive" class="btn btn5">Staking</router-link></li>
                  <li><router-link to="" @click="setActive" class="btn btn6">Multisender</router-link></li>
              </ul>
          </div>
          <div class="right">
              <fonts-icon icon="bars" class="menuIcon" @click="hideMenu = !hideMenu"/>
              <svg class="toggleBtn" v-if="nightMode" @click="changeMode(!nightMode)" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 4.58333C8.13474 4.58333 4.58333 8.13474 4.58333 12.5C4.58333 16.8653 8.13474 20.4167 12.5 20.4167C16.8653 20.4167 20.4167 16.8653 20.4167 12.5C20.4167 8.13474 16.8653 4.58333 12.5 4.58333ZM12.5 18.75C11.2639 18.75 10.0555 18.3834 9.02769 17.6967C7.99988 17.0099 7.1988 16.0338 6.72575 14.8918C6.25271 13.7497 6.12893 12.4931 6.37009 11.2807C6.61125 10.0683 7.2065 8.95466 8.08058 8.08058C8.95466 7.2065 10.0683 6.61125 11.2807 6.37009C12.4931 6.12893 13.7497 6.25271 14.8918 6.72575C16.0338 7.1988 17.0099 7.99988 17.6967 9.02769C18.3834 10.0555 18.75 11.2639 18.75 12.5C18.7481 14.157 18.089 15.7456 16.9173 16.9173C15.7456 18.089 14.157 18.7481 12.5 18.75ZM11.6667 0H13.3333V2.5H11.6667V0ZM11.6667 22.5H13.3333V25H11.6667V22.5ZM22.5 11.6667H25V13.3333H22.5V11.6667ZM0 11.6667H2.5V13.3333H0V11.6667ZM19.4108 20.5893L20.5893 19.4108L22.2559 21.0774L21.0774 22.2559L19.4108 20.5893ZM2.74411 3.9226L3.92266 2.74406L5.58932 4.41073L4.41078 5.58927L2.74411 3.9226ZM2.74401 21.0776L4.41068 19.4109L5.58922 20.5893L3.92255 22.256L2.74401 21.0776ZM19.4108 4.41073L21.0774 2.74406L22.256 3.9226L20.5893 5.58927L19.4108 4.41073Z" fill="#1BD19C"/>
              </svg>
              <svg class="toggleBtn" v-else @click="changeMode(!nightMode)" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1398 25C9.62028 25 6.31791 23.6359 3.84098 21.159C1.36404 18.6822 3.07733e-07 15.3796 3.07733e-07 11.86C-0.000525102 9.43206 0.671756 7.05143 1.94222 4.98238C3.21269 2.91333 5.03165 1.23679 7.1972 0.138853C7.41999 0.0252811 7.67131 -0.0201531 7.91976 0.00822219C8.16822 0.0365975 8.40281 0.137525 8.59426 0.298407C8.78571 0.459288 8.92554 0.672996 8.99628 0.912853C9.06702 1.15271 9.06554 1.40809 8.99203 1.64711C8.37408 3.6431 8.31335 5.77001 8.8164 7.798C9.31944 9.826 10.3671 11.678 11.8463 13.1538C12.9077 14.2231 14.1708 15.0713 15.5623 15.6493C16.9538 16.2272 18.4461 16.5234 19.9528 16.5207C21.1055 16.5215 22.2516 16.3486 23.3527 16.0078C23.5918 15.9343 23.8472 15.9328 24.0871 16.0035C24.327 16.0742 24.5407 16.2141 24.7016 16.4055C24.8625 16.597 24.9634 16.8316 24.9918 17.0801C25.0201 17.3286 24.9747 17.5799 24.8611 17.8027C23.7631 19.9683 22.0866 21.7872 20.0175 23.0577C17.9485 24.3282 15.5678 25.0005 13.1398 25ZM7.15173 2.07145C5.47246 3.09318 4.08529 4.53099 3.1244 6.2458C2.16351 7.9606 1.66142 9.89437 1.66671 11.86C1.66671 18.1864 6.81349 23.3333 13.1398 23.3333C15.1055 23.3386 17.0393 22.8365 18.7541 21.8756C20.4689 20.9147 21.9068 19.5276 22.9285 17.8483C21.9528 18.0741 20.9545 18.1879 19.9529 18.1875C18.2272 18.1908 16.518 17.8518 14.9243 17.19C13.3305 16.5283 11.8838 15.557 10.6679 14.3324C9.08837 12.7559 7.93663 10.8028 7.32142 8.65762C6.7062 6.51241 6.6478 4.24581 7.15173 2.07176V2.07145Z" fill="#09976E"/>
              </svg>
              
              <button class="connect">Connect</button>
          </div>
      
        </nav>
        <button class="selectNetwork">Select Network</button>
        <div :class="hideMenu? 'hideButtons':''">
            <ul class="buttons-mobile" :class="nightMode?'buttons-mobile-night':''">
                <li><router-link to="" @click="setActive" class="btn btn1">Index</router-link></li>
                <li><router-link to="" @click="setActive" class="btn btn2">Liquidity Locker</router-link></li>
                <li><router-link to="" @click="setActive" class="btn btn3">Token Locker</router-link></li>
                <li><router-link to="" @click="setActive" class="btn btn4">Token Minter</router-link></li>
                <li><router-link to="" @click="setActive" class="btn btn5">Staking</router-link></li>
                <li><router-link to="" @click="setActive" class="btn btn6">Multisender</router-link></li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        padding: 15px 24px;
        background: linear-gradient(180deg, rgba(243, 243, 243, 0.132) 0%, rgba(243, 243, 243, 0.044) 100%);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.01);
        @media only screen and (min-width:1600px){
            padding: 15px 100px;
        }
        @media only screen and (max-width:580px){
            padding: 15px 10px;
        }
    }
    .nav{
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .logo{
            cursor: pointer;
            width: 130px;       
            @media only screen and (max-width:1080px) {
                width: 100px;
            }     
               
        }
        .buttons{
            display: flex;
            align-items: center;
            justify-content: center;
            list-style: none;
            @media only screen and (max-width:980px){
                display: none;
            }
            &>*:not(:last-child){
                margin-right: 40px;
                @media only screen and (max-width:1480px) {
                   margin-right: 2px;
                }
            }
            .btn{
                font-weight: 500;
                font-size: 18px;
                padding: 10px 20px;
                border-radius: 7px;
                color: #070E0C;
                transition: all .25s;

                @media only screen and (max-width:1340px) {
                    padding: 10px;
                }
                @media only screen and (max-width:1130px) {
                    font-size: 16px;
                }
                &:active,&:hover{
                    background: rgba(9, 151, 110, 0.15);
                    color: #09976E;
                }
            }
            .active{
                background: rgba(9, 151, 110, 0.15);
                color: #09976E;
            }           
        }
        .buttons-night{
            @media only screen and (max-width:980px) {
                background: rgba(10, 14, 11, 0.999);
            }
            .btn{
                color: #ADADAD;
                &:active,&:hover{
                    background: #1B201E;
                    color: #ADADAD;
                }
            }
            .active{
                background: #1B201E;
                color: #ADADAD;
            }
        }
        .right{
            display: flex;
            align-items: center;
            justify-content: center;
            .menuIcon{
                font-size: 30px;
                color: #09976E;
                margin-right: 15px;
                cursor: pointer;
                display: none;
                @media only screen and (max-width:980px) {
                    display: block;
                }
                @media only screen and (max-width:580px) {
                    font-size: 20px;
                }
            }
            .toggleBtn{
                width: 45px;
                height: 45px;
                padding: 10px;
                background: rgba(27, 209, 156, 0.15);
                border-radius: 7px;
                margin-right: 30px;             
                transition: all .25s;
                cursor: pointer;
                @media only screen and (max-width:1080px) {
                    width: 30px;
                    height: 30px;
                    padding: 5px;
                    margin-right: 15px; 
                }
                @media only screen and (max-width:580px) {
                    transform: scale(.8);
                    margin-right: 10px;
                } 
            }
            .connect{
                padding: 10px 27px;
                background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                color: #fff;
                border-radius: 8px;
                font-weight: 700;
                font-size: 20px;
                border: none;
                outline: none;
                cursor: pointer;
                transition: all .25s;
                @media only screen and (max-width:1080px) {
                    padding: 10px 20px;
                    font-weight: 500;
                    font-size: 16px;
                }
                @media only screen and (max-width:980px) {
                    padding: 10px 27px;
                    width: 134px;
                    font-size: 15px;
                } 
                @media only screen and (max-width:420px) {
                    width: 100px;
                    padding: 10px 5px;
                    font-size: 14px;
                } 
                &:active,&:hover{
                    background:  #09976E;
                }
            }

        }
    }
    .nav-night{
        background: rgba(10, 14, 11, 0.999);
        backdrop-filter: blur(20px);
    }

    .selectNetwork{
        align-self: flex-end;
        width: 134px;
        padding: 10px;
        background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
        color: #fff;
        border-radius: 8px;
        font-weight: 700;
        font-size: 15px;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all .25s;
        @media only screen and (max-width:1080px) {
            width: 100px;
        }
        @media only screen and (max-width:980px) {
            width: 134px;
            font-size: 15px;
        } 
        @media only screen and (max-width:420px) {
            width: 100px;
            padding: 10px 5px;
            font-size: 12px;
        } 
        &:active,&:hover{
            background:  #09976E;
        }
    }
    .buttons-mobile{
        display: none;
        list-style: none;
        width: 100%;
        z-index: 999;
        color: #1B201E;
        padding: 15px;
        li{
            width: 100%;
        }

        .btn{
            font-weight: 500;
            font-size: 18px;
            padding: 10px 20px;
            border-radius: 7px;
            color: #070E0C;
            transition: all .25s;

            display: inline-block;
            min-width: 100%;
            border-radius: 0px;
            margin-right: 0px;
        }
        .active{
            background: rgba(9, 151, 110, 0.15);
            color: #09976E;
        }           

        @media only screen and (max-width:980px){
            display: block;
        }
    }
    .buttons-mobile-night{
        color: #ffffff;
        .btn{
            color: #ffffff;
        }
    }
    .hideButtons{
        display: block;
        @media only screen and (max-width:980px){
            display: none;
        }
    }

</style>