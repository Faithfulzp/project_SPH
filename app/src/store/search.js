import { reqGetSearchInfo } from '@/api'

export default {
    namespaced: true,
    //书写业务逻辑,和向服务器获取数据
    actions: {
        async getSearchList(context, params = {}) {
            let result = await reqGetSearchInfo(params);
            if (result.code == 200) {
                context.commit('GETSEARCHLIST', result.data);
            }
        }
    },
    //操作state
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList;
        }
    },
    //state：存储仓库数据
    state: {
        searchList: {},
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {
        attrsList(state) {
            // 防止数据没回来时，计算用的是仓库中的state的空对象时返回的是undefined会报警告，所以加个空数组
            return state.searchList.attrsList || [];
        },
        goodsList(state) {
            return state.searchList.goodsList || [];
        },
        trademarkList(state) {
            return state.searchList.trademarkList || [];
        },
    },
}
