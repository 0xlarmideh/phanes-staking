<template>
<div class="popup">        
    <button @click="togglePopup(false)" class="close">X</button>
    <h3>Currencies</h3>
    <ul class="items">
        <li class="item" v-for="(currency, index) in currencies" :key="index" @click="updateCurrency(currency)">
            <img :src="require(`@/assets/${currency.icon}`)" alt="" class="icon">
            <p class="title">{{currency.title}}</p>
        </li>
    </ul>
</div>

</template>

<script>
    import { mapMutations } from 'vuex';

export default {    
    computed:{
        currencies(){ return this.$store.state.currencies },
        popupType(){ return this.$store.state.popupType }
    },
    methods:{
        ...mapMutations([
            'togglePopup',
            'setCurrency'
        ]),
        updateCurrency(currency){
            this.setCurrency({
                type: this.popupType,
                currency: currency
            })
            this.togglePopup(false)
        }
    }
}
</script>

<style lang="scss" scoped>


.popup{
    background: rgba(7, 14, 12, 0.85);
    backdrop-filter: blur(20px);
    border: 2px solid #1BD19C;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    // padding: 20px 40px;
    padding: 40px 30px;
    width: 100%;
    max-width: 460px;
    max-height: 450px;
    border-radius: 20px;
    button{
        background: #1BD19C;
        color: #000;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-weight: bold;

    }
    h3{
        color: #fff;
        text-align: center;
        margin-bottom: 15px;
    }

    .close{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .items{

        .item{
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 10px;
            &:hover{
                background-color: rgba(255, 255, 255, 0.075);
                padding: 5px;
                border-radius: 10px;
                cursor: pointer;
            }
            img{
                height: 30px;
                margin-right: 50px;
            }
            .title{
                font-size: 16px;
                color: #fff;
            }

        }
    }
}

</style>