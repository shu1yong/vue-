<template>
    <van-tabbar v-model="tabActive">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='ssub' icon="medal-o">专题</van-tabbar-item>
      <van-tabbar-item to='/category' icon="qr">分类</van-tabbar-item>
      <van-tabbar-item to="/shoppcar" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
      
    </van-tabbar>
</template>
<script>
export default {
    data(){
        return {
            tabActive:0
        }
    },
    mounted(){
        switch(this.$route.path){
                case '/ssub':
                    this.tabActive = 1;
                    break;
                case "/category":
                    this.tabActive = 2;
                    break;
                case '/':
                    this.tabActive = 0;
                    break;
                default:
                    this.tabActive = 0;
            }
    },
  
}
</script>