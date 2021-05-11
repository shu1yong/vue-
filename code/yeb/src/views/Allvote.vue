<template>
<div>
    <div v-if="allvotetableflag"> 
    <el-table
      :data="allVotetableData"
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
        label="活动名">
         <template slot-scope="scope">
        <el-tag
            type='info'
          disable-transitions>{{scope.row.VoteTitle}}</el-tag>
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
          @click.native.prevent="joinVote(scope.$index, allVotetableData)"
          type="text"
          size="small">
          参与投票
        </el-button>
      </template>
    </el-table-column>
    </el-table>
<!-- 点击之后的页面 -->
    </div>
    <div v-if="!allvotetableflag">

        <el-button icon="el-icon-back" @click="returnAllvote" style="margin-bottom:10px" size="mini" type="info">返回</el-button>
        <el-row >
            <el-col :span="8" > <el-tag style="margin-right:10px;" type="info">活动名称：</el-tag>{{voteActiveInfo.voteTitle}}</el-col>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-col :span="8" > <el-tag style="margin-right:10px;" type="info" >活动简介：</el-tag>{{voteActiveInfo.describe1}}</el-col>
        </el-row>
 
        <el-image style="width: 80%; height: 350px;margin-top:10px;margin-bottom:10px"
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
                <div style="">
                    <span style="margin-left:38%;font-family: 'Times New Roman', Times, serif;font-weight:bold;font-size:20;">当前排行</span>
                <div style="width:80%;min-height:100px; background-color: rgb(247,237,219);display:flex;justify-content:space-around;flex-wrap:wrap;margin-top:20px">
                        
                        <div v-for="(item,index) in topThreeVoterItems " :key="index" style="display:flex; flex-direction:column;color:black;align-items:center;width:33%; margin-top:20px;margin-bottom:20px" >
                            <el-tag style="margin-bottom:10px" type="success">Top{{index +1}}</el-tag>
                           <el-image style="width:80%;height:80%;" :src="item.imgUrl1"></el-image>
                            <span>{{item.ItemName}}</span>
                            <div style="color"><span>总票数:</span><span>{{item.VotesNum}}</span></div>
                        </div>
                </div>

                </div>
            </el-col>
        </el-row>

        <el-row style="margin-top:10px;">
            <el-col :span="24">
                <div>
                <span style="margin-left:38%;font-family: 'Times New Roman', Times, serif;font-weight:bold;font-size:20">全部参赛者</span>
                <div style="width:80%;min-height:100px; background-color: white;display:flex;justify-content:space-around;flex-wrap:wrap;margin-top:20px">
                                            
                        <div v-for="(item,index) in voterItems " :key="index" @click="Show(index)" style="display:flex; flex-direction:column;color:black;align-items:center;width:33%; margin-top:20px;margin-bottom:20px" >
                           <el-image style="width:80%;height:80%;" :src="item.imgUrl1"></el-image>
                            <span style="margin-bottom:5px">{{item.itemName}}</span>
                            <span style="margin-bottom:5px">{{item.describe1}}</span>
                            <div style="margin-bottom:5px"><el-tag type="success">总票数{{item.votesNum}}</el-tag></div>
                            <el-button type="success" style="background-color:rgb(0,186,58);color:white" @click="VoteForVoter(item.vid,item.iid,index)" plain size="mini">投票</el-button>
                        </div>
                </div>

                </div>
            </el-col>
        </el-row>

        <el-row style="margin-bottom:10px;margin-top:20px">
            <el-col :span="12">
                <el-input 
                  type="textarea"
                  rows="5"
                  placeholder="您可在此发表评论" 
                  v-model="content">
                </el-input>
              </el-col>
            
          </el-row>
          <el-row style="margin-bottom:10px;margin-top:20px">
            <el-col :span="4">
                <el-tag @click="addContent" type="success">发表评论</el-tag>
              </el-col>
            
          </el-row>
        
         <el-row style="margin-bottom:10px;margin-top:20px">
            <el-col :span="4">
                <span style="font-size:25px" >最新评论</span>
              </el-col>
            
          </el-row>

          <el-row style="margin-top:10px;">
            <el-col :span="24">
                <div>
                
                <div style="width:80%;min-height:100px; background-color: white;display:flex;flex-wrap:wrap;margin-top:20px">
                                            
                        <div v-for="(item,index) in allCommentInfo " :key="index" style="display:flex; flex-direction:column;color:black;width:100%; " >
                           
                            <div style="margin-bottom:10px"><el-tag type="info">{{item.NickName}}</el-tag><el-tag type="info">{{item.CreaterTime}}</el-tag></div>
                            <span style="margin-bottom:20px;font-size:17px;width:62%">{{item.Content}}</span>

                        </div>
                </div>

                </div>
            </el-col>
        </el-row>
        <img >
        <el-image
        style="width: 50px; height: 50px"
        v-if="btnFlag" class="go-top"  :src="backTopPic" @click="backTop"></el-image>
    </div>
</div>
</template>

<script>
import defaultVoteActive from '@/assets/defaultVoteActive.jpg'
import defaultVoter from '@/assets/defaultVoter.jpg'
import backTop from '@/assets/backTop.jpg'
export default {
    name:'Allvote',
    data(){
        return{
            btnFlag:false,
            allvotetableflag:true,
            user:JSON.parse(window.sessionStorage.getItem('user')),
            allVotetableData: [],
            vid:'',
            voteActiveInfo: {},
            topThreeVoteActiveInfo:{},
            content:'',
            votepicturesrc: this.baseurl+'/downLoadImg?imgUrl=',
            basePicurl:this.baseurl+'/downLoadImg?imgUrl=',
            voterPicsrc:this.baseurl+'/downLoadImg?imgUrl=',
            defaultVoteActivePic:defaultVoteActive,
            defaultVoterPic:defaultVoter,
            backTopPic:backTop,
            url:defaultVoter,
            voterItems:{},
            topThreeVoterItems:[],
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            voterPicSrc: this.baseurl+'/downLoadImg?imgUrl=',
            allCommentInfo:[]
        }
    },
    mounted(){
        window.addEventListener('scroll', this.scrollToTop)
        this.inintmeCreatevotetable()
         if(!this.user){
        this.$message.error('请先登录');
        this.$router.replace('/')
      }
    },

    destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
    },

    methods:{
        // 点击图片回到顶部方法，加计时器是为了过渡顺滑
  backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
  },
 
  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  scrollToTop () {
    const that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 60) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  }

,
        joinVote(index, rows) {
        this.allvotetableflag = false
        this.vid = this.allVotetableData[index].Vid
        this.ininVoteInfo();
        this.ininTopthreeVoteInfo();
        this.initAllCommentInfo();
      },
      returnAllvote(){
          this.allvotetableflag  = !this.allvotetableflag
      },
      //获取所有投票信息
        inintmeCreatevotetable(){

            let surl = this.baseurl + '/getVoteInfo'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"uid="+'-1').then(resp=>{
                console.log(resp)
                if(resp.data.data){
                    this.allVotetableData = resp.data.data
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
                        this.$message.error('获取信息失败');
                    }
            })
        },
        //获取Topthree投票者信息
        ininTopthreeVoteInfo(){
            let surl = this.baseurl + '/getVotedRanking'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"vid="+this.vid).then(resp=>{
                console.log(resp)
                if(resp.data.data){
                    console.log((resp.data.data))
                    this.topThreeVoterItems = resp.data.data
                    this.votepicturesrc = this.basePicurl
                    
                    console.log(this.topThreeVoterItems)
                    this.topThreeVoterItems.forEach(item => {
                        item.imgUrl1 = this.voterPicsrc + item.ImgUrl
                        console.log(item)
                    });
                    console.log(this.topThreeVoterItems)
                   
                    }else{
                        this.$message.error('获取信息失败');
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
                        this.ininTopthreeVoteInfo()
                    }else{
                        this.$message.error(resp.data.data.msg);
                    }
                   
                }else{
                        this.$message.error('获取投票失败');
                    }
            })
        },
        //获取所有评论
        initAllCommentInfo(){
            let surl = this.baseurl + '/getCommentInfo'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            console.log(33)
            this.$axios.post(surl,"vid="+this.vid).then(resp=>{

                if(resp.data.code == 0){
                   this.allCommentInfo = resp.data.data
                   this.allCommentInfo.sort((a,b)=>a.CreaterTime - b.CreaterTime)
                    console.log(this.allCommentInfo)
                }else{
                        this.$message.error('获取评论失败');
                    }
            })
        },
        //发表评论
        addContent(){
            if(this.content){
                 let surl = this.baseurl + '/addCommentInfo'
                this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
                console.log(33)
                this.$axios.post(surl,"vid="+this.vid+"&uid="+this.user.uid+"&nickName="+this.user.nickName+"&content="+this. content).then(resp=>{
                    console.log(resp)
                    if(resp.data.code == 0){
                        this.content = ''
                        this.$message.success('评论成功');
                        this.initAllCommentInfo()
                    }else{
                            this.$message.error('评论失败');
                        }
                })
            }else{
                this.$message.error('请输入评论');
            }
        },
        //显示详情
        Show(index){
            console.log(index)
        }
    }
}
</script>

<style scoped>
p{
    background-color: aqua;
    
}
.go-top{
    position: fixed;
    right: 20px;
    top: 80%;
}
</style>