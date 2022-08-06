import Vue from 'vue'
import App from './App.vue'
// 按需引入element-ui
import { Button, MessageBox } from 'element-ui';
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
// 注册element-ui的第一种方法：注册为全局组件
Vue.component(Button.name, Button);
// 注册element-ui的第二种方法:挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router';

//引入路由
import store from '@/store';

//全局引入API接口
import * as API from "@/api";

Vue.config.productionTip = false;

//引入MockServer.js----mock数据
import '@/mock/mockServe';

//引入swiper样式
import 'swiper/css/swiper.css';

// 引入阿里巴巴图标库样式
import '../public/font/iconfont.css';

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
import lm from "@/assets/images/cat.gif";// 懒加载的图片
// 使用图片懒加载插件,可以把:src替换成v-lazy,既可以动态显示图片，当图片加载慢时，显示设置的图片
Vue.use(VueLazyload, {
  loading: lm,// 设置图片
})

// 使用自定义插件
import myPlugins from './plugins/myPlugins';
Vue.use(myPlugins, {
  name: "upper",
})

// 引入表单验证插件Vee-Validate
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
    // 在Vue原型上绑定API的接口，全局可用
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  store
}).$mount('#app')
