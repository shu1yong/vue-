<template>
    <div> 
      <div v-if="createvoteflag"> 
      <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="VoteTitle">
          <template slot="prepend"><span style="color:red">*</span>活动名称：</template>
        </el-input>
      </el-col>
      
    </el-row>
    <el-row>
      <el-col :span="12">
          <el-input 
            type="textarea"
            rows="5"
            placeholder="请输入投票规则(必填)" 
            v-model="votingRule">
          </el-input>
        </el-col>
      
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="describe1">
          <template slot="prepend"><span style="color:red">*</span>描述1</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="describe2">
          <template slot="prepend"><span style="color:red">*</span>描述2</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="describe3">
          <template slot="prepend">描述3</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="describe4">
          <template slot="prepend">描述4</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-upload
        class="upload-VoteActive"
        ref="upload"
        :action="picActionUrl"
        list-type="picture"
        :on-preview="handleVoteActivePreview"
        :on-success="handleVoteActiveAvatarSuccess"
        :on-remove="handleVoteActiveRemove"
        :file-list="voteActivefileList"
        :data="voteActivepictureData"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitVoteActiveUpload">上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-col> 
    </el-row>
    <el-row>
      <el-col :span="16">
        <div class="block">
        <span class="demonstration">投票期限</span>
        <el-date-picker
         
          v-model="time1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
    <el-button @click="creatVote" type="primary">添加选手</el-button>
    </el-col>
  </el-row>
  </div>
  <!-- <div v-if="!createvoteflag">
   <el-row>
    <el-col :span="12">
      <div>
      <el-input placeholder="请输入内容" v-model="itemName">
        <template slot="prepend">选手名字</template>
      </el-input>
    </div>
     </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe1">
        <template slot="prepend">选手描述1</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="12">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe2">
        <template slot="prepend">选手描述2</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="12">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe3">
        <template slot="prepend">选手描述3</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="12">
      <div>
        <span>选手照片</span>
        <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlevotePreview"
        :on-remove="handlevoteRemove"
        :before-remove="beforevoteRemove"
        multiple
        :limit="3"
        :on-exceed="handlevoteExceed"
        :file-list="voteimgList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-button @click="cotinueAddvote" type="primary">继续添加</el-button>
      <el-button type="primary">完成添加</el-button>
    </el-col>
  </el-row>
  </div> -->
  <div v-if="!createvoteflag"> 
      <el-row >
      <el-col :span="6"><el-button size="small" @click="addVoter" type="primary">添加选手</el-button></el-col>
      <el-dialog
        title="输入选手信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleaddvoterClose">
       <div >
   <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="itemName">
        <template slot="prepend"><span style="color:red">*</span>选手名字</template>
      </el-input>
    </div>
     </el-col>
  </el-row>
  <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe1">
        <template slot="prepend"><span style="color:red">*</span>选手描述1</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe2">
        <template slot="prepend"><span style="color:red">*</span>选手描述2</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe3">
        <template slot="prepend">选手描述3</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="18">
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
      :data="tableData"
      height="550"
      border
      stripe
      style="width: 100%">
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
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog
        title="编辑选手信息"
        :visible.sync="dialogEditVisible"
        width="30%"
        :before-close="handleaddvoterClose">
       <div >
   <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="itemName">
        <template slot="prepend"><span style="color:red">*</span>选手名字</template>
      </el-input>
    </div>
     </el-col>
  </el-row>
  <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe1">
        <template slot="prepend"><span style="color:red">*</span>选手描述1</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe2">
        <template slot="prepend"><span style="color:red">*</span>选手描述2</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="18">
      <div>
      <el-input placeholder="请输入内容" v-model="votedescribe3">
        <template slot="prepend">选手描述3</template>
      </el-input>
    </div>
    </el-col>
  </el-row>
    <el-row>
  </el-row>

  </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureEditVoter(scope.$index)">确 定</el-button>
        </span>
      </el-dialog>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-button type="primary" @click="finishCreateVote" size="small">完成创建</el-button>
  </div>
    </div>
</template>

<script>
export default {
    name:'Createvote',
    data(){
        return {
          dialogVisible:false,
          dialogEditVisible:false,
             tableData: [],
             playerPicturefileList:[],
            playerPicturepictureData:{},
            createvoteflag:true,
            VoteTitle:"",
            votingRule:"",
            describe1:'',
            describe2:'',
            describe3:'',
            describe4:'',
            voteActivefileList: [],
            picActionUrl:this.baseurl + '/upLoadImg',
            voteActivepictureData:{
            },
            imgList:[],
            voteimgList: [],
            user:JSON.parse(window.sessionStorage.getItem('user')),
            StartTime:'',
            EndTime:'',
            vid:'',
            pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        LeftItem:this.LeftItem,
        time1: [new Date(), new Date(2022, 0, 1)],
        time2: [],
        itemInfos:[],
        votesNum:'',
        itemName:'',
        votedescribe1:'',
        votedescribe2:'',
        votedescribe3:'',
        voteimgUrl1:'',
        voteimgUrl2:'',
        voteInfo:{}
        }
    },
    mounted(){
      if(!this.user){
        console.log(this.user)
        this.$message.error('请先登录');
        this.$router.replace('/')
      }
    },
    methods:{
        //处理投票活动图片上传
      //提交上传到服务器
      submitVoteActiveUpload() {
        this.voteActivepictureData.uid = this.user.uid
        console.log(this.voteActivepictureData)
        this.$refs.upload.submit();
      },
      //处理上传后返回信息
      handleVoteActiveAvatarSuccess(response, file, fileList){
        console.log(response.data.ImageUrl)
        this.voteimgUrl1 = response.data.ImageUrl
      },
      handleVoteActiveRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleVoteActivePreview(file) {
        console.log(file);
      },

      //确认创建活动投票  点击添加选手
      creatVote(){
        let surl = this.baseurl + '/createVoteInfo';
        if(this.user.uid === undefined ){
          this.$message.error('请先登录');
        }else{
          if(this.VoteTitle&&this.votingRule&&this.describe1&&this.describe2&&this.user.uid){
            if(this.voteimgUrl1){
               this.$axios.post(surl,"VoteTitle="+this.VoteTitle+"&votingRule="+this.votingRule+"&describe1="+this.describe1+"&describe2="+this.describe2+"&describe3="+this.describe3
         +"&describe4="+this.describe4+"&imgUrl1="+this.voteimgUrl1+"&uid="+this.user.uid).then(resp=>{
           //+"&StartTime="+new Date().toJSON().substr(0, 19).replace('T', ' ')+"&EndTime="+new Date().toJSON().substr(0, 19).replace('T', ' ')/
                console.log(resp)
                if(resp.data.code == 0){
                    if(resp.data.data.flag){
                    this.createvoteflag = false;
                    this.vid = resp.data.data.vid
                    this.$message.success('活动创建成功');
                    console.log(this.vid)
                    }else{
                        this.$message.error('活动创建失败');
                    }
                }
            })}else{
               this.$message.error('请上传对应图片');
            }
         
        }else{
          this.$message.error('请补全所有必填信息');
        }}
      },


      // //没有用到这个函数
      // cotinueAddvote(){
      //   this.voteInfo.vid = this.vid;
      //   this.voteInfo.itemInfos = [];
      //   let itemInfo = {};
      //   itemInfo.votesNum = 0;
      //   itemInfo.itemName = this.itemName;
      //   itemInfo.describe1 = this.votedescribe1;
      //   itemInfo.describe2 = this.votedescribe2;
      //   itemInfo.describe3 = this.votedescribe3;
      //   itemInfo.imgUrl1 = '';
      //   itemInfo.imgUrl2 = '';
      //   this.voteInfo.itemInfos.push(itemInfo)
      //   console.log(this.voteInfo)
      // },
      //编辑投票者
       handleEdit(index, row) {
        console.log(index, row);
        this.dialogEditVisible = true
        this.itemName = this.tableData[index].itemName
        this.votedescribe1 = this.tableData[index].describe1
        this.votedescribe2 = this.tableData[index].describe2
        this.votedescribe3 = this.tableData[index].describe3
      },
      //删除投票者
      handleDelete(index, row) {
        console.log(index, row);
        this.tableData.splice(index,1)
      },
      //添加投票者
      addVoter(){
        this.inintTableDate();
        this.dialogVisible = true
      },
      //处理添加投票者右上角关闭事件
      handleaddvoterClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
      handleplayerPictureAvatarSuccess(response, file, fileList){
        console.log(response.data.ImageUrl)
        this.voteimgUrl1 = response.data.ImageUrl
      },

      //确认添加投票者
      sureaddVoter(){
        console.log(this.tableData)
        let newVoter = {}
        if(this.itemName&&this.votedescribe1&&this.votedescribe2){
          if(this.voteimgUrl1){
            newVoter.itemName = this.itemName
            newVoter.describe1 = this.votedescribe1
            newVoter.describe2 = this.votedescribe2
            newVoter.describe3 = this.votedescribe3;
            newVoter.imgUrl1 = this.voteimgUrl1;
            this.tableData.push(newVoter)
            console.log(this.tableData)
            this.dialogVisible = false
            this.$refs.upload.clearFiles();
          }else{
            this.$message.error('请上传对应图片');
          }
        
        }else{
          this.$message.error('请完善必输字段');
        }
      },
      //确认编辑投票者
      sureEditVoter(index){
        console.log(index)
        if(this.itemName&&this.votedescribe2&&this.votedescribe1){
          this.tableData[index].itemName = this.itemName;
          this.tableData[index].votedescribe2 = this.votedescribe2;
          this.tableData[index].votedescribe3 = this.votedescribe3;
          this.tableData[index].votedescribe1 = this.votedescribe1;
          this.dialogEditVisible = false
          this.$message.success('编辑成功');
        }else{
          this.$message.error('您不能删除必填信息');
        }
          
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
      //确认完成创建投票者
      finishCreateVote(){
        if(!this.vid){
          this.$message.success('请指定对应活动');
        }else{
          //  console.log(2)
        this.voteInfo.vid = this.vid;
        this.voteInfo.itemInfos = [];
        this.tableData.forEach((item)=>{
          item.votesNum = '0'
          if(item.iid == undefined){
            item.iid = 0
          }
          this.voteInfo.itemInfos.push(item)
        })
        // console.log(JSON.stringify( this.voteInfo))
         let surl = this.baseurl + '/addItemInfos'
         let reqdata = JSON.stringify( this.voteInfo)
         this.$axios.defaults.headers.post['Content-Type'] = "application/json"
            this.$axios.post(surl,reqdata
          //如果写成contentType会报错
).then(resp=>{
                console.log(resp)
                if(resp.data.code == 0){
                    this.$router.replace('/mecreate');
                    this.LeftItem = '/mecreate'
                    this.$message.success('创建成功');
                }
                else{
                  this.$message.success('创建失败');
                }
            })
      }
    }
        }
       
}
</script>
import test from '../views/test.vue'
<style scoped>
    .loginContainer{
        border-radius:15px;
        background-clip: padding-box;
        margin: 0px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow:  0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0px auto 30px auto;
        text-align: left;
    }
    .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    display: flex;
    flex-direction: row;
  
  }
  .demonstration{
    margin-right:10px ;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .addvoterInput{
    width: 250px;
    margin-left: 20px;
    margin-top: 10px;
  }
  .upload-VoteActive{
    width: 300px;
  }
</style>