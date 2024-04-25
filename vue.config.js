const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  /*
  //配置axios的后端访问地址，后面通过axios发送请求，就只需要写10002后面的地址就可以了
  proxyTable:{
    '/api': {
      target:`http://localhost:10002`,
      changeOrigin: true,
      ws: true,
      // pathRewrite: {
      //   '^/api': ''
      // }
    }
  },
  */
  devServer: { port: 8082 ,
      }
  }
)

