<template>
  <div class="liquidityLocker" :class="nightMode? 'liquidityLocker-night':''">
    <div class="row">
        <div class="filterbar" :class="nightMode? 'filterbar-night':''">
            <div v-if="createLock"></div>
            <div class="searchbar" v-else>
                <input type="text" class="searchInput" placeholder="Pair name or address">
                <img src="@/assets/searchIcon-night.png" class="searchIcon" alt="" v-if="nightMode">
                <img src="@/assets/searchIcon.png" class="searchIcon" alt="" v-else>
            </div>
            <div class="createLock">
                <p :class="createLock? 'active-lock':''" @click="createLock=true">createLock</p>
                <p :class="createLock? '':'active-lock'" @click="createLock=false">Edit/Withdraw</p>
            </div>
        </div>
        <div class="lockWrapper" v-if="createLock" :class="nightMode? 'lockWrapper-night':''">
            <h3 class="message">Gain investors’ trust by locking your project’s liquidity. This section is only for project deployer.</h3>
            <div class="searchbox">
                <input type="text" class="searchInput" placeholder="Enter token contract address">
                <img src="@/assets/searchIcon-night.png" class="searchIcon" alt="">
            </div>
        </div>
        <ul class="cards" v-else>
            <li class="card" v-for="(card, index) in cards" :key="index" :class="nightMode? 'card-night':''">
                <div class="card-heading">
                    <div class="icons">
                        <img :src="require(`@/assets/${card.icon1}`)" alt="" class="icon1">
                        <img :src="require(`@/assets/${card.icon2}`)" alt="" class="icon2">
                    </div>
                   <div class="title">
                        <h3 class="title1">{{card.title1}}</h3>
                        <h3 class="title2">/{{card.title2}}</h3>
                   </div>
                </div>
                <div class="col">
                    <h3 class="title">APR</h3>
                    <p class="value">{{card.apr}}%</p>
                </div>
                <div class="col">
                    <h3 class="title">next in</h3>
                    <p class="value">{{card.nextIn}}</p>
                </div>
                <div class="col">
                    <h3 class="title">amount</h3>
                    <p class="value">{{card.amount}}</p>
                </div>
                <div class="col">
                    <h3 class="title">liquidity</h3>
                    <p class="value liquidityVal">{{card.liquidity}}</p>
                </div>
                <div class="lockBtn">
                      <img src="@/assets/lockIcon.png" alt="" class="lockIcon">
                      Lock
                  </div>
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
    import { mapState } from 'vuex';
export default {
    data(){
        return{
            createLock:false,
            showSortPopup:false,
            cards:[
                { icon1:'tera.png', icon2:'eth-icon.png', title1:'tera', title2:'eth', apr:99.9, nextIn:'6 Months', amount:38.72, liquidity:'6.23 M', },
                { icon1:'tera.png', icon2:'eth-icon.png', title1:'tera', title2:'eth', apr:99.9, nextIn:'6 Months', amount:38.72, liquidity:'6.23 M', },
                { icon1:'tera.png', icon2:'eth-icon.png', title1:'tera', title2:'eth', apr:99.9, nextIn:'6 Months', amount:38.72, liquidity:'6.23 M', },
                { icon1:'tera.png', icon2:'eth-icon.png', title1:'tera', title2:'eth', apr:99.9, nextIn:'6 Months', amount:38.72, liquidity:'6.23 M', },
                { icon1:'tera.png', icon2:'eth-icon.png', title1:'tera', title2:'eth', apr:99.9, nextIn:'6 Months', amount:38.72, liquidity:'6.23 M', },
                { icon1:'tera.png', icon2:'eth-icon.png', title1:'tera', title2:'eth', apr:99.9, nextIn:'6 Months', amount:38.72, liquidity:'6.23 M', },
            ]

        }
    },
    computed:{
            ...mapState([
                'nightMode'
            ])
        },
}
</script>

<style lang="scss" scoped>
    .liquidityLocker{
        padding: 70px 0;
    }
    .liquidityLocker-night{
        background: #070E0C;
        backdrop-filter: blur(20px);
    }

    .filterbar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media only screen and (max-width: 600px) {
            flex-direction: column;
            justify-content: center;
        }
        .searchbar{
            position: relative;
            width: 483px;
            height: 42px;
            border: 1px solid #CBCBCB;
            border-radius: 60px;
            @media only screen and (max-width:980px){
                width: 283px;
                height: 32px;
                margin-right: 15px;
            }
            @media only screen and (max-width: 600px) {
                width: 80%;
                min-width: 330px;
                margin-right: 0;
                margin-bottom: 20px;
            }
            .searchInput{
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                background: transparent;
                font-style: italic;
                font-weight: 500;
                font-size: 18px;
                color: #646464;
                padding: 0 30px;
                padding-right: 60px;
                @media only screen and (max-width:980px){
                    font-size: 14px;
                    padding: 0 15px;
                }
                &:focus{
                        border: 1px solid #1BD19C;
                        border-radius: 60px;
                }
            }
            .searchIcon{
                position: absolute;
                right: 30px;
                top: 11.5px;
                width: 19px;
                @media only screen and (max-width:980px){
                    right: 15px;
                    width: 15px;
                    top: 8px;
                    right: 10px;
                }
            }
        }
        .createLock{
            display: flex;
            align-items: center;
            border-radius: 8px;
            border: 1px solid #095C67;
            overflow: hidden;
            justify-self: flex-end;
            p{  
                min-width: 115px;
                text-align: center;
                padding: 14px 10px;
                text-transform: capitalize;
                font-weight: 600;
                font-size: 16px;
                color: #000000;
                background: transparent;
                @media only screen and (max-width:980px){
                    padding: 5px 10px;
                }
                &:hover{
                    cursor: pointer;
                    background: linear-gradient(180deg, #095866 0%, #09856C 100%);
                    color: #fff;
                }
            }
            .active-lock{
                background: linear-gradient(180deg, #095866 0%, #09856C 100%);
                color: #fff;
            }
        }
    }
    .filterbar-night{
        .createLock{
            p{  
                color: #ffffff;
            }
        }     
    }
    .lockWrapper{
        width: 100%;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 40px 0;
        text-align: center;
        .searchbox{
            position: relative;
            width: 655px;
            height: 119px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #063841 0%, #054d3e 100%);
            backdrop-filter: blur(20px);
            border-radius: 10px;
            margin-top: 40px;
            @media only screen and (max-width:680px){
                width: 540px;
                height: 119px;
            }
            @media only screen and (max-width:580px){
                width: 340px;
                height: 80px;
            }
        
            .searchInput{
                width: 483px;
                height: 42px;
                outline: none;
                border: 1px solid #CBCBCB;
                border-radius: 60px;
                background: transparent;
                font-style: italic;
                font-weight: 500;
                font-size: 18px;
                color: #ffffff;
                padding: 0 30px;
                padding-right: 60px;
                @media only screen and (max-width:680px){
                    width: 350px;
                    border-radius: 30px;
                    height: 60px;
                    padding: 0 20px;
                    padding-right: 40px;
                }
                @media only screen and (max-width:580px){
                    width: 280px;
                    height: 40px;
                    font-size: 16px;
                }

                &:focus{
                    border: 1px solid #1BD19C;
                    border-radius: 60px;
                }
            }
            .searchIcon{
                position: absolute;
                right: 100px;
                width: 19px;
                @media only screen and (max-width:680px){
                    right: 120px;
                }
                @media only screen and (max-width:580px){
                    right: 40px;
                }
            }
        }
    }
    .lockWrapper-night{
        color: #fff;
    }
    .cards{
        padding: 40px 0;
        .card{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 42px 38px;
            background: linear-gradient(95.34deg, rgba(9, 151, 110, 0.1) -21.44%, rgba(8, 79, 101, 0.1) 108.23%);
            border-radius: 8px;
            margin-bottom: 40px;
            
            @media only screen and (max-width:980px){
                flex-direction: column;
                align-items: flex-start;
            }
            &>*{
                margin-bottom: 10px;
            }

            .card-heading{
                display: flex;
                .icons{
                    margin-right: 8px;
                    img{
                        height: 40px;
                        width: 40px;
                        padding: 8px;
                        border-radius: 50%;
                    }
                    .icon1{
                        background-color: #172852;
                        transform: translateX(8px);
                    }
                    .icon2{
                        background-color: #ACB5F0;
                    }
                }
                .title{
                    text-transform: capitalize;
                    display: flex;
                    align-items: center;
                    .title1{
                        color: #010D09;
                    }
                    .title2{
                        color: #585858;
                    }
                }
            }
            .col{
                @media only screen and (max-width:980px){
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .title{
                    font-weight: 500;
                    font-size: 20px;
                    color: #505050;
                    margin-bottom: 10px;
                    text-transform: capitalize;
                    @media only screen and (max-width:980px){
                        margin-bottom: 0;
                    }
                }
                .value{
                    font-weight: 500;
                    font-size: 20px;
                    color: #010D09;
                }
                .liquidityVal{
                    font-weight: 700;
                    color: #09976E;
                }
            }
            .lockBtn{
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: 700;
                font-size: 18px;
                width: 134px;
                height: 46px;
                background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                border-radius: 8px;
                transition: all .25s;
                cursor: pointer;
                &:active,&:hover{
                    background:#09976E;
                }
                img{
                    width: 16px;
                    margin-right: 15px;
                }
            }
        }
        .card-night{
            background: linear-gradient(95.34deg, rgba(9, 151, 110, 0.1) -21.44%, rgba(8, 79, 101, 0.1) 108.23%);
            .card-heading{
                .title{
                    .title1{
                        color: #E0E0E0;
                    }
                    .title2{
                        color: #9D9D9D;
                    }
                }
            }
            .col{
                .title{
                    color: #A5A5A5;
                }
                .value{
                    color: #ffffff;
                }
                .liquidityVal{
                    font-weight: 700;
                    color: #09976E;
                }
            }
        }
    }


</style>