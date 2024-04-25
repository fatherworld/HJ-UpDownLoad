
import VueRouter from "vue-router"
import Vue from "vue"
import myLogin from "@/components/myLogin"
import myUpDown from "@/components/myUpDown"
Vue.use(VueRouter)

const router = new VueRouter(
  {
     routes:
     [
      {path:'/login',component:myLogin,
    children:[
      //{path:"in",component:in},
    ]
  },
      {path:'/updownload',component:myUpDown}
    ] 
  }
)
export default router