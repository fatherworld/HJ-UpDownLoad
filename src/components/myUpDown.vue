<!-- eslint-disable no-undef -->
<template>
<div>
   <h2>文件上传</h2>
    <el-upload
			class="upload-demo"
      drag
			action="http://localhost:10002/upload"
      multiple
      accept=".zip"
      :file-list="fileList"
      :on-success="handleSucess"
      :before-upload="beforeAvatarUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png/txt/pdf/excel文件，且不超过2MB</div>
    </el-upload>
    <h2>文件下载</h2>
    <p> 模拟下载，假设下面是某个文件列表 </p>
    <div>
      <li @click="downFile(index)" v-for="(filename,index) in filelists" :key="index">{{filename}} </li>
    </div>

    <h2>上传的文件列表</h2>
    <button  @click="queryFile" style = "font-size:25px">
        查询文件列表
    </button>
    <!--<li v-for="(virtualPath,filename,id,insertime) in queryfilelists" :key="id">{{virtualPath}}  {{id}} {{virtualPath}}  {{insertime}}</li>-->
    <li v-for="(virtualPath,filename,id,insertime) in queryfilelists" :key="id">{{virtualPath}} {{insertime}}</li>
  </div>
</template>
<script>
//import axios from 'axios';    
export default {
  name: 'myUpDown',
  props:["title","rating"],
  data: function() {
      return {
        fileList:[],
        filelists:
        [
        ]
        ,
        fileinfo:{
          virtualPath:""
        },
        queryfilelists:
        [
        ]
      };
    },
  methods:
  {
    beforeAvatarUpload(file) {
      //alert(file.type)
      console.log("beforeAvatarUpload");
      console.log("file.type:"+file.type)
      const isZIP = file.type === "application/x-zip-compressed"
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isPDF = file.type === 'application/pdf';
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isXLS = file.type === 'application/vnd.ms-excel'					
      //const isLt2M = file.size / 1024 / 1024 < 2;			
      if (!isJPG && !isPNG && !isPDF && isXLSX && isXLS && !isZIP) {
      this.$message.error('上传文件格式只能是 JPG PNG TXT PDF XLS XLSX格式!');
      }
      //if (!isLt2M) {
      //this.$message.error('上传头像图片大小不能超过 2MB!');
      //}
      return (isJPG || isPNG || isPDF || isXLSX || isXLS || isZIP) ;
    },
     handleSucess(result)
  {
      alert("上传成功"),
      console.log("文件路径："+result.virtualPath),
      console.log("文件名:"+result.fileName),
      this.filelists.unshift(result.virtualPath)
  }
  ,
  async axiosdownload(downloadurl)
  {
        //this.fileinfo.virtualPath在get之后未定义，是异步的问题吗
        var curdownname = this.fileinfo.virtualPath;
        const instance = this.$http.create({
        baseURL: 'http://localhost:10002/',
        timeout: 1000,
        responseType:'blob',
      });
      await instance.get(downloadurl)
      .then(function(response)
      {
        console.log("data:"+response.data)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',curdownname);
        document.body.appendChild(link);
        link.click();
        console.log(response);
      })
      .catch(function(error)
      {
          console.log(error);
      }); 
  },
  downFile(index){
      alert("开始下载")
      //动态获取刚刚上传的文件的路径,所以必须先上传,再下载,当然你也可以把路径写死
      //实际项目中,获取目标文件路径即可,这个不是重点
      //this.fileinfo.virtualPath = "2024/03/12/5a6cf03201734c37912f0f5770b8bb49.jpg";
      this.fileinfo.virtualPath= this.filelists.at(index);
      console.log("fileinfo:"+this.fileinfo.virtualPath)
      //var requrl = "http://localhost:10001/downloadFile?filePath="+this.fileinfo.virtualPath
      //var requrl = "http://localhost:10002//downloadFile?filePath="+this.fileinfo.virtualPath;
      //这里直接使用window.open 发起请求在新页面显示返回的内容,也可以使用axios,这样比较简单,效果类似   
      var downloadurl = "downloadFile?filePath="+this.fileinfo.virtualPath;
      this.axiosdownload(downloadurl);
    },
    queryFile()
    {
        alert("查询数据库文件入库信息 ");
        const queryurl = "queryFile";
        this.query(queryurl)
    },
    async query(queryurl)
    {
          const instance = this.$http.create({
          baseURL: 'http://localhost:10002/',
          timeout: 1000,
        });
        await instance.get(queryurl)
        .then(this.afterquery
        )
        .catch(function(error)
        {
            console.log(error);
        }); 
    }
    ,
    afterquery(response)
    {
        console.log("res:"+response)
        console.log("data:"+response.data)
        this.queryfilelists = response.data; 
        console.log("查询数据成功！！！")
    }
  }

}
</script>