<template>
    <div id="ssub"> 
        <h1>专题页</h1>
        <tab-btn></tab-btn>
    </div>
</template>
<script>
import tabBtn from '@/components/tabBtn.vue'
export default {
    data(){
        return{
            tabActive:0
        }
    },
    components:{
        tabBtn
    }
    }
</script>