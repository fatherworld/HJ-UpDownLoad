import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import Qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
Vue.config.productionTip = false
Vue.use(ElementUI)
import router from '@/router/index' //index名字可以不写，直接写/router
//Vue.use(axios)
Vue.prototype.$http = axios
Vue.prototype.$Qs = Qs

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。

// 5. 创建并挂载根实例
new Vue({
  router:router,//属性名称和值一直，可以写一个
  render: h => h(App),
}).$mount('#app')


