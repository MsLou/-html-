import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initData from './initData/data'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// 初始化数据
Vue.use(initData)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
