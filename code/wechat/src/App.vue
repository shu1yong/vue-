<template>
  <div id="app">
    <!-- <h1>{{msg}}</h1> -->
    <div class="content">
         <chat-com :currentUser = "currentUser"> </chat-com>
         <userlist-com @chooseuser='toggleUser' :userlist="userlist"></userlist-com>
    </div>
  </div>
</template>

<script>
import chatCom from './components/chatcom'
import userlistCom from './components/userlistcom'

export default {
  name: 'App',
  components: {
    chatCom,userlistCom
  },
  data(){
    return {
      msg:'mimichat',
      userlist:[
        {
          username:'小明',
          headerimg:require('./assets/1.jpg')
        },
        {
          username:'小黑',
          headerimg:require('./assets/2.jpg')
        },
        {
          username:'小红',
          headerimg:require('./assets/3.jpg')
        },
        {
          username:'小白',
          headerimg:require('./assets/4.jpg')
        }
      ],
      currentUser:{
          username:'小明',
          headerimg:require('./assets/1.jpg')
      }
    }
  },
  methods:{
    toggleUser:function(index){
      this.currentUser = this.userlist[index] 
    }
  }
}
</script>

<style scoped>
    .content{
      display: flex;
      width: 800px;
      height: 700px;
      margin: 0 auto;
    }
</style>
