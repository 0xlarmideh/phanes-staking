<template>
  <div class="tokenMinter" :class="nightMode? 'tokenMinter-night':''">
    <img src="@/assets/tokenMinterbg.png" alt="" class="tokenMinterbg">
    <div class="row">
        <div class="wrapper">
            <h2 class="tokenMinter-heading">Mint your token in few easy steps</h2>
            <p class="snippets">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu, eros, vitae amet faucibus bibendum. A venenatis velit tellus nunc, ultricies. Nec tortor facilisi tempus eget commodo varius. Adipiscing tempus nec eu accumsan tortor. Nunc velit ridiculus egestas est est donec tristique. </p>
            <form>
                <label for="tokenName">
                    <h3 class="title">Token Name</h3>
                    <input type="text" id="tokenName" placeholder="e.g PhanesSwap">
                </label>
                <label for="tokenSymbol">
                    <h3 class="title">Token Symbol</h3>
                    <input type="text" id="tokenSymbol" placeholder="e.g SWAP">
                </label>
                <label for="totalSupply">
                    <h3 class="title">Total Supply</h3>
                    <input type="number" id="totalSupply" placeholder="e.g 100 Tokens">
                </label>
                <label for="deciamls">
                    <h3 class="title">Decimals</h3>
                    <input type="number" id="deciamls" placeholder="recommended 18">
                </label>

                <button class="newToken">Mint a new Token</button>

            </form>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
export default {
    name:'TokenMinterView',
    computed:{
        ...mapState([
            'nightMode'
        ])
    },

}
</script>

<style lang="scss" scoped>
    .tokenMinter{   
        min-height: 882px;
        position: relative;
        .tokenMinterbg{
            width: 60%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            opacity: .5;
            @media only screen and (max-width:640px){
                width: 80%;
                opacity: .3;
            }
        }
    }
    .tokenMinter-night{
        background: #070E0C;
        backdrop-filter: blur(20px);
        .wrapper{
            .tokenMinter-heading{
                color: #fff;
            }
            .snippets{
                color: #9F9F9F;            
            }
            form{
            label{
                .title{
                    color: #fff;                    
                }
                input[type='number'],
                input[type='text']{
                    color: #cecece;
                }
            }
        }
        
    }
    }
    .wrapper{
        width: 50%;
        padding: 40px 0 80px 0;
        @media only screen and (max-width:640px){
            width: 90%;
        }
        @media only screen and (max-width:420px){
            width: 100%;
        }
        .tokenMinter-heading{
            font-weight: 700;
            font-size: 32px;
            color: #070E0C;
            margin-bottom: 20px;
            
        }
        .snippets{
            font-weight: 500;
            font-size: 18px;
            color: #686868;
            margin-bottom: 24px;
        }

        form{
            label{
                .title{
                    font-weight: 600;
                    font-size: 22px;
                    color: #070E0C;
                    margin-bottom: 12px;
                }
                input[type='number'],
                input[type='text']{
                    width: 594px;
                    height: 51px;
                    border: 1px solid #1BD19C;
                    border-radius: 7px;
                    background: transparent;
                    color: #131a18;
                    font-style: italic;
                    font-weight: 500;
                    font-size: 16px;
                    padding: 16px 15px;
                    margin-bottom: 32px;
                    @media only screen and (max-width:640px){
                        width: 100%;
                    }
                    &:focus{
                        outline: 1px solid #00ca91;
                    }
                }
            }
            .newToken{
                width: 594px;
                height: 44px;
                background: linear-gradient(95.34deg, #09976E -21.44%, #084F65 108.23%);
                border-radius: 8px;
                font-weight: 700;
                font-size: 18px;
                line-height: 18px;
                color: #FFFFFF;
                border: none;
                cursor: pointer;
                @media only screen and (max-width:640px){
                    width: 100%;
                }
                transition: background-color 0.2s;
                &:hover{
                    background: #09976E;
                }
            }
        }
    }

</style>