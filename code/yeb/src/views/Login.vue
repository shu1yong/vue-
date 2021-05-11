<template>
    <div>
    <el-form 
        :rules="rules" 
         v-loading="loading"
         element-loading-text="正在登录..."
         element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="loginForm" 
        :model="loginForm"
        class="loginContainer"> 
        <h3 class="loginTitle">系统登陆</h3>
        <el-form-item prop="username">
            <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
        <div>
            <el-button type="primary" style="width:47%" @click="submitLogin">登录</el-button>
            <el-button type="primary" style="width:47%" @click="registeEvent">注册</el-button>
        </div>
        
    </el-form>
    </div>
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'Login',
    data(){
        return {
            captchaUrl:'/getUser/1',
            loginForm:{
                username:'wys4',
                password:'123',
            },
           
            loading:false,
            checked:true,
            rules:{
                username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}],
                code:[{required:true,message:'请输入验证码',trigger:'blur'}],
            }
        }
    },
    methods:{
        registeEvent(){
            this.$router.replace('/registe')
        },
        submitLogin(){
            // alert(111)
           this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // postRequest('/getUser/1',this.loginForm).then(resp=>{
            //     console.log(resp)
            //     if(resp){
            //         this.$router.replace('/home')
            //     }
            // })
            this.loading = true;
            let surl = this.baseurl + '/loginSystemUser'
            console.log(md5(this.loginForm.password))
            this.$axios.post(surl,"userName="+this.loginForm.username+"&password="+md5(this.loginForm.password)).then(resp=>{
                console.log(resp)
                this.loading = false;
                if(resp.data.code == 0){
                    if(resp.data.data.flag){
                    this.$router.replace('/home')
                    this.$message.success('登录成功');
                    console.log(resp)
                    let user = JSON.stringify(resp.data.data) 
                    window.sessionStorage.setItem('user',user)
                    }else{
                        this.$message.error('登陆失败');
                    }
                }
            })
            
          } else {
            this.$message.error('请输入所有字段！');
            return false;
          }
        });
        }
    }
}
</script>

<style >
    .loginContainer{
        border-radius:15px;
        background-clip: padding-box;
        margin: 188px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow:  0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0px auto 30px auto;
        text-align: center;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 8px 15px 8px;
    }
</style>