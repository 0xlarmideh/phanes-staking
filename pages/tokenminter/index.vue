<template>
  <div>
    <div class="tokenMinter" :class="nightMode ? 'tokenMinter-night' : ''">
      <img src="@/assets/tokenMinterbg.png" alt="" class="tokenMinterbg" />
      <div class="row">
        <div class="wrapper">
          <h2 class="tokenMinter-heading">Mint your token in few easy steps</h2>
          <p class="snippets">
            Welcome to the Token Minter! With this tool, you can create your own
            custom tokens easily. Simply follow the steps below to mint your
            token.
          </p>
          <form>
            <label for="tokenName">
              <h3 class="title">Token Name</h3>
              <input type="text" id="tokenName" placeholder="e.g PhanesSwap" />
            </label>
            <label for="tokenSymbol">
              <h3 class="title">Token Symbol</h3>
              <input type="text" id="tokenSymbol" placeholder="e.g SWAP" />
            </label>
            <label for="totalSupply">
              <h3 class="title">Total Supply</h3>
              <input
                type="number"
                id="totalSupply"
                placeholder="e.g 100 Tokens"
              />
            </label>
            <label for="deciamls">
              <h3 class="title">Decimals</h3>
              <input
                  type="number"
                  id="deciamls"
                  placeholder="recommended 18"
                />
            </label>

            <div href="#" class="newToken" @click="toggleMintTokenPopup(true)">
              Mint a new Token
            </div>
                          <div class="black-box-reference">
                
                <div class="black-box">
                  <div>
                    <div>
                      <h3>Phanes Token Minter (PMNT)</h3>
                      <br />
                      <p>
                        Create your own fully PRC-20 compliant token in a few
                        minutes using PMNT. Creating digital assets (tokens)
                        shouldn't be a headache, this is why we have added
                        zero-code token minting to create your own token in a
                        few simple steps.
                      </p>
                      <br />
                      <p>PMNT Token Features</p>
                      <p>
                        ✅ No hidden mint function <br />
                        ✅ No owner / admin functions<br />
                        ✅ Verified and authenticated code of the token contract
                        itself<br />
                        ✅ Fully PRC-20 compliant<br />
                        ✅ Fully decentralised<br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MinterABI from "@/assets/abi/MinterABI.json"; // Path to the Minter contract ABI JSON file

export default {
  name: "TokenMinterView",
  computed: {
    ...mapState(["nightMode", "walletAddress", "web3", "showMintTokenPopup"]),
  },
  data() {
    return {
      tokenName: "",
      tokenSymbol: "",
      totalSupply: "",
      decimals: 18,
    };
  },

  methods: {
    ...mapMutations(["toggleMintTokenPopup"]),
    async mintToken() {
      if (this.isConnected) {
        // Load the contract
        const contractData = MinterABI.networks[networkId];
        this.contract = new this.web3.eth.Contract(
          MinterABI.abi,
          contractData.address
        );
        try {
          const result = await contract.methods
            .createToken(
              this.tokenName,
              this.tokenSymbol,
              this.totalSupply,
              this.decimals
            )
            .send({ from: walletAddress });

          // Handle the result
          console.log(
            "Token created:",
            result.events.TokenCreated.returnValues.token
          );
        } catch (error) {
          console.error("Error creating token:", error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.black-box-reference {
  position: relative;
}
.black-box {
  position: absolute;
  right: -700px;
  bottom: 0px;
  margin-bottom: 74px;
  padding: 0px 20px;
  @media screen and (max-width: 1400px) {
    position: relative;
    right: -0px;
    padding: 0;
    // width: '100%'
  }
  div {
    background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
    min-height: calc(2*32px + 4*83px - 32px);
    max-width: 700px;
    margin: 0px 50px;
    border-radius: 20px;
    color: white;
    padding: 36px;
    // font-family: monospace;
    font-size: 17px;
    @media screen and (max-width: 1400px) {
      margin: 30px 0px;
    width: 590px;

      // width: 100%;
      padding: 20px;
    
      
    }
    div {
      padding: 0;
      margin: 0;
      max-width: 100%;
      max-height: fit-content;
      h3 {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
      }
      p {
        margin-bottom: 5px;
      }
    }
  }
}
.tokenMinter {
  min-height: 882px;
  position: relative;
  min-height: calc(100vh - 180px);
  .tokenMinterbg {
    width: 60%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.5;
    @media only screen and (max-width: 640px) {
      width: 80%;
      opacity: 0.3;
    }
  }
}
.tokenMinter-night {
  background: #070e0c;
  backdrop-filter: blur(20px);
  min-height: calc(100vh - 150px);
  .wrapper {
    .tokenMinter-heading {
      color: #fff;
    }
    .snippets {
      color: #9f9f9f;
    }
    form {
      label {
        .title {
          color: #fff;
        }
        input[type="number"],
        input[type="text"] {
          color: #cecece;
        }
      }
    }
  }
}
.wrapper {
  width: 50%;
  padding: 40px 0 80px 0;
  @media only screen and (max-width: 640px) {
    width: 90%;
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
  }
  .tokenMinter-heading {
    font-weight: 700;
    font-size: 32px;
    color: #070e0c;
    margin-bottom: 20px;
  }
  .snippets {
    font-weight: 500;
    font-size: 18px;
    color: #686868;
    margin-bottom: 24px;
  }

  form {
    label {
      .title {
        font-weight: 600;
        font-size: 22px;
        color: #070e0c;
        margin-bottom: 12px;
        
      }
      input[type="number"],
      input[type="text"] {
        width: 594px;
        height: 51px;
        border: 1px solid #1bd19c;
        border-radius: 7px;
        background: transparent;
        color: #131a18;
        font-style: italic;
        font-weight: 500;
        font-size: 16px;
        padding: 16px 15px;
        margin-bottom: 32px;
        @media only screen and (max-width: 640px) {
          width: 100%;
        }
        &:focus {
          outline: 1px solid #1bd19c;
        }
      }
    }
    .newToken {
      width: 594px;
      padding: 15px;
      text-align: center;
      // height: 44px;
      background: linear-gradient(95.34deg, #09976e -21.44%, #084f65 108.23%);
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      line-height: 18px;
      color: #ffffff;
      border: none;
      cursor: pointer;
      @media only screen and (max-width: 640px) {
        width: 100%;
      }
      transition: background-color 0.6s;
      &:hover {
        background: #09976e;
      }
    }
  }
}
</style>
