<template>
  <div id="app1">
    <!--<myMovie v-for="movie in movies":key="movie.id" title="movie.title"  rating="movie.rating"></myMovie> -->
    <!--<myMovie v-for="movie in movies" :key="movie.id " :title="movie.title" :rating="movie.rating"></myMovie>-->
    <!--<myUpDown></myUpDown> -->
    <myLogin>
    </myLogin>
  </div>
</template>

<script>
///import myUpDown from  "./components/myUpDown.vue"
import myLogin from "./components/myLogin.vue"
export default {
  name: 'App',
  data:function()
  {
    return {
      movies:
      [
        {id:1,title:"11",rating:8.9},
        {id:1,title:"11",rating:9.9},
      ]
    }
  },
  created:function()
  {
      console.log("创建组件aue")
      //一般是在组件创建之后发送axios网络请求
  },
  mounted:function()
  {
      console.log("组件被渲染")
  },
  components: {
   myLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
