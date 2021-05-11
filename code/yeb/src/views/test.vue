<template>
    <div >
       
        <img id="img" :src="url"/>

    </div>
</template>
<script>
import avatar from '@/assets/logo.png'
  export default {
    data() {
      return {
        fileList: [],
        pictureData:{ },
        
        hhh:'7_809fde5a1d13423cbf90e2e17ae9dbe7.jpg',
        url:avatar,
      };
    },
    methods: {
      postReq(){
         let surl = this.baseurl + '/downLoadImg2'
            this.$axios.get( surl, // 请求地址

          )
        .then(resp=>{
              
            })
      },  
     
      submitUpload() {
          console.log(this.pictureData)
        this.$refs.upload.submit();
        this.$refs.upload.clearFiles();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
     
    }
  }
</script>