import { reqGetCode, reqUserRegister } from '@/api';
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
        }
    },
    //操作state
    mutations: {
        GETCODE(state, code) {
            state.code = code;
        }
    },
    //state：存储仓库数据
    state: {
        code: "",
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {
    },
}