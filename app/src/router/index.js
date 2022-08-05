//配置路由的地方
import Vue from "vue";
import VueRouter from 'vue-router';
import routes from "./routes";
import store from "@/store";
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
let router = new VueRouter({
    routes,
    // 滚动行为，当路由跳转之后页面所在位置
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
    /* 
    to:目标路由地址
    from:当前路由地址
    next:放行,next()放行，next(path)放行到指定路由
    */
    // 获取token
    let token = store.state.user.token;
    // 获取用户名信息
    let name = store.state.user.userInfo.name;
    // 判断token是否存在
    // 因为登录之后token会被存入本地存储，所以登录后再刷新网页还是会进入判断
    if (token) {
        // 如果登录了还去登录界面，会被跳回首页
        if (to.path == "/login") {
            next("/home");
        } else {
            // 如果不去登录页，用户名存在则正常放行
            if (name) {
                next();
            } else {
                // 因为用户名没有在本地存放用户名，所以刷新网页仓库用户名会消失
                // 其实也可以想token一样存放到本地就不用担心刷新用户名会消失了
                try {
                    // 重新获取用户名后再放行，切左上角用户名存在
                    await store.dispatch("user/getUserInfo");
                    next();
                } catch (error) {
                    // 如果请求失败，可能是token过期了，需要重新登录，重新获取token
                    alert(error.message);
                    // token过期需要清空数据，重新登录
                    await store.dispatch("user/userLogout");
                    next("/login");
                }
            }
        }
    } else {
        // 没登录，游客身份不可去的组件【trade交易页面，pay/paysuccess支付页面，center订单中心页面】
        let toPath = to.path;
        // 如果去的是这些页面
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            // 则跳转到登录界面，并携带一个query参数，但登陆之后，会自动跳到想去的那个页面
            next("/login?rediect=" + toPath);
        } else {
            // 如果去的不是以上页面，则都放行
            next();
        }
    }
})

// 向外暴露路由
export default router;