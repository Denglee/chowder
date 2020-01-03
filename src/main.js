import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Axios from 'axios'

// import '../mock/index.js'

/*引入 element*/
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
  size: 'middle'
});



/*import echarts from'echarts'
Vue.prototype.$echarts = echarts //将echarts注册成Vue的全局属性*/

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
/*引入折线图/柱状图等组件*/
require('echarts/lib/chart/line')  //折线
require('echarts/lib/chart/bar')   //柱状
require('echarts/lib/chart/funnel')  //漏斗
require('echarts/lib/chart/pie')    //饼图

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例滚动

//vue全局注入echarts
Vue.prototype.$echarts = echarts

/*引入自己的全局的css*/
import '@/assets/css/global.scss'
import '@/assets/css/animate37.css'

/*引用全局js*/
import global from  '@/assets/js/global.js'
Vue.prototype.GLOBAL = global


/*注册全局组件*/
// import topTabbar from '@/components/topTabbar'
// Vue.component(topTabbar.name,topTabbar);

/*全局 通用iframe 组件*/
import publicIframe from '@/components/publicIframe/publicIframe'
Vue.component(publicIframe.name,publicIframe);

// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

// 引用md5
// import md5 from 'js-md5';

/*引用axios*/
Vue.prototype.$axios=Axios;

/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境发布 地址
    Axios.defaults.baseURL = '/';//路径

  } else {
    //test 测试环境 测试地址 http://vikily.f3322.net:10007
    Axios.defaults.baseURL = 'http://192.168.0.133:20000';//路径
    config.optimization.minimize(false)
  }
} else {
  // dev 开发环境 本地 /api
  Axios.defaults.baseURL = '/api';
  // Axios.defaults.baseURL = 'http://vikily.f3322.net:10007';
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

