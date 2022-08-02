import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token'
export default {
    namespaced: true,
    //书写业务逻辑,和向服务器获取数据
    actions: {
        // 接收电话，取验证码
        async getCode(context, phone) {
            let result = await reqGetCode(phone);
            if (result.code == 200) {
                context.commit('GETCODE', result.data);
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        },
        // 完成注册请求 ，data:电话号，密码，验证码
        async userRegister(context, data) {
            let result = await reqUserRegister(data);
            if (result.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        },
        // 登录请求 ，data:电话号，密码
        async userLogin(context, data) {
            let result = await reqUserLogin(data);
            if (result.code == 200) {
                // 获取关键的token【唯一标识】
                context.commit("USERLOGIN", result.data.token)
                // 永久化存储：本地存储token
                setToken(result.data.token);
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        },
        // 获取用户信息
        async getUserInfo(context) {
            let result = await reqGetUserInfo();
            if (result.code == 200) {
                context.commit("GETUSERINFO", result.data);
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        },
        // 退出登录
        async userLogout(context) {
            // 通知服务器清除服务器数据
            let result = await reqLogout();
            if (result.code == 200) {
                // 调用mutations函数清除state数据
                context.commit("CLEARDATA");
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        }
    },
    //操作state
    mutations: {
        GETCODE(state, code) {
            state.code = code;
        },
        USERLOGIN(state, token) {
            state.token = token;
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        CLEARDATA(state) {
            // 清空仓库数据
            state.token = "";
            state.userInfo = {};
            // 清空本地存储的token
            removeToken();
        }
    },
    //state：存储仓库数据
    state: {
        code: "",
        token: getToken(), //从本地取token，当登录完成后，在主页刷新也能拿到用户名信息
        userInfo: {},
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {
    },
}