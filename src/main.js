import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//導入css
import './assets/statics/site/css/style.css'
Vue.config.productionTip = false
//導入組件
import index from './components/index.vue'
import detail from './components/detail.vue'
//引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入moment
import moment from 'moment'
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
//引入iView
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
//使用路由
Vue.use(VueRouter)
const routes = [
  {path:'/',redirect:'/index'},
  {path:'/index',component: index},
  {path:'/detail/:artID',component: detail}
]
//創建router實例
const router = new VueRouter({
  routes 
})
Vue.filter('shortTime',function(value){
  return moment(value).format('YYYY:MM:DD')
})
Vue.filter('formatTime',function(value){
  return moment(value).format('YYYY/MM/DD/HH:mm:ss')
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
