import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import toast from 'components/common/toast/index'
import FactClick from 'fastclick'
import VueLazyload  from "vue-lazyload";
import {request} from "./network/request";

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装自定义toast插件
Vue.use(toast)

//解决移动端300ms延迟
FactClick.attach(document.body)

//使用图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
