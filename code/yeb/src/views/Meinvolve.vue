<template>
<div>
    <div v-if="meInvolcetableflag"> 
    <el-table
      :data="meInvolvetableData"
      style="width: 100%"
       max-height="850">
      <el-table-column
        prop="Vid"
        label="活动编号"
        width="180">
        <template slot-scope="scope">
        <el-tag
          type='success'
          disable-transitions>{{scope.row.Vid}}</el-tag>
      </template>
      </el-table-column>
        <el-table-column
        prop="VoteTitle"
        label="活动名">
         <template slot-scope="scope">
        <el-tag
            type='info'
          disable-transitions>{{scope.row.VoteTitle}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="TotalVotes"
        label="总票数"
        width="180">
        <template slot-scope="scope">
        <el-tag
          disable-transitions>{{scope.row.TotalVotes}}</el-tag>
      </template>
      </el-table-column>
        <el-table-column
        prop="VoteTitle"
        label="总浏览量">
         <template slot-scope="scope">
        <el-tag
            type='info'
          disable-transitions>{{scope.row.TotalVisits}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="StartTime"
        label="开始时间">
        <template slot-scope="scope">
        <el-tag
          type='warning'
          disable-transitions>{{scope.row.StartTime}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="EndTime"
        label="结束时间">
        <template slot-scope="scope">
        <el-tag
          type='danger'
          disable-transitions>{{scope.row.EndTime}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="joinVote(scope.$index, meInvolvetableData)"
          type="text"
          size="small">
          参与投票
        </el-button>
      </template>
    </el-table-column>
    </el-table>
<!-- 点击之后的页面 -->
    </div>
    <div v-if="!meInvolcetableflag">
        <el-button icon="el-icon-back" @click="returnAllvote" style="margin-bottom:10px" size="mini" type="info">返回</el-button>
        <el-row >
            <el-col :span="8" > <el-tag style="margin-right:10px;" type="info">活动名称：</el-tag>{{voteActiveInfo.voteTitle}}</el-col>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-col :span="8" > <el-tag style="margin-right:10px;" type="info" >活动简介：</el-tag>{{voteActiveInfo.describe1}}</el-col>
        </el-row>
 
        <el-image style="width: 80%; height: 350px;margin-top:10px;"
                     :src="votepicturesrc==this.baseurl+'/downLoadImg?imgUrl='?defaultVoteActivePic:votepicturesrc">
        </el-image>
        <el-row>
            <el-col :span="24">
                <div style="width:80%;height:50px; background-color: rgb(0,133,238);display:flex;justify-content:space-around">
                    <div style="display:flex; flex-direction:column;color:white;align-items:center"> {{voteActiveInfo.totalVotes}}<span>总票数</span></div>
                    <div style="display:flex; flex-direction:column;color:white;align-items:center"> {{voteActiveInfo.Items.length}}<span>选手数</span></div>
                    <div style="display:flex; flex-direction:column;color:white;align-items:center"> {{voteActiveInfo.totalVisits}}<span>访问量</span></div>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-col :span="8" > <el-tag style="margin-right:10px;" type="info" >投票规则：</el-tag> {{voteActiveInfo.votingRule}}</el-col>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-col :span="8" > <el-tag style="margin-right:10px;" type="info" >投票时间：</el-tag> <el-tag style="margin-right:10px;" type="success" >{{voteActiveInfo.startTime}}</el-tag>至<el-tag style="margin-left:10px;" type="danger" >{{voteActiveInfo.endTime}} </el-tag></el-col>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-col :span="24">
                <div style="width:80%;min-height:100px; background-color: rgb(243,243,243);display:flex;justify-content:space-around;flex-wrap:wrap;">
                                            
                        <div v-for="(item,index) in voterItems " :key="index" style="display:flex; flex-direction:column;color:black;align-items:center;width:33%; margin-top:10px" >
                           <el-image style="width:80%;height:80%;" :src="item.imgUrl1"></el-image>
                            <span>选手名:{{item.itemName}}</span>
                            <span>选手描述:{{item.describe1}}</span>
                            <div><span>总票数:</span><span>{{item.votesNum}}</span></div>
                            <el-button type="success" @click="VoteForVoter(item.vid,item.iid,index)" plain size="mini">投票</el-button>
                        </div>
                      

                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import defaultVoteActive from '@/assets/defaultVoteActive.jpg'
import defaultVoter from '@/assets/defaultVoter.jpg'
export default {
    name:'Allvote',
    data(){
        return{
            meInvolcetableflag:true,
            user:JSON.parse(window.sessionStorage.getItem('user')),
            meInvolvetableData: [],
            vid:'',
            voteActiveInfo: {},
            votepicturesrc: this.baseurl+'/downLoadImg?imgUrl=',
            basePicurl:this.baseurl+'/downLoadImg?imgUrl=',
            voterPicsrc:this.baseurl+'/downLoadImg?imgUrl=',
            defaultVoteActivePic:defaultVoteActive,
            defaultVoterPic:defaultVoter,
            url:defaultVoter,
            voterItems:{},
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            voterPicSrc: this.baseurl+'/downLoadImg?imgUrl=',
        }
    },
    mounted(){
        this.inintmeCreatevotetable()
         if(!this.user){
        this.$message.error('请先登录');
        this.$router.replace('/')
      }
    },
    methods:{
        joinVote(index, rows) {
        this.meInvolcetableflag = false
        this.vid = this.meInvolvetableData[index].Vid
        this.ininVoteInfo();
      },
      returnAllvote(){
          this.meInvolcetableflag  = !this.meInvolcetableflag
      },
      //获取所有投票信息
        inintmeCreatevotetable(){

            let surl = this.baseurl + '/getIVoted'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"uid="+this.user.uid).then(resp=>{
                console.log(resp)
                if(resp.data.data){
                    this.meInvolvetableData = resp.data.data
                    }else{
                        this.$message('暂时没有数据');
                    }
            })
        },
        //获取其中一个投票信息
        ininVoteInfo(){
            let surl = this.baseurl + '/getAllVoteAndItemInfoByVid'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"vid="+this.vid).then(resp=>{
                if(resp.data.data){
                    console.log((resp.data.data))
                    this.voteActiveInfo = resp.data.data
                    this.votepicturesrc = this.basePicurl
                    if(this.voteActiveInfo.imgUrl1){
                        this.votepicturesrc +=this.voteActiveInfo.imgUrl1
                    }
                    this.voterItems = this.voteActiveInfo.Items
                    this.voterItems.forEach(item => {
                        item.imgUrl1 = this.voterPicsrc + item.imgUrl1
                    });
                    console.log(this.voterItems)
                   
                    }else{
                        this.$message.error('获取投票失败');
                    }
            })
        },
        //为某人投票
        VoteForVoter(vid,iid,index){
            console.log(vid,iid)
            console.log(this.user.uid)
            let surl = this.baseurl + '/Voting'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"vid="+vid+"&uid="+this.user.uid+"&iid="+iid).then(resp=>{
                console.log(22)
                console.log(resp)
                if(resp.data.code == 0){
                    console.log(11)
                    console.log(resp.data.data)
                    console.log(resp.data.data.flag)
                    if(resp.data.data.flag){
                         this.voterItems[index].votesNum++;
                        this.voteActiveInfo.totalVotes ++;
                        this.$message.success('投票成功');
                    }else{
                        this.$message.error(resp.data.data.msg);
                    }
                   
                }else{
                        this.$message.error('获取投票失败');
                    }
            })
        }
    }
}
</script>

<style scoped>

</style>