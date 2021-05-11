<template>
    <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer"> 
        <h3 class="loginTitle">系统注册</h3>
        <el-form-item prop="username">
            <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
            <el-input type="text" auto-complete="false" v-model="loginForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="telenumber">
            <el-input type="text" auto-complete="false" v-model="loginForm.telenumber" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="submitRegiste">注册</el-button>
    </el-form>
    </div>
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'Login',
    data(){
        return {
            loginForm:{
                username:'',
                password:'',
                nickname:'',
                telenumber:''
            },
            checked:true,
            rules:{
                username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}],
                nickname:[{required:true,message:'请输入昵称',trigger:'blur'}],
                telenumber:[{required:true,message:'请输入电话号码',trigger:'blur'}],
            }
        }
    },
    methods:{
        updateCaptcha(){
            // this.captchaUrl = '/capcha?time=' +new Date();
        },
        submitRegiste(){
            // alert(111)
           this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // postRequest('/getUser/1',this.loginForm).then(resp=>{
            //     console.log(resp)
            //     if(resp){
            //         this.$router.replace('/home')
            //     }
            // })
            console.log(this.loginForm)
            let surl =this.baseurl + '/addSystemUser'

            this.$axios.post(surl,"userName="+this.loginForm.username+"&password="+md5(this.loginForm.password)+"&nickName="+this.loginForm.nickname
            +"&phoneNum="+this.loginForm.telenumber).then(resp=>{
                if(resp.data.code == 0){
                    if(resp.data.data.flag){
                    this.$router.replace('/')
                    this.$message.success('创建成功');
                    }else{
                        this.$message.error('手机号或用户名不能重复,创建失败');
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