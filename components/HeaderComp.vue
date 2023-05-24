<script>
import LineChart from "./LineChart.vue";
import ConnecWallet from "./ConnecWallet.vue";
export default {
    data() {
        return {
            val1: 1.79,
            val2: 8.06,
            val3: 9.74,
            startingDate: new Date(),
            endingDate: new Date(),
            stats: [
                { title: "Market Cap", value: 3336000000 },
                { title: "Volume (24hrs)", value: 58501000 },
                { title: "Current Supply", value: 372144.2 },
                { title: "Streaming Fee", value: 0.95 },
                { title: "Mint Fee", value: 'N/A' },
                { title: "Redeem Fee", value: 'N/A' },
                { title: "NAV", value: 90.11 },
            ],
        };
    },
    computed:{        
        nightMode(){
            return this.$store.state.nightMode
        },
        marketCap(){
            let val = this.stats[0].value
            let str = ''
            val = Math.round((val + Number.EPSILON) * 100) / 100; //Round off to two decimal place
            if(val>1000000000){
                str = (Math.round((val/1000000000 + Number.EPSILON) * 100) / 100)+'B'
            }else if(val>1000000){                
                str = (Math.round((val/1000000 + Number.EPSILON) * 100) / 100)+'M'
            }else if(val>1000){
                str = (Math.round((val/1000 + Number.EPSILON) * 100) / 100)+'K'
            }else{
                str = val
            }
            return str
        },
        volume(){
            let val = this.stats[1].value
            let str = ''
            val = Math.round((val + Number.EPSILON) * 100) / 100; //Round off to two decimal place
            if(val>1000000000){
                str = (Math.round((val/1000000000 + Number.EPSILON) * 100) / 100)+'B'
            }else if(val>1000000){                
                str = (Math.round((val/1000000 + Number.EPSILON) * 100) / 100)+'M'
            }else if(val>1000){
                str = (Math.round((val/1000 + Number.EPSILON) * 100) / 100)+'K'
            }else{
                str = val
            }
            return str
        },
        currentSupply(){
            let str = this.stats[2].value.toString()
            let decimals= ''
            let sub_str = ''
            if(str.length>3){
                let arr = str.split('')
                let index = -1
                index = arr.findIndex((el)=>el==='.')
                if(index>-1){
                    sub_str = str.substring(-1,index)
                    decimals = str.substring(index)
                }
                sub_str =sub_str.split('').reverse()
                let temp= ''
                let j=0;
                for(let i=0; i<sub_str.length; i++){
                    if(j==3){
                        temp += ',';  
                        j=0
                    }
                    temp += sub_str[i];  
                    j++;
                }
                let finalStr=''
                for(let k=temp.length-1; k>=0; k--){
                    finalStr += temp[k]
                }
                str = finalStr + decimals   
            }
            return str
        }
    },
    components: { LineChart, ConnecWallet }
}
</script>

<template>
  <header class="header" :class="nightMode? 'header-night':''">
    <div class="wrapper row">
        <div class="content">
            <div class="left">
                <div class="dashboard-heading" :class="nightMode? 'dashboard-heading-night':''">
                    <img src="@/assets/dpi.png" alt="">
                    <h1>dpi</h1>
                    <p>(DeFi Pulse Index)</p>
                </div>
                <div class="date" :class="nightMode? 'date-night':''">
                    <div class="filter">
                        <p class="filter-item">1D</p>
                        <p class="filter-item">1W</p>
                        <p class="filter-item">1M</p>
                        <p class="filter-item">1Y</p>
                        <p class="filter-item">All</p>
                    </div>
                    <div class="range">
                        <div class="starting">
                            <input type="date" v-model="startingDate">
                        </div>
                        <span>to</span>
                        <div class="ending">
                            <input type="date" v-model="endingDate">
                        </div>
                    </div>
                </div>
    
            </div>
            <div class="right">
                <p class="firstval">${{val1}}</p>
                <p class="secondVal">
                    <span v-show="val2>0">+</span>${{val2}} (<span v-show="val3>0">+</span>{{val3}}%)
                </p>
            </div>
        </div>

        <div class="graph-container row">
            <div class="chart-container">
                <LineChart/>
            </div>
            <div class="wallet-container">
                <ConnecWallet/>
            </div>
         </div>
         
        </div>
        <div class="stats" :class="nightMode? 'stats-night':''">
            <!-- <img class="bg" src="@/assets/stats-bg.png" alt=""> -->
            <div class="row">
                <h2>stats</h2>
                <ul class="items">
                    <li class="item">
                        <p class="title">{{stats[0].title}}</p>
                        <p class="value">${{marketCap}}</p>
                    </li>
                    <li class="item">
                        <p class="title">{{stats[1].title}}</p>
                        <p class="value">${{volume}}</p>
                    </li>
                    <li class="item">
                        <p class="title">{{stats[2].title}}</p>
                        <p class="value">{{currentSupply}}</p>
                    </li>
                    <li class="item">
                        <p class="title">{{stats[3].title}}</p>
                        <p class="value">{{stats[3].value}}%</p>
                    </li>
                    <li class="item">
                        <p class="title">{{stats[4].title}}</p>
                        <p class="value">{{stats[4].value}}</p>
                    </li>
                    <li class="item">
                        <p class="title">{{stats[5].title}}</p>
                        <p class="value">{{stats[5].value}}</p>
                    </li>
                    <li class="item">
                        <p class="title">{{stats[6].title}}</p>
                        <p class="value">${{stats[6].value}}</p>
                    </li>
                </ul>
            </div>
        </div>

  </header>
</template>
<style lang="scss" scoped>
    .header{
        width: 100%;
        position: relative;
        padding-bottom: 48px;
        .stats{
            background-image: linear-gradient(rgba(27, 209, 156, 0.7), rgba(27, 209, 156, 0.7)), url('@/assets/stats-bg.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
  

                width: 100%;
                margin-bottom: 30px;
                @media only screen and (min-width:1560px) {
                    padding: 54px 100px;
                }
                h2{
                    position: relative;
                    z-index: 2;
                    font-weight: 700;
                    font-size: 48px;
                    color: #070E0C;
                    text-transform: capitalize;
                    padding: 14px;
                    @media only screen and (max-width:1560px) {
                        font-size: 30px;
                    }
                    @media only screen and (max-width:780px) {
                        font-weight: 500;
                    }
                }
                .items{
                    position: relative;
                    z-index: 2;
                    list-style: none;
                    width: 210px;
                    border-radius: 0px 0px 7px 7px;
                    padding-bottom: 36px;                    
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    @media only screen and (max-width:560px) {
                        display: grid;
                        grid-template-columns: repeat(2,1fr);
                        justify-items: center;
                    }
                    .item{
                        padding: 36px 16px;
                        padding-bottom: 0;
                        color: #000000;
                        font-weight: 500;
                        @media only screen and (max-width:580px) {
                            padding: 20px;
                        }
                        .title{
                            font-weight: 500;
                            font-size: 20px;
                            color: #1C1C1C;
                            margin-bottom: 23px;
                            @media only screen and (max-width:780px) {
                                font-size: 16px;
                                font-weight: 700;
                            }
                            @media only screen and (max-width:580px) {
                                margin-bottom: 10px;
                                width: max-content;
                            }
                        }
                        .value{
                            font-weight: 700;
                            font-size: 42px;
                            color: #070E0C;
                            font-size: 36px;
                            @media only screen and (max-width:780px) {
                                font-size: 28px;
                            }
                            @media only screen and (max-width:580px) {
                                font-size: 22px;
                            }
                        }

                    }
                }

            }
        .stats-night{
            background-image: linear-gradient(rgba(2, 10, 8, 0.75), rgba(2, 10, 8, 0.75)), url('@/assets/stats-bg.png');
        
            h2{
                color: #E0E0E0;
            }
            .items{
                .item{
                    .title{
                        color: #B6B6B6;
                    }
                    .value{
                        color: #E0E0E0;
                    }
                }
            }
        }
    }
   
    .wrapper{
        
        .content{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 80px 0;
            @media only screen and (max-width:980px) {
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
            }
            .left{
                .dashboard-heading{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 40px;
                    text-transform: uppercase;
                    img{
                        width: 48px;
                        margin-right: 15px;
                    }
                    h1{
                        font-weight: 600;
                        font-size: 48px;
                        margin-right: 22px;
                        color:#070E0C;
                        @media only screen and (max-width:400px) {
                            font-size: 40px;
                        }
                    }
                    p{
                        font-weight: 500;
                        font-size: 28px;
                        color:#070E0C;
                        @media only screen and (max-width:400px) {
                            font-size: 20px;
                        }
                    }
                }
                .dashboard-heading-night{
                    color:#fff;
                    h1, p{
                        color:#fff;
                    }
                }
                .date{
                    display: flex;
                    align-items: center;
                    @media only screen and (max-width:780px) {
                        align-items: flex-start;
                        flex-direction: column;
                    }  
                    .filter{
                        display: flex;;
                        align-items: center;
                        justify-content: center;
                        border-radius: 7px;
                        background: rgba(27, 209, 156, 0.12);
                        margin-right: 28px;
                        @media only screen and (max-width:780px) {
                            margin-bottom: 30px;
                        }
                        .filter-item{
                            padding: 12px;
                            color: #383838;
                            border-radius: 7px;
                            transition: all .25s;
                            font-weight: 600;
                            font-size: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            &:active,&:hover{
                                background: #1BD19C;
                                color: #383838;
                            }
                        }
                    }
                    .range{
                        display: flex;
                        align-items: center;
                        @media only screen and (max-width:580px) {
                            align-items: flex-start;
                            flex-direction: column;
                        }
                        input[type="date"]{
                            width: max-content;
                            min-width: 140px;
                            padding: 12px 15px;
                            background: rgba(27, 209, 156, 0.12);
                            border-radius: 7px;
                            font-family: 'Poppins', sans-serif;
                            font-weight: 600;
                            font-size: 16px;
                            border: none;
                            &:focus{
                                outline: 1px solid #1BD19C;
                            }
                        }
                        input[type="date"]::-webkit-calendar-picker-indicator {
                            color: rgba(0, 0, 0, 0);
                            opacity: 1;
                            display: block;
                            background-image: url('@/assets/downward-arrow.png');
                            background-repeat: no-repeat;
                            width: 10px;
                            height: 10px;
                            border-width: thin;
                            cursor: pointer;
                        }
                        .starting {
                            margin-right: 20px;
                        }
                        span{
                            font-weight: 500;
                            font-size: 16px;
                            margin-right: 20px;
                            @media only screen and (max-width:580px) {
                                padding: 10px;
                            }
                        }
                        .ending{}
                    }
                }
                .date-night{
                    color: #C2C2C2;
                    .filter{
                        .filter-item{
                            color: #C2C2C2;
                        }
                    }
                    .range{
                        input[type="date"]{
                            color: #C2C2C2;
                        }
                        input[type="date"]::-webkit-calendar-picker-indicator {
                            background-image: url('@/assets/downward-arrow-night.png');
                        }
                    }
                }
            }
            .right{
                text-align: right;
                @media only screen and (max-width:980px) {
                   margin-right: 0;
                   text-align: left;
                   display: flex;
                   align-items: center;
                   margin-top: 40px;
                }
                .firstval{
                    font-weight: 600;
                    font-size: 48px;
                    color: #09976E;
                    margin-bottom: 32px;
                    @media only screen and (max-width:1560px) {
                        margin-bottom: 0;
                        margin-right: 15px;
                    }
                    @media only screen and (max-width:580px) {
                        font-size: 36px;
                    }
                }
                .secondVal{
                    font-weight: 600;
                    font-size: 28px;
                    color: #1DA976;
                    @media only screen and (max-width:580px) {
                        font-size: 20px;
                    }
                }
            }
        }
        .graph-container{
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding-bottom: 100px;
            @media only screen and (max-width:1560px) {
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
            }

           
            
            .chart-container{
                
                height: 600px;
                width: 876px;
                margin: 0 50px;
                align-self: center;
                padding-left: 20px; 
                @media only screen and (max-width:1560px) {
                    width: 100%;
                    margin: 0 10px;
                    margin-bottom: 30px;
                    border-left: none;
                    padding-left: 0px; 
                }
            }
            .wallet-container{
                width: 100%;
                max-width: 446px;
                @media only screen and (max-width:1560px) {
                    max-width: 100%;   
                }
            }
            
         
        }
    }
    .header-night{
        .graph-container{
            border:none;
        }   
    }

</style>