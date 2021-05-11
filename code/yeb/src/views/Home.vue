<template>
    <div> 
    <el-container >
            <el-header class="homeHeader">
                <div class="title">
                    投票系统
                </div>
                <el-dropdown @command="handleUserCommand">
                    <span class="el-dropdown-link">
                        {{user.nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span> 
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-switch-button" command="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
            <el-aside width="200px">
                <el-menu :default-active="LeftItem" :default-openeds="openeds" @select="menuClick">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-location"></i>导航</template>
                    <el-menu-item index="/allvote"> <span class="el-icon-s-order" ></span>查看所有投票</el-menu-item>
                    <el-menu-item index="/meinvolve"><span class="el-icon-position" ></span>我参与的</el-menu-item>
                    <el-menu-item index="/createvote"><span class="el-icon-folder-add" ></span>创建投票</el-menu-item>
                    <el-menu-item index="/mecreate"><span class="el-icon-folder-checked" ></span>我创建的</el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
            </el-container>
    </el-container>

    </div>
</template>

<script>
export default {
    name:'Home',
    data(){
        return{
            openeds:['1'],
            LeftItem:this.LeftItem,
             user:JSON.parse(window.sessionStorage.getItem('user')),
        }
    },
   mounted(){
        if(!this.user){
        this.$message.error('请先登录');
        this.$router.replace('/')
      }
   },
    methods:{
        menuClick(index){
            this.$router.push(index);
        },
        //处理点击我的事件
        handleUserCommand(command){
            if(command == "loginOut"){
                this.$router.push('/');
                window.sessionStorage.removeItem('user');
            }
        }
    }
}
</script>

<style >
    .homeHeader{
        background: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .homeHeader .title{
        font-size: 30px;
        font-family: 华文楷体;
        color: white;
    }
</style>