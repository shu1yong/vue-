<template>
<div>
    <div v-if="meCreatetableflag">  
    <el-table
      :data="mecreatetableData"
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
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="modifyVote(scope.$index, mecreatetableData)"
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          @click.native.prevent="editVote(scope.$index, mecreatetableData)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.native.prevent="deleteVote(scope.$index, mecreatetableData)"
          type="danger"
          size="mini">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
      
       <!-- 修改投票对话框 -->
    <el-dialog
        title="修改投票信息"
        :visible.sync="dialogModifyVoteVisible"
        width="50%"
        :before-close="handleModifyVoteClose">
              <el-row style="margin-bottom:10px">
            <el-col :span="12">
              <el-input placeholder="请输入内容" v-model="modifyVoteInfo.VoteTitle">
                <template slot="prepend"><span style="color:red">*</span>活动名称：</template>
              </el-input>
            </el-col>
            
          </el-row>
          <el-row style="margin-bottom:10px">
            <el-col :span="12">
                <el-input 
                  type="textarea"
                  rows="5"
                  placeholder="请输入投票规则(必填)" 
                  v-model="modifyVoteInfo.VotingRule">
                </el-input>
              </el-col>
            
          </el-row>
          <el-row style="margin-bottom:10px">
            <el-col :span="12">
              <el-input placeholder="请输入内容" v-model="modifyVoteInfo.Describe1">
                <template slot="prepend"><span style="color:red">*</span>描述1</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px">
            <el-col :span="12">
              <el-input placeholder="请输入内容" v-model="modifyVoteInfo.Describe2">
                <template slot="prepend"><span style="color:red" >*</span>描述2</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px">
            <el-col :span="12">
              <el-input placeholder="请输入内容" v-model="modifyVoteInfo.Describe3">
                <template slot="prepend">描述3</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px">
            <el-col :span="12">
              <el-input placeholder="请输入内容" v-model="modifyVoteInfo.Describe4">
                <template slot="prepend">描述4</template>
              </el-input>
            </el-col>
          </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogModifyVoteVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureModifyVote">确 定</el-button>
        </span>
      </el-dialog>

    </div>

    <!-- 点击编辑之后 -->
    <div v-show="!meCreatetableflag">
       <el-row >
      <el-col :span="6"><el-button size="small" @click="addVoter" type="primary">添加选手</el-button><el-button icon="el-icon-back" size="small" @click="cancelAddVoter" type="info">返回</el-button></el-col>
      <el-dialog
        title="输入选手信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleaddvoterClose">
       <div >
   <el-row>
    <el-col style="margin-bottom:10px" :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="itemName">
        <template slot="prepend"><span style="color:red">*</span>选手名字</template>
      </el-input>
    </div>
     </el-col>
  </el-row>
  <el-row>
    <el-col style="margin-bottom:10px" :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe1">
        <template slot="prepend"><span style="color:red">*</span>选手描述1</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col style="margin-bottom:10px" :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe2">
        <template slot="prepend"><span style="color:red">*</span>选手描述2</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col style="margin-bottom:10px" :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe3">
        <template slot="prepend">选手描述3</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col style="margin-bottom:10px" :span="18">
      <div>
        <span>选手照片</span>
        <el-upload
        class="upload-playerPicture"
        ref="upload"
        :action="picActionUrl"
        list-type="picture"
        :on-success="handleplayerPictureAvatarSuccess"
        :file-list="playerPicturefileList"
        :data="playerPicturepictureData"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitplayerPictureUpload">上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    </div>
    </el-col>
  </el-row>

  </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureaddVoter">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
      <el-table
      :data="voteActiveVotertableData"
      height="550"
      border
      stripe
      style="width: 100% ;margin-top:10px">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="itemName"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="describe1"
        label="描述1"
        width="180">
      </el-table-column>
      <el-table-column
        prop="describe2"
        label="描述2"
        width="180">
      </el-table-column>
      <el-table-column
        prop="describe3"
        label="描述3"
        width="180">
      </el-table-column>
      <el-table-column
        prop="imgUrl1"
        label="选手图片"
        >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleModifyVoterClick(scope.$index,scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="handleDeleteVoterClick(scope.$index,scope.row)" type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 修改选手弹框 -->
    <el-dialog
        title="编辑选手信息"
        :visible.sync="dialogModifyVoterVisible"
        width="30%"
        :before-close="handleModifyVoterDialogClose">
        
            <el-row>
        <el-col style="margin-bottom:10px" :span="18">
          <div>
          <el-input placeholder="请输入内容" v-model="itemName">
            <template slot="prepend"><span style="color:red">*</span>选手名字</template>
          </el-input>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="margin-bottom:10px" :span="18">
          <div>
          <el-input placeholder="请输入内容" v-model="votedescribe1">
            <template slot="prepend"><span style="color:red">*</span>选手描述1</template>
          </el-input>
        </div>
        </el-col>
      </el-row>
        <el-row>
        <el-col style="margin-bottom:10px" :span="18">
          <div>
          <el-input placeholder="请输入内容" v-model="votedescribe2">
            <template slot="prepend"><span style="color:red">*</span>选手描述2</template>
          </el-input>
        </div>
        </el-col>
      </el-row>
        <el-row>
        <el-col style="margin-bottom:10px" :span="18">
          <div>
          <el-input placeholder="请输入内容" v-model="votedescribe3">
            <template slot="prepend">选手描述3</template>
          </el-input>
        </div>
        </el-col>
      </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogModifyVoterVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureModifyVoterDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</div>
</template>

<script>
export default {
    name:'Mecreate',
    data(){
        return{
            user:JSON.parse(window.sessionStorage.getItem('user')),
            meCreatetableflag:true,
            mecreatetableData: [],
            dialogVisible:false,
            dialogModifyVoteVisible:false,
            dialogModifyVoterVisible:false,
            picActionUrl:this.baseurl + '/upLoadImg',
            modifyVoteInfo:{
            },
            playerPicturefileList:[],
            playerPicturepictureData:{},
            voteActiveVotertableData:[],
            itemInfos:[],
            votesNum:'',
            itemName:'',
            votedescribe1:'',
            votedescribe2:'',
            votedescribe3:'',
            voteimgUrl1:'',
            voteimgUrl2:'',
            voteInfo:{},
            vid:'',
            index:'',
            voteActiveInfo:{},
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
      //首页修改活动
      modifyVote(index){
        this.dialogModifyVoteVisible = true
        this.modifyVoteInfo = this.mecreatetableData[index]
      },
      //初始化修改
      //修改活动关闭按钮
      handleModifyVoteClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //确认修改信息
      sureModifyVote(){
        if(this.modifyVoteInfo.VoteTitle&&this.modifyVoteInfo.VotingRule&&this.modifyVoteInfo.Describe1&&this.modifyVoteInfo.Describe2){
          this.dialogModifyVoteVisible = false
          let surl = this.baseurl + '/updateVoteInfo'
              this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
              //调用接口上传服务器
              console.log(this.modifyVoteInfo.Vid)
              this.$axios.post(surl,"VoteTitle="+this.modifyVoteInfo.VoteTitle+"&votingRule="+this.modifyVoteInfo.VotingRule+"&describe1="+this.modifyVoteInfo.Describe1+"&describe2="+this.modifyVoteInfo.Describe2+"&describe3="+this.modifyVoteInfo.Describe3
          +"&describe4="+this.modifyVoteInfo.Describe4+"&vid="+this.modifyVoteInfo.Vid).then(resp=>{
            console.log((resp))
              console.log((resp.data.code))
                  if(resp.data.code == '0'){
                      this.$message.success('修改成功');

                      }else{
                          this.$message.error('修改失败');
                      }
              })
        }else{
          this.$message.error('您不能删除必填信息');
        }

        
      },
        //首页编辑活动
        editVote(index, rows){
            this.meCreatetableflag= false
            this.vid = this.mecreatetableData[index].Vid
            this.ininVoteInfo()
             console.log(rows,index,this.vid)
        },
        //首页删除活动
        deleteVote(index, rows){
          console.log(122)
           let surl = this.baseurl + '/deleteVoteInfo'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            //调用接口上传服务器
            console.log(this.mecreatetableData[index].Vid)
            this.$axios.post(surl,"vid="+this.mecreatetableData[index].Vid).then(resp=>{
           console.log((resp))
            console.log((resp.data.code))
                if(resp.data.code == '0'){
                  this.inintmeCreatevotetable()
                    this.$message.success('删除成功');
                    }else{
                        this.$message.error('删除失败');
                    }
            })
            
            console.log(rows,index)
        },
        handleEditmeCreateClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        inintmeCreatevotetable(){
            let surl = this.baseurl + '/getVoteInfo'
            console.log(this.user.uid)
            if(!this.user.uid){
                this.$message.error('请先登录');
            }else{
                this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
                this.$axios.post(surl,"uid="+this.user.uid).then(resp=>{
                console.log(resp)
                if(resp.data.count !== 0){
                    if(resp.data.data){
                    this.mecreatetableData = resp.data.data
                }else{
                        this.$message.error('获取信息失败');
                    }
                }else{
                  this.$message('暂时没有信息');
                }
                
            })
            }
            
        },
        //获取其中一个投票信息
        ininVoteInfo(){
            let surl = this.baseurl + '/getAllVoteAndItemInfoByVid'
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"vid="+this.vid).then(resp=>{
                if(resp.data.data){
                    console.log(resp.data.data.Items)
                    resp.data.data.Items.forEach(item => {
                      this.voteActiveVotertableData.push(item)
                      
                    });
                    }else{
                        this.$message.error('获取投票失败');
                    }
            })
        },
      //添加投票者
      addVoter(){
        this.inintTableDate();
        this.dialogVisible = true
      },
      //取消添加投票者
      cancelAddVoter(){
        this.voteActiveVotertableData = []
        this.meCreatetableflag = !this.meCreatetableflag
      },
      //处理添加投票者右上角关闭事件
      handleaddvoterClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //初始化 投票者信息
      inintTableDate(){
        this.itemName = ''
        this.votedescribe2 = ''
        this.votedescribe3 = ''
        this.votedescribe1 = ''
        this.voteimgUrl1 = ''
        this.playerPicturefileList = ''
        this.voteimgUrl2 = ''
      },
      //添加投票者上传图片里方法

      //
      //提交投票者图片上传到服务器
      submitplayerPictureUpload() {
        this.playerPicturepictureData.uid = this.user.uid
        console.log(this.playerPicturepictureData)
        this.$refs.upload.submit();
      },
      //处理上传投票者信息后返回信息
      handleplayerPictureAvatarSuccess(response,){
        console.log(response.data.ImageUrl)
        this.voteimgUrl1 = response.data.ImageUrl
      },

      //确认添加投票者
      sureaddVoter(){
        if(this.itemName&&this.votedescribe1&&this.votedescribe2){
          if(this.voteimgUrl1){
               console.log(this.voteActiveVotertableData)
              let newVoter = {}
              newVoter.itemName = this.itemName
              newVoter.describe1 = this.votedescribe1
              newVoter.describe2 = this.votedescribe2
              newVoter.describe3 = this.votedescribe3;
              newVoter.imgUrl1 = this.voteimgUrl1;
              this.voteActiveVotertableData.push(newVoter)
              
              //返回新添加的信息到服务端
              this.voteInfo.vid = this.vid;
              this.voteInfo.itemInfos = [];
              let num = 0
              this.voteActiveVotertableData.forEach((item,index)=>{
                if(item.iid == undefined){
                  item.iid = 0
                  num = index
                  this.voteActiveVotertableData[index].iid = 0
                }
                item.votesNum = '0';
                this.voteInfo.itemInfos.push(item)
              })
              // console.log(JSON.stringify( this.voteInfo))
              let surl = this.baseurl + '/addItemInfos'
              let reqdata = JSON.stringify( this.voteInfo)
              console.log(reqdata)
              this.$axios.defaults.headers.post['Content-Type'] = "application/json"
                  this.$axios.post(surl,reqdata
                //如果写成contentType会报错
                      ).then(resp=>{
                      console.log(resp)
                      if(resp.data.code == 0){
                        //处理两次添加选手重复添加bug  给添加的本地iid赋值为-1
                          this.voteActiveVotertableData[num].iid = -1
                          this.$message.success('添加成功');
                      }
                      else{
                        this.$message.success('创建失败');
                      }
                  })


              console.log(this.voteActiveVotertableData)
              this.dialogVisible = false
              this.$refs.upload.clearFiles();
          }else{
            this.$message.error('请上传对应图片')
          }
        }else{
          this.$message.error('请完善必输字段')
        }

       
      },
      //编辑投票者
      handleModifyVoterClick(index,row){
        if(this.voteActiveVotertableData[index].iid){
          console.log(index,this.voteActiveVotertableData[index])
        //把index 存起来  一会儿修改直接改本地的选手   因为发的时候要发iid
        this.index = index
        this.itemName = this.voteActiveVotertableData[index].itemName
        this.votedescribe1 = this.voteActiveVotertableData[index].describe1
        this.votedescribe2 = this.voteActiveVotertableData[index].describe2
        this.votedescribe3 = this.voteActiveVotertableData[index].describe3
        this.dialogModifyVoterVisible = true;
        }else{
          this.$message.error('请先完成创建');
        }
        
      },
      //关闭编辑投票者弹框
      handleModifyVoterDialogClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //确认编辑投票者
      sureModifyVoterDialog(){
        if(this.itemName&&this.votedescribe1&&this.votedescribe2){
            let index = this.index
            console.log(222)
            this.voteActiveVotertableData[index].itemName = this.itemName
            this.voteActiveVotertableData[index].describe1 = this.votedescribe1
            this.voteActiveVotertableData[index].describe2 = this.votedescribe2
            this.voteActiveVotertableData[index].describe3 = this.votedescribe3
            console.log(this.voteActiveVotertableData[index])
            let surl = this.baseurl + '/updateItemInfo'
                this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
                this.$axios.post(surl,"iid="+this.voteActiveVotertableData[index].iid+"&itemName="+this.voteActiveVotertableData[index].itemName+"&describe1="+this.voteActiveVotertableData[index].describe1+"&describe2="+this.voteActiveVotertableData[index].describe2
                +"&describe3="+this.voteActiveVotertableData[index].describe3).then(resp=>{
                    if(resp.data.code == 0){
                        this.$message.success('编辑成功');
                        }else{
                            this.$message.error('编辑失败');
                        }
                })
            this.dialogModifyVoterVisible = false;
        }else{
          this.$message.error('您不能删除必填信息');
        }

        

      },
      //删除投票者
      handleDeleteVoterClick(index,row){
        console.log(index,row)
         let surl = this.baseurl + '/deleteItemInfo'
          console.log(this.voteActiveVotertableData[index])
          if(this.voteActiveVotertableData[index].iid){
            this.$axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
            this.$axios.post(surl,"iid="+this.voteActiveVotertableData[index].iid).then(resp=>{
              console.log(resp)
                if(resp.data.code == 0){
                    this.$message.success('删除成功');
                    this.voteActiveVotertableData.splice(index,1)
                    }else{
                        this.$message.error('删除失败');
                    }
            })
          }else{
            this.$message.error('删除失败，首次添加不能删除');
          }
            

        
      },
        
    }

}
</script>

<style scoped>

</style>