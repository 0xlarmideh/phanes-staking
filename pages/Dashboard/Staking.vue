<template>
  <div class="staking" :class="nightMode? 'staking-night':''">
    <div class="row">
        <div class="filterbar" :class="nightMode? 'filterbar-night':''">
            <div class="leftFilter" @click="toggleStakingPopup(true)">
                <img :src="require(`@/assets/${selectedStakingCurrency.icon}`)" alt="" class="icon">
                <p class="title">{{selectedStakingCurrency.title}}</p>
                <img src="@/assets/dropdownIcon.png" alt="" class="dropdownIcon">
            </div>
            <div class="sortWrapper">
                <div class="sortButton" @click="showSortPopup=!showSortPopup">
                    Sort By <img src="@/assets/sort-night.png" alt="">
                </div>
                <ul class="sortPopup" :class="showSortPopup? '':'hideSortPopup'">
                    <li class="sortItem">APR</li>
                    <li class="sortItem">Next In</li>
                    <li class="sortItem">Amount</li>
                </ul>
            </div>
        </div>

        <div class="cards">
            <div class="card" v-for="(card, index) in cards" :key="index">
                <div class="card-header">
                    <div class="title-wrapper">
                        <h3 class="title">{{card.heading}}</h3>
                        <p class="snippet">{{card.snippet}}</p>
                    </div>
                    <div class="favoriteIcon" @click="card.favourite=!card.favourite"> 
                        <img src="@/assets/favourite-red.png" alt="" class="icon" v-if="card.favourite">
                        <img src="@/assets/favourite.png" alt="" class="icon" v-else>
                    </div>
                </div>
                <div class="column-wrapper">
                    <div class="col">
                        <h4 class="title">APY</h4>
                        <p class="value">{{card.apy}}%</p>
                    </div>
                    <div class="col">
                        <h4 class="title">Max Multiplier</h4>
                        <p class="value">{{card.maxMultiplier}}</p>
                    </div>
                    <div class="col">
                        <h4 class="title">duration</h4>
                        <p class="value">{{card.duration}}</p>
                    </div>
                    <div class="col">
                        <h4 class="title">total Rewards</h4>
                        <p class="value">${{card.totalRewards}}</p>
                    </div>
                    <div class="col">
                        <h4 class="title">total Subscribed</h4>
                        <p class="value">${{card.totalSubscribed}}</p>
                    </div>
                    <div class="subscriberBtn">subscribe</div>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    data(){
        return{
            showSortPopup:false,
            favourite:false,
            cards:[
                { heading:'Matter V1', snippet:'Material Network | MTRL-WETH LP', apy:43.9, maxMultiplier:'2x over 30d', duration:'14d left', totalRewards:3154, totalSubscribed:11808, favourite:false },
                { heading:'Matter V1', snippet:'Material Network | MTRL-WETH LP', apy:43.9, maxMultiplier:'2x over 30d', duration:'14d left', totalRewards:3154, totalSubscribed:11808, favourite:false },
                { heading:'Matter V1', snippet:'Material Network | MTRL-WETH LP', apy:43.9, maxMultiplier:'2x over 30d', duration:'14d left', totalRewards:3154, totalSubscribed:11808, favourite:false },
                { heading:'Matter V1', snippet:'Material Network | MTRL-WETH LP', apy:43.9, maxMultiplier:'2x over 30d', duration:'14d left', totalRewards:3154, totalSubscribed:11808, favourite:false },
            ]
        }
    },
    computed:{
        ...mapState([
            'nightMode',
            'selectedStakingCurrency'
        ])
    },
    methods:{
        ...mapMutations([
            'toggleStakingPopup'
        ])
    }

}
</script>

<style lang="scss" scoped> 
.staking{

}
.staking-night{
    background: #070E0C;
    backdrop-filter: blur(20px);
    .cards{
        .card{
            .card-header{
                .title-wrapper{
                    .title{
                        color: #fff;
                    }
                    .snippet{
                        color: #CACACA;
                    }
                }
            }
            .column-wrapper{
                .col{
                    .title{
                        color: #A5A5A5;
                    }
                    .value{
                    color: #fff;
                    }
                }
            }
        }
    }

}
.filterbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;

    .leftFilter{
        width: 200px;
        height: 53px;
        border: 1px solid #070E0C;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media only screen and (max-width:980px){
            height: min-content;
            padding: 5px 15px;            
            width: 150px;
        }
        cursor: pointer;
        .icon{
            height: 25px;
            margin-right: 15px;
            @media only screen and (max-width:980px){
                height: 20px;
                margin-right: 10px;
            }
        }
        .title{
            font-weight: 600;
            font-size: 18px;
            line-height: 16px;
            color:#070E0C;
            margin-right: 5px;
            text-transform: uppercase;
            @media only screen and (max-width:980px){
                font-weight: 500;
                font-size: 14px;
            }
        }
        .dropdownIcon{
            width: 7px;
        }
    }
    .sortWrapper{
            position: relative;
            .sortPopup{
                opacity: 1;
                width: 100%;
                position: absolute;
                top: 50px;
                z-index: 999;
                background-color: #fff;
                list-style: none;
                padding: 25px 0px;
                border-radius: 20px;
                color: #09976E;
                border: 1px solid #09976E;
                transition: all .2s;
                .sortItem{
                    padding: 0 30px;
                    font-weight: 600;
                    &:hover{
                        cursor: pointer;
                        background: rgb(134, 134, 134);
                        color: #1BD19C;
                    }
                }
              }
              .hideSortPopup{
                opacity: 0;
                z-index: -2;
              }
          }
        .sortWrapper-night{
            .sortPopup{
                background: #2a302e;
            }
            .sortButton{
                border: 1px solid #C5C5C5;
                color: #C5C5C5;           
            }
        }
        .sortButton{
            width: 166px;
            height: 42px;
            border: 1px solid #070E0C;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 18px;
            color: #070E0C;
            cursor: pointer;
            @media only screen and (max-width:980px){
                width: 120px;
                height: 30px;
                font-size: 14px;
            }
            img{
                width: 26px;
                margin-left: 17px;
                @media only screen and (max-width:980px){
                    width: 16px;
                    margin-left: 10px;
                }
            }
        }

}
.filterbar-night{
    .leftFilter{
        border: 1px solid #C5C5C5;
        .title{
            color: #C5C5C5;           
        }
    }
    .sortWrapper{
        .sortPopup{
            background: #2a302e;
        }
        .sortButton{
            border: 1px solid #C5C5C5;
            color: #C5C5C5;           
        }
    }
}

.cards{
    padding: 40px 0;
    .card{
        width: 100%;
        padding: 36px;
        background: linear-gradient(95.34deg, rgba(9, 151, 110, 0.1) -21.44%, rgba(8, 79, 101, 0.1) 108.23%);
        border-radius: 8px;
        margin-bottom: 40px;
        @media only screen and (max-width:420px){
            padding: 20px;
        }

        .card-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title-wrapper{
                @media only screen and (max-width:420px){
                    width: 60%;
                }
                .title{
                    font-weight: 700;
                    font-size: 20px;
                    color: #070E0C;
                    margin-bottom: 8px;
                }
                .snippet{
                    font-weight: 500;
                    font-size: 16px;
                    color: #505050;
                    margin-bottom: 35px;
                }
            }
            .favoriteIcon{
                cursor: pointer;
                .icon{
                    width: 25px;
                }
            }
        }
        .column-wrapper{
            display: flex;
            align-items: center;
            justify-content: space-between;
            @media only screen and (max-width:980px){
                flex-direction: column;
            }
            .col{
                @media only screen and (max-width:980px){
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                .title{
                    font-weight: 500;
                    font-size: 20px;
                    color: #505050;
                    margin-bottom: 10px;
                    @media only screen and (max-width:980px){
                        flex-direction: column;
                        margin-bottom: 0px;
                    }
                }
                .value{
                    font-weight: 500;
                    font-size: 20px;
                    color: #070E0C;
                }
            }

            .subscriberBtn{
                width: 159px;
                height: 44px;
                background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 18px;
                color: #FFFFFF;
                cursor: pointer;
                text-transform: capitalize;
                @media only screen and (max-width:980px){
                    margin-top: 20px;
                }
                &:hover{
                    background: #09976E;
                }
            }
        }
    }
}

</style>