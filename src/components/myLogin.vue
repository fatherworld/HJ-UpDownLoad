<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
<!-- 手机号 -->
      <el-form-item prop="username">
        <span class="iconfont svg-container">
          &#xe632;
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
<!-- 输入密码 -->
      <el-form-item prop="password">
          <span class="iconfont svg-container">
            &#xe663;
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="el-icon-view show-pwd" @click="showPwd">
          </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">注册用户</el-button>
      <!-- 其他登录方式 -->
      <div style="text-align:right; width:100%">
        <el-checkbox v-model="checked" style="float:left; text-align:left;">记住密码</el-checkbox>
        <router-link to="/login in" style="color:#409EFF"> 注册新用户 </router-link>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '14725836912',
        password: '123456789'
      },
      // 用户名和密码规则
      loginRules: {
        username: [
          { required: true, trigger: 'change' },
          {min:0,max:20,message:'请输入11位手机号',trigger: 'blur'}
        ],
        password: [
          { required: true, trigger: 'change' },
          {min:6,max:10,message:'密码须为3-10个字符',trigger: 'blur'}
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      checked: false
    }
  },
  
  mounted() {
    //如果输入框为空聚焦输入框
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    //this.getCookie();
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType  = ''
      } else {
        this.passwordType = 'password'
      }
      //点完显示密码后聚焦输入框
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    //登录按钮
    handleLogin() {
      console.log("this.loginForm.username:"+this.loginForm.username)
      console.log("this.loginForm.password:"+this.loginForm.password)
      let param = new URLSearchParams()
      param.append("name", this.loginForm.username)
      param.append("password",this.loginForm.password)
      this.$http({
        method: 'post',
        url: 'http://localhost:10002/mylogin',
        headers: {
            /*问题分析(后端拿不到前端通过axios传送的post数据)
              也就是说，我们的 Content-Type 变成了 application/json;charset=utf-8
              然后，因为我们的参数是 JSON 对象，axios 帮我们做了一个 stringify 的处理。
              而且查阅 axios 文档可以知道：axios 使用 post 发送数据时，默认是直接把 json 放到请求体中提交到后端的。
              那么，这就与我们服务端要求的 'Content-Type': 'application/x-www-form-urlencoded' 以及 @RequestParam 不符合。
            */
            //'Content-Type': "application/json;charset=UTF-8"
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:param
      })
      .then(this.afterlogister)
      .catch(err=>{                   //请求错误后执行函数
        this.$notify({
              title: '提示',
              message: '用户访问错误',
              duration: 3000
            });
        console.log("err:" + err)
      })
    },
    afterlogister(res)
    {
        //console.log("res:",res)
        console.log("res.data:",res.data)
        if(res.data == "SUCCESS"){
          this.$router.push('/updownload')	//登录验证成功路由实现跳转
          this.$notify({
            title: '提示',
            message: '用户登录成功',
            duration: 3000
          });
        }else{
          this.$notify({
            title: '提示',
            message: '用户登录失败',
            duration: 3000
          });
        }
    }
  }
}
</script>
