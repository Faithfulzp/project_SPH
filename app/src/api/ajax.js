//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
// 引入仓库
import store from "@/store";
// 1、利用axios对象的方法create，创建一个axios实例
// 2、request就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会自带api
    baseURL: '/api',
    // 代表请求超时的时间5s
    timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出之前做一些事情
requests.interceptors.request.use((config) => {
    // 判断仓库中是否有唯一标识
    if (store.state.detail.uuid_token) {
        // 请求头添加字段，携带给后台，该字段和后台商量好
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 请求头携带厂库中的token
    if (store.state.user.token) {
        // 请求头添加字段，携带给后台，该字段和后台商量好
        config.headers.token = store.state.user.token;
    }
    //进度条结束
    nprogress.start();
    // config:配置对象，对象里有headers请求头
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    // 成功的回调函数：服务器响应数据回来后，响应拦截器检测到做的事
    return res.data;
}, (error) => {

    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
});
//暴露
export default requests;