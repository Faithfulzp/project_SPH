import { reqAddressInfo, reqOrderInfo } from '@/api'

export default {
    namespaced: true,
    //书写业务逻辑,和向服务器获取数据
    actions: {
        // 获取用户地址信息
        async getAddressInfo(context) {
            let result = await reqAddressInfo();
            if (result.code == 200) {
                context.commit('GETADDRESSINFO', result.data);
            }
        },
        // 获取订单交易信息
        async getOrderInfo(context) {
            let result = await reqOrderInfo();
            if (result.code == 200) {
                context.commit('GETORDERINFO', result.data);
            }
        }
    },
    //操作state
    mutations: {
        GETADDRESSINFO(state, addressInfo) {
            state.addressInfo = addressInfo;
        },
        GETORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo;
        }
    },
    //state：存储仓库数据
    state: {
        orderInfo: {},
        addressInfo: [],
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {
    },
}
