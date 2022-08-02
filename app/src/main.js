import Vue from 'vue'
import App from './App.vue'

// 三级联动组件 ---全局组件
import TypeNav from '@/components/TypeNav';
//轮播图
import Carousel from '@/components/Carousel';
// 分页器
import Pagination from '@/components/Pagination';
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//引入路由
import router from '@/router';

//引入路由
import store from '@/store';

Vue.config.productionTip = false;

//引入MockServer.js----mock数据
import '@/mock/mockServe';

//引入swiper样式
import 'swiper/css/swiper.css';
// 引入阿里巴巴图标库样式
import '../public/font/iconfont.css'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册路由
  router,
  store
}).$mount('#app')
