import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
export default {
    namespaced: true,
    //书写业务逻辑,和向服务器获取数据
    actions: {
        // 通过API里面的接口函数调用，向服务器发送请求，获得数据
        async categoryList(context) {
            let result = await reqCategoryList();
            if (result.code === 200) {
                context.commit('CATEGORYLIST', result.data);
            }
        },
        //获取首页轮播图数据
        async getBannerList(context) {
            let result = await reqGetBannerList(); //promise数据时异步处理，需要两步，所以必须加await等待异步处理结束在进行下一步
            if (result.code === 200) {
                context.commit('GETBANNERLIST', result.data);
            }
        },
        //获取首页轮播图数据
        async getFloorList(context) {
            let result = await reqGetFloorList(); //promise数据时异步处理，需要两步，所以必须加await等待异步处理结束在进行下一步
            if (result.code === 200) {
                context.commit('GETFLOORLIST', result.data);
            }
        },
    },
    //操作state
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList;
        },
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList;
        },
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList;
        }
    },
    //state：存储仓库数据
    state: {
        categoryList: [],
        bannerList: [],
        floorList: []
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {},
}

