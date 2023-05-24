<template>
  <div class="multisender" :class="nightMode? 'multisender-night':''">
    <div class="row">
        <div class="address">
            <div class="send">
                <p class="text">send</p>
                <div class="token">
                    <p class="token-item" @click="activeToken=false" :class="activeToken?'':'active-token'">eth</p>
                    <p class="token-item" @click="activeToken=true" :class="activeToken?'active-token':''">token</p>
                </div>
            </div>
            <div class="inputToken" v-if="activeToken">
                <input type="text" placeholder=" Input Token Contract  Address">
                <button class="load">Load</button>
            </div>
        </div>
        <div class="recipients">
            <h3>Recipients and amount</h3>
            <p>Enter one address and amount in <span v-if="activeToken">Token</span><span v-else>ETH</span> on each line. Supports any format</p>
            <textarea name="" id="addresses" cols="30" rows="10" placeholder="0xc731159C350d6B0590DBA419F1FF7F726251912d 2.1543
0xE32cC3Eb8beD62C33b3f2095854aa5A2c8aD879A,4.1543
0x2e5cC3Eb8beD62C33b3f2095854aa5A2c8aD834d=10.2345"></textarea>
            <button class="confirmBtn" @click="confirmData">Confirm</button>
            <div class="confirmData" v-if="addresses.length>0">
                <h3 class="main-title">Confirm the above information before sending.</h3>
                <ul class="details">
                    <li class="item">
                        <p class="item-heading">Address</p>
                        <p class="item-heading">Amount</p>
                    </li>
                    <li class="item" v-for="(item,index) in addresses" :key="index">
                        <p class="address">{{item.address}}</p>
                        <hr class="h-line">
                        <p class="amount">{{item.amount}}ETH</p>
                    </li>
                    <li class="item">
                        <p class="title">Total</p>
                        <p class="amount">0.02ETH</p>
                    </li>
                    <li class="item">
                        <p class="title">Your balance</p>
                        <p class="amount">0.01276546455er2ETH</p>
                    </li>
                    <li class="item">
                        <p class="title">Remaining</p>
                        <p class="amount">0.0.01276546455er2ETH</p>
                    </li>


                </ul>
            </div>
            <p class="inspiredText">Inspired by <a href="" target="_blank">Disperse.app</a></p>
            <button class="sendBtn" v-if="addresses.length>0">Send</button>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
export default {
    data(){
        return{
            activeToken:false,
            addresses:[]
        }
    },
    computed:{
        ...mapState([
            'nightMode'
        ])
    },
    methods:{
        confirmData(){
            if(this.addresses.length<=0){
                alert('Enter Adresses to sent')
            }
        }
    },
    mounted(){
        const addressInput = document.getElementById('addresses')
        addressInput.addEventListener('change',(e)=>{
            const arr =  e.target.value.split('\n')
            const addressList = []
            for(let i=0; i<arr.length; i++){
                if(arr[i].includes(' ')){
                    let temp = arr[i].split(' ')
                    if(temp.length==2){
                        addressList.push({address:temp[0], amount:temp[1]})
                    }else{
                        console.log('invalid address1');
                    }
                }else if(arr[i].includes(',')){
                    let temp = arr[i].split(',')
                    if(temp.length==2){
                        addressList.push({address:temp[0], amount:temp[1]})
                    }else{
                        console.log('invalid address2');
                    }
                }else if(arr[i].includes('=')){
                    let temp = arr[i].split('=')
                    if(temp.length==2){
                        addressList.push({address:temp[0], amount:temp[1]})
                    }else{
                        console.log('invalid address3');
                    }
                }    
            }
            this.addresses = addressList
        })
    }

}
</script>

<style lang="scss" scoped>
    .multisender{
        padding: 90px 0;
        .address{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 20px;
            @media only screen and (max-width:580px){
                flex-direction: column;
            }
            .send{
                display: flex;
                align-items: center;
                @media only screen and (max-width:580px){
                    margin-bottom: 20px;
                }
                .text{
                    font-weight: 600;
                    font-size: 20px;
                    color: #070E0C;
                    margin-right: 15px;
                    text-transform: capitalize;
                }
                .token{
                    display: flex;
                    align-items: center;
                    border-radius: 8px;
                    border: 1px solid #095C67;
                    overflow: hidden;
                    p{  
                        width: 80px;
                        text-align: center;
                        padding: 14px 10px;
                        text-transform: uppercase;
                        font-weight: 600;
                        font-size: 16px;
                        color: #070E0C;
                        @media only screen and (max-width:680px){
                            padding: 5px 10px;
                        }
                        &:hover{
                            cursor: pointer;
                            background: linear-gradient(180deg, #095866 0%, #09856C 100%);
                            color: #fff;
                        }
                    }
                    .active-token{
                        background: linear-gradient(180deg, #095866 0%, #09856C 100%);
                        color: #fff;
                    }
                }
            }
            .inputToken{
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                @media only screen and (max-width:800px){
                    width: 50%;
                }
                @media only screen and (max-width:580px){
                    width: 100%;
                }
                input[type='text']{
                    width: 483px;
                    height: 42px;
                    border: 1px solid #070E0C;
                    border-radius: 60px;
                    background: transparent;
                    font-style: italic;
                    font-weight: 500;
                    font-size: 18px;
                    color: #676767;
                    padding: 10px 30px;
                    margin-bottom: 12px;
                    @media only screen and (max-width:800px){
                        width: 100%;
                    }
                    @media only screen and (max-width:580px){
                        height: 32px;
                        font-size: 14px;
                    }
                    &:focus{
                        border: 1px solid #09976E;
                        outline: 1px solid #09976E;
                    }
                }
                .load{
                    width: 96px;
                    height: 40px;
                    background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 18px;
                    color: #FFFFFF;
                    border: none;
                    &:hover{
                        background:#09976E;
                        cursor: pointer;
                    }
                }
            }
        }
        .recipients{
            display: flex;
            flex-direction: column;

            h3{
                font-weight: 600;
                font-size: 20px;
                color: #000000;
                margin-bottom: 12px;
            }
            p{
                font-weight: 400;
                font-size: 14px;
                line-height: 16px;
                color: rgba(0, 0, 0, 0.5);
                margin-bottom: 35px;
            }
            textarea{
                width: 100%;
                max-width: 100%;
                min-height: 300px;
                padding: 40px 35px;
                font-weight: 500;
                font-size: 20px;
                color: rgba(73, 73, 73, 1);
                background: linear-gradient(95.34deg, rgba(9, 151, 110, 0.1) -21.44%, rgba(8, 79, 101, 0.1) 108.23%);
                border-radius: 8px;
                border: none;
                margin-bottom: 40px;
                line-height: 25px;
                @media only screen and (max-width:480px){
                    padding: 20px 15px;
                    min-height: 400px;
                }
                &:focus{
                    outline: 1px solid #09976E;
                    border: 1px solid #09976E;
                }
            }
            .confirmBtn{
                align-self: flex-end;
                width: 120px;
                height: 40px;
                background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                border-radius: 8px;
                font-weight: 700;
                font-size: 18px;
                color: #FFFFFF;
                border: none;
                margin-bottom: 10px;
                &:hover{
                    background:#09976E;
                    cursor: pointer;
                }
            }
            .confirmData{
                width: 100%;
                padding: 37px 42px;
                background: linear-gradient(180deg, #085B66 0%, #09856B 100%);
                margin-bottom: 14px;
                @media only screen and (max-width:480px){
                    padding: 15px;
                }
                .main-title{
                    font-weight: 500;
                    font-size: 24px;
                    color: #FFFFFF;
                    border-bottom: 3px solid rgba(255, 255, 255, 0.5);
                    padding-bottom: 17px;
                    margin-bottom: 40px;
                    @media only screen and (max-width:480px){
                        font-size: 20px;
                        margin-bottom: 20px;
                    }
                }
                .details{
                    width: 100%;
                    list-style: none;
                    .item{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .item-heading{
                            font-weight: 600;
                            font-size: 24px;
                            color: #FFFFFF;
                            @media only screen and (max-width:800px){
                                font-size: 20px;
                            }
                        }
                        
                        .h-line{
                            min-width: 20px;
                            width: 100%;
                            height: 0;
                            margin: 0 20px;
                            border: 1px solid #FFFFFF;
                            margin-bottom: 40px;
                            @media only screen and (max-width:660px){
                                width: 10px;
                            }
                            @media only screen and (max-width:510px){
                                display: none;
                            }
                        }
                        .title,
                        .amount,
                        .address{
                            font-weight: 500;
                            font-size: 24px;
                            color: #FFFFFF;
                            @media only screen and (max-width:1080px){
                                font-size: 18px;
                            }
                            @media only screen and (max-width:800px){
                                font-size: 14px;
                            }
                            @media only screen and (max-width:660px){
                                font-size: 12px;                                
                            }
                        }
                        .address{
                            @media only screen and (max-width:660px){
                                font-size: 10px;
                            }
                            @media only screen and (max-width:510px){
                                font-size: 8px;
                            }
                        }
                        .title{
                            font-weight: 700px;
                        }
                    }
                }

            }
            .inspiredText{
                font-style: italic;
                font-weight: 500;
                font-size: 18px;
                color: #070E0C;
                margin-bottom: 18px;
                a{
                    text-decoration: none;
                    color:#086A68;
                }
            }
            .sendBtn{
                align-self: flex-end;
                width: 96px;
                height: 40px;
                background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                border-radius: 8px;
                font-weight: 700;
                font-size: 18px;
                color: #FFFFFF;
                border: none;
                &:hover{
                    background:#09976E;
                    cursor: pointer;
                }
            }

        }
    }
    .multisender-night{
        background: #070E0C;
        backdrop-filter: blur(20px);
        .address{
            .send{
                .text{
                    color: #fff;
                }
                .token{
                    p{  
                        color: #fff;
                    }
                }
            }
            .inputToken{
                input[type='text']{
                    border: 1px solid #D3F1E9;
                    color: #D3F1E9;
                }
            }
        }
        .recipients{
            h3{
                color: #fff;
            }
            p{
                color: rgba(255, 255, 255, 0.5);
            }
            textarea{
                background: linear-gradient(95.34deg, rgba(9, 151, 110, 0.1) -21.44%, rgba(8, 79, 101, 0.1) 108.23%);
                color: rgba(255, 255, 255, 0.8);
            }
            .confirmData{
                background: linear-gradient(180deg, #085B66 0%, #09856B 100%);
            }
            .inspiredText{
                color: #fff;
            }

        }
    }


</style>