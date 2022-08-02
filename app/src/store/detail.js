import { reqGoodsInfo, reqAddOrUpdateCart } from "@/api";
import { getUUID } from "@/utils/uuid_token"
export default {
    namespaced: true,
    //书写业务逻辑,和向服务器获取数据
    actions: {
        async getGoodsList(context, skuId) {
            let result = await reqGoodsInfo(skuId);
            if (result.code == 200) {
                context.commit('GETGOODSLIST', result.data);
            }
        },
        // 服务器post写入数据成功后，没有返回其他数据
        // 所以更新购物车数据，不需要存储数据
        async addOrUpdateCart(context, { skuId, skuNum }) {
            let result = await reqAddOrUpdateCart(skuId, skuNum);
            if (result.code == 200) {
                // 返回非空即为成功，返回Promise.resolve也可以
                return "ok";
            } else {
                // 返回reject表示错误
                return Promise.reject(new Error('faile'));
            }
        }
    },
    //操作state
    mutations: {
        GETGOODSLIST(state, goodsList) {
            state.goodsList = goodsList;
        }
    },
    //state：存储仓库数据
    state: {
        goodsList: {},
        // 拿唯一标识
        uuid_token: getUUID(),
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {
        // 记得 将state传给getters
        // 商品分类信息
        categoryView(state) {
            // 防止数据没回来时，计算用的是仓库中的state的空对象时返回的是undefined会报警告，所以加个空数组
            return state.goodsList.categoryView || {};
        },
        // 产品数据
        skuInfo(state) {
            // 防止数据没回来时，计算用的是仓库中的state的空对象时返回的是undefined会报警告，所以加个空数组
            return state.goodsList.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.goodsList.spuSaleAttrList || {};
        }
    },
}
