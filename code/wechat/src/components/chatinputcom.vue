<template>
    <div>
        <input @keydown.enter="send" v-model="inputContent" type="text">
        <button @click="send">send</button>    
    </div>    
</template>

<script>
export default {
    props:['sendEvent'],
    data(){
        return {
            inputContent:""
        }
    },
    methods:{
        send:function(){
            this.sendEvent(this.inputContent)
            this.inputContent = ''
        }
    }
}
</script>
