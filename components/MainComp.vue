<template>
  <main class="main row" :class="nightMode? 'main-night':''">
    <div class="tokens">
        <table cellspacing="30" >
        <tr>
            <th>TOKEN</th> <th>VALUE PER TOKEN</th> <th>24HR CHANGE</th>
        </tr>
        <template v-if="showAll">
            <tr v-for="(token, index) in tokens" :key="index">
                <td class="tokenTitle">
                    <img :src="require(`@/assets/${token.icon}`)" alt="" class="tokenIcon">
                    {{token.title}}
                </td> 
                <td class="tokenValue">${{token.value}}</td> 
                <td class="tokenChange"><span v-if="token.change24>0">+</span>{{token.change24}}%</td> 
            </tr>
        </template>
        <template v-else>
            <tr v-for="(token, index) in tokens.slice(0,5)" :key="index">
                <td class="tokenTitle">
                    <img :src="require(`@/assets/${token.icon}`)" alt="" class="tokenIcon">
                    {{token.title}}
                </td> 
                <td class="tokenValue">${{token.value}}</td> 
                <td class="tokenChange"><span v-if="token.change24>0">+</span>{{token.change24}}%</td> 
            </tr>
        </template>
        <tr>
            <button class="showBtn" @click="showAll =! showAll" v-if="showAll">Show Less</button>
            <button class="showBtn" @click="showAll =! showAll" v-else>Show All</button>
        </tr>
        </table>
    </div>
    <div class="circualarChart">
        <div class="popup" :class="nightMode? 'popup-night':''">
            <div class="popup-header">
                <img :src="require(`@/assets/${selectedToken.icon}`)" alt="" class="icon">
                <p class="title">{{selectedToken.title}}</p>
            </div>
            <p class="sub-heading">Allocation</p>
            <p class="value">{{selectedToken.value}}%</p>
        </div>
        <DoughnutChart/>
    </div>
    
  </main>
</template>

<script>
import { mapState } from 'vuex';
import DoughnutChart from './DoughnutChart.vue';
export default {
    data() {
        return {
            showAll: false,
            selectedToken: { icon: "stoken1.png", title: "Uniswap", value: 40.10},
            tokens: [
                { icon: "token1.png", title: "Bone shibaswap", value: 1.95, change24: 8.97 },
                { icon: "token2.png", title: "Uniswap", value: 27.15, change24: 8.97 },
                { icon: "token3.png", title: "Wrapped ETH", value: 1566.67, change24: 8.97 },
                { icon: "token4.png", title: "1inch", value: 0.67, change24: 8.97 },
                { icon: "token5.png", title: "Wrapped BTC", value: 19878.81, change24: 8.97 },
                { icon: "token1.png", title: "Bone shibaswap", value: 1.95, change24: 8.97 },
            ]
        };
    },
    computed:{
        ...mapState([
            'nightMode'
        ])
    },
    components: { DoughnutChart}
}
</script>

<style lang="scss" scoped>
    .main{        
        padding-bottom: 80px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        @media only screen and (max-width:1120px) {
            flex-direction: column;
            align-items: center;
            padding-bottom: 10px;
        }
        .tokens{
            width: 62%;  
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            @media only screen and (max-width:1120px) {
                width: 100%;
            }
            table{
                border-collapse: collapse;
                width: 100%;                
                color: #383838;
                
                @media only screen and (max-width:980px) {
                   width: 90%;
                }
                @media only screen and (max-width:780px) {
                   width: 100%;
                   border-spacing: 10px;
                }
                @media only screen and (max-width:580px) {  
                   border-spacing: 5px;
                }
                tr{
                    border-bottom: solid thin rgba(0, 0, 0, 0.2);
                    padding: 20px 0;
                    line-height: 100px;
                    &:last-child{
                        border: none;
                    }
                    th{
                        font-weight: 600;
                        font-size: 24px;
                        margin-bottom: 30px;
                        @media only screen and (max-width:780px) {
                            font-size: 20px;
                        }
                        @media only screen and (max-width:580px) {
                            font-size: 16px;
                        }
                        @media only screen and (max-width:480px) {
                            font-size: 12px;
                        }
                        &:first-child{
                            text-align: left;
                        }
                    }
                    .tokenIcon{
                            width: 55px;
                            margin-right: 20px;
                            @media only screen and (max-width:780px) {
                                width: 30px;
                                margin-right: 10px;
                            }
                        }
                    .tokenTitle{
                        display: flex; 
                        align-items: center;
                        font-weight: 500;
                        font-size: 24px;
                        @media only screen and (max-width:780px) {
                            font-size: 18px;
                        }
                        @media only screen and (max-width:580px) {
                            font-size: 14px;
                        }
                        @media only screen and (max-width:480px) {
                            font-size: 10px;
                        }
                    }
                    .tokenValue{
                        text-align: center;
                        font-weight: 600;
                        font-size: 24px;
                        @media only screen and (max-width:780px) {
                            font-size: 18px;
                        }
                        @media only screen and (max-width:580px) {
                            font-size: 14px;
                        }
                        @media only screen and (max-width:480px) {
                            font-size: 10px;
                        }
                    }
                    .tokenChange{
                        font-weight: 600;
                        font-size: 24px;
                        text-align: center;
                        color: #1BD19C;
                        @media only screen and (max-width:780px) {
                            font-size: 18px;
                        }
                        @media only screen and (max-width:580px) {
                            font-size: 14px;
                        }
                        @media only screen and (max-width:480px) {
                            font-size: 10px;
                        }
                    }

                }
                .showBtn{
                    font-weight: 500;
                    font-size: 24px;
                    line-height: 36px;
                    text-decoration-line: underline;
                    color: #1BD19C;
                    background: transparent;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    @media only screen and (max-width:780px) {
                        font-size: 20px;
                    }
                    @media only screen and (max-width:580px) {
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
            }
        }
        .circualarChart{
            position: relative;
            width: 35%;
            margin-top: 50px;
            @media only screen and (max-width:1120px) {
                width: 60%;
            }
            @media only screen and (max-width:680px) {
                width: 90%;
            }
            .popup{
                position: absolute;
                top: 20px;
                left: 30%;

                width: 334px;
                padding: 25px 24px;
                background: #F4F4F4;
                border: 1px solid #1BD19C;
                border-radius: 7px;
                @media only screen and (max-width:1320px) {
                    width:250px;
                }
                @media only screen and (max-width:1120px) {
                    width: 334px;
                }
                @media only screen and (max-width:680px) {
                    width: 250px;
                }
                @media only screen and (max-width:480px) {
                    left: 15%;
                    top: 40px;
                }
                .popup-header{
                    display: flex;
                    align-items: center;
                    margin-bottom: 17px;
                    .icon{
                        width: 50px; 
                        margin-right: 18px;
                    }
                    .title{
                        font-weight: 600;
                        font-size: 28px;
                        color: #070E0C;
                    }
                }
                .sub-heading{
                    font-weight: 600;
                    font-size: 16px;
                    color: #838383;
                    margin-bottom: 8px;
                }
                .value{
                    font-weight: 600;
                    font-size: 22px;
                    color: #070E0C;
                }
            }
            .popup-night{
                background: #02140F;
                .popup-header{
                    .title{
                        color: #E0E0E0;
                    }
                }
                .sub-heading{
                    color: #838383;
                }
                .value{
                    color: #E0E0E0;
                }
            }
        }
    }
    .main-night{
        .tokens{
            table{
                tr{
                    border-bottom: solid thin rgba(255, 255, 255, 0.2);
                    th{
                        color: #ADADAD;
                    }
                    .tokenTitle{
                        color: #fff;
                    }
                    .tokenValue{
                        color: #fff;
                    }
                }
                .showBtn{
                    color: #fff;
                }
            }            
        }
    }

</style>