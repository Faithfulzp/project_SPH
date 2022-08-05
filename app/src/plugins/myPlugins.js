// Vue插件要对外暴露一个对象
let myPlugins = {};
// 当Vue.use()时会调用
myPlugins.install = function (Vue, options) {
    /* 
    第一个参数是Vue，就是一整个Vue身上的组件等都能用
    第二个参数是Vue.use()使用插件时，传入的一个对象参数
    Vue.prototype.$bus
    Vue.directive
    Vue.component
    */
    // 注册一个全局指令
    // options.name: 第一个参数是全局指令的名字，使用时如：v-upper
    // (element,params),element:拿到v-upper所绑定的元素。params:绑定元素上的配置项（value等）
    Vue.directive(options.name, (element, params) => {
        // 将元素的innerHTML变为大写
        element.innerHTML = params.value.toUpperCase();
    })
}

export default myPlugins;