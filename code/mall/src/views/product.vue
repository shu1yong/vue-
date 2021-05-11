<template>
    <div id="product">
     <van-nav-bar
        title="商品"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img class="swiperimg" v-lazy="image.img_url" />
        </van-swipe-item>
        </van-swipe>
        <div class="info">
            <span>30天无忧退货</span>
            <span>48小时快速退款</span>
            <span>满88元免邮费</span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['id'],
    data(){
        return {
            data:{}
        }
    },
    computed:{
        images:function(){
            if(this.data.gallery == undefined){
                return []
            }else{
                return this.data.gallery
            }
        }
    },
    methods:{
        onClickLeft:function(){
            this.$router.go(-1)
        }
    },
    async created(){
        let res = await axios.get(this.$root.api.GoodsDetail,{params:{id:this.id}})
        console.log(res.data)
        this.data = res.data.data
    }
}
</script>
<style lang="less" >
#product{
    .swiperimg{
        width: 100%;
    }
    .info{
        display: flex;
        justify-content: space-around;
    }
}
</style>