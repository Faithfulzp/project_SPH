//配置路由的地方
import Vue from "vue";
import VueRouter from 'vue-router';
import routes from "./routes";
//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push和replace备份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push和replace
//第一个参数告诉原push方法，往哪跳转(传递哪些参数)
//call和apply区别
//相同点：都可以调用函数一次，都可以穿该函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {//this是修改函数上下文
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {//this是修改函数上下文
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//创建一个路由实例
//配置路由
export default new VueRouter({
    routes,
    // 滚动行为，当路由跳转之后页面所在位置
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})