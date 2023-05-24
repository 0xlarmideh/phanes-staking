<template>
    <div class="connectWallet" :class="nightMode? 'connectWallet-night':''">
                <div class="navigation">
                    <div class="buttons">
                        <div class="btn">swap</div>
                        <div class="btn">liquidity</div>
                    </div>
                    <div class="spillage">
                        <p class="text">Slippage</p>
                        <p class="value"><input type="number" placeholder="1" v-model="sVal" @change="updateSllipageVal(sVal)">%</p>
                    </div>
                </div>
                <div class="swap-container">
<!-------------------------------------- SWAP FROM -->
                    <div class="swap swapFrom">
                        <div class="swapHeader">
                            <img :src="require(`@/assets/${currencyFrom.icon}`)" alt="" id="swapFromIcon" class="icon">
                            <div class="selectInput">
                                <p class="title">Swap From</p>
                                <div class="select" @click="togglePopup(true); setPopupType('swapFrom')">
                                    {{currencyFrom.title}}
                                    <img src="@/assets/downward-arrow-night.png" alt="" v-if="nightMode">
                                    <img src="@/assets/downward-arrow.png" alt="" v-else>
                                </div>
                                
                            </div>
                        </div>
                        <div class="inputs">
                            <div class="input firstInput">
                                <input type="number" placeholder="0.00">
                            </div>
                            <div class="input">
                                $<input type="number" placeholder="0.00">
                            </div>
    
                        </div>
    
                        <div class="balance">
                            Balance {{balance}} <button class="maxBtn">Max</button>
                        </div>
                    </div>

                    <div class="swapButton" @click="swapReverse">
                        <img src="@/assets/up-arrow.png" alt="">
                        <img src="@/assets/down-arrow.png" alt="">
                    </div>
<!-------------------------------------- SWAP TO -->
                    <div class="swap swapTo">
                        <div class="swapHeader">
                            <img :src="require(`@/assets/${currencyTo.icon}`)" alt="" id="swapFromIcon" class="icon">
                            <div class="selectInput">
                                <p class="title">Swap To</p>
                                <div class="select" @click="togglePopup(true); setPopupType('swapTo')">
                                    {{currencyTo.title}}
                                    <img src="@/assets/downward-arrow-night.png" alt="" v-if="nightMode">
                                    <img src="@/assets/downward-arrow.png" alt="" v-else>
                                </div>
                            </div>
                        </div>
                        <div class="inputs">
                            <div class="input firstInput">
                                <input type="number" placeholder="0.00">
                            </div>
                            <div class="input">
                                $<input type="number" placeholder="0.00">
                            </div>
    
                        </div>
    
                    </div>
                </div>
                <div class="connectbtn">Connect Wallet</div>
            </div>
</template>

<script>
import { mapMutations } from 'vuex';
    export default {
    data() {
        return {
            sVal: this.sllipageVal,
        };
    },
    computed: {
        nightMode(){ return this.$store.state.nightMode; },
        showPopup(){ return this.$store.state.showPopup; },
        
        sllipageVal(){ return this.$store.state.sllipageVal },
        currencies(){ return this.$store.state.currencies },
        currencyFrom(){ return this.$store.state.currencyFrom },
        currencyTo(){ return this.$store.state.currencyTo },
        balance(){ return this.$store.state.balance },
    },
    methods: {
        ...mapMutations([
            'togglePopup', 
            'updateSllipageVal', 
            'setPopupType', 
            'setCurrency'
        ]),
        swapReverse(){
            let copyCurrFrom = this.currencyFrom
            this.setCurrency({ type:'swapFrom', currency:this.currencyTo })
            this.setCurrency({ type:'swapTo', currency:copyCurrFrom })
        },
    },    
}
</script>
    

<style lang="scss" scoped>
       .connectWallet{
                width: 446px;                
                background: rgba(27, 209, 156, 0.12);
                border-radius: 7px;
                padding: 34px 20px;
                display: flex;
                flex-direction: column;
                @media only screen and (max-width:1560px) {
                    width: 100%;   
                }
               

                .navigation{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    text-transform: capitalize;
                    @media only screen and (max-width:580px) {
                        flex-direction: column;

                    }
                    .buttons{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(27, 209, 156, 0.12);
                        border-radius: 7px;
                        @media only screen and (max-width:580px) {
                            width: 100%;
                            justify-content: space-between;
                            margin-bottom: 30px;
                        }
                        &:first-child{
                            margin-right: 20px;
                        }
                        .btn{
                            font-weight: 600;
                            font-size: 16px;
                            padding: 12px 15px;
                            border-radius: 7px;
                            color: #070E0C;
                            cursor: pointer;
                            @media only screen and (max-width:580px) {
                                width: 50%;
                                text-align: center;
                            }
                            &:hover,&:active{
                                background: #1BD19C;
                                color: #000;
                            }
                        }
                    }
                    .spillage{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 50px;
                        .text{
                            font-weight: 600;
                            font-size: 16px;
                            color: #070E0C;
                            margin-right: 20px;
                        }
                        .value{
                            font-weight: 600;
                            font-size: 16px;
                            color: #070E0C;
                            border: 1px solid rgba(27, 209, 156, 0.12);
                            border-radius: 0 7px 7px 0;
                            display: flex;
                            align-items: center;
                            padding: 10px 12px;
                            input[type="number"]{
                                text-align: right;
                                width: 40px;
                                border: none;
                                outline: none;
                                font-weight: 600;
                                font-size: 16px;
                                background: transparent;
                                margin-right: 3px;
                                &::-webkit-outer-spin-button,
                                &::-webkit-inner-spin-button {
                                    -webkit-appearance: none;
                                    margin: 0;
                                }
                            }
                        }
                    }
                }
                .swap-container{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    @media only screen and (max-width:1560px) and (min-width: 1030px) {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                    }
                }
                .swap{
                    .swapHeader{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        margin-bottom: 20px;
                        .icon{
                            width: 50px;
                            margin-right: 16px;
                        }
                        .selectInput{
                            .title{
                                font-weight: 500;
                                font-size: 13px;
                                color: #333333;

                            }
                            .select{
                                display: flex;
                                align-items: center;
                                font-weight: 600;
                                font-size: 22px;
                                padding: 12px 0;
                                cursor: pointer;
                                img{
                                    width: 10px;    
                                    margin-left: 5px;
                                }                               
                            }   
                            
                        }

                    }
                    .inputs{
                        display: flex;
                        border: 1px solid #09976E;
                        border-radius: 7px;
                        width: 406px;
                        @media only screen and (max-width:580px) {
                            width: 100%;
                        }
                        .firstInput{
                            border-right: 1px solid #09976E;                      
                        }
                        .input{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            width: 50%;
                            padding: 17px 15px;
                            color: #070E0C;
                            font-weight: 700;
                           input{
                            width: 100%;
                            font-size: 18px;
                            background: transparent;
                            outline: none;
                            padding: 3px;
                            border: none;
                            &:focus{
                            }
                           }
                        }
                        input::-webkit-outer-spin-button,
                        input::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }
                    }
                }
                .balance{
                    font-weight: 500;
                    font-size: 13px;
                    color: #676D7A;
                    display: flex;
                    align-items: center;
                    margin-top: 20px;
                    .maxBtn{
                        font-weight: 600;
                        font-size: 13px;    
                        color: #09976E;
                        width: 48px;
                        height: 24px;
                        border: 1px solid #09976E;
                        background: transparent;
                        border-radius: 7px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-transform: uppercase;
                        margin-left: 12px;
                        cursor: pointer;
                        &:active,&:hover{
                            background-color: #09976E;
                            color: #fff;
                        }
                    }
                }
                .swapButton{
                    width: 64.16px;
                    height: 64.16px;
                    border-radius: 50%;
                    background: rgba(27, 209, 156, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    align-self: flex-end;
                    transform: translateY(15px);
                    cursor: pointer;
                    @media only screen and (max-width:1560px) and (min-width: 1030px) {
                        transform: translateY(0px) rotate(90deg);
                        align-self: center;                    
                    }
                    &:active,&:hover{
                        background-color: #1BD19C;
                    }
                    img{
                        height: 35px;
                    }
                }
                .connectbtn{
                    width: 100%;
                    max-width: 560px;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                    color: #ffff;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 14px 20px;
                    font-weight: 700;
                    font-size: 24px;
                    margin-top: 32px;
                    transition: all .25s;
                    @media only screen and (max-width:780px) {
                        padding: 10px 15px;
                        font-weight: 600;
                        font-size: 20px;
                        
                    }
                    &:active,&:hover{
                        background: #09976E;
                        cursor: pointer;
                    }

                }
            }
        .connectWallet-night{
            background: #071310;
            .navigation{
                .buttons{
                    .btn{
                        color: #C2C2C2; 
                    }
                }
                .spillage{
                    .text{
                        color: #fff;
                    }
                    .value{
                        background: #070E0C;
                        border: 1px solid rgba(27, 209, 156, 0.12);
                        color: #fff;
                        input[type="number"]{
                            color: #fff;
                        }
                    }
                }
            }
            .swap{
                .swapHeader{
                    .icon{
                        width: 50px;
                        margin-right: 16px;
                    }
                    .selectInput{
                        .title{
                            color: #ADADAD;
                        }
                        .select{
                            color: #fff;                           
                        }     
                    }

                }
                .inputs{
                    .input{
                        color: #ffffff; 
                        input{
                            color:#fff;
                        }
                    }
                }
            }
            .balance{
                color: #ADADAD;
                .maxBtn{
                    background: transparent;                      
                }
            }
            .swapButton{
                background: rgba(27, 209, 156, 0.15);
            }
        }

</style>