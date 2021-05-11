<template>
  <div id="app">
   <choose-user></choose-user>
  </div>
</template>

<script>
import chooseUser from './components/chooseUser'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    chooseUser
  },
  data(){
    return {
      userlist:[]
    }
  },
  beforeMount(){
    axios.get('https://locahost:3000/api/userlist').then(function(res){
      console.log(res)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
