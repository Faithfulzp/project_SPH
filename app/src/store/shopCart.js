import { reqCartList, reqCheckCart, reqDeleteCart } from '@/api'

export default {
    namespaced: true,
    //书写业务逻辑,和向服务器获取数据
    actions: {
        // 获取购物车商品数据
        async getShopCarList(context) {
            let result = await reqCartList();
            if (result.code == 200) {
                context.commit('GETSHOPCARLIST', result.data);
            }
        },
        // 修改购物车的某个产品的选中状态
        async checkCartById(context, { skuId, isChecked }) {
            let result = await reqCheckCart(skuId, isChecked);
            if (result.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error("faile"));
            }
        },
        // 全选商品
        checkAllCart(context, isChecked) {
            let promiseAll = []; // 将成功返回的promise存入
            // 遍历每个数组元素
            context.getters.shopCart.cartInfoList.forEach((item) => {
                // 将每个商品的id和选中状态传给函数checkCartById进行选中
                let promise = context.dispatch("checkCartById", {
                    skuId: item.skuId,
                    isChecked: isChecked,
                });
                // 存储成功删除的返回的promise
                promiseAll.push(promise);
            });
            // Promise.all判断所有的promise是否成功，有一个失败则失败返回reject，全部成功才返回成功
            return Promise.all(promiseAll);
        },
        // 删除购物车某个产品
        async deleteCart(context, skuId) {
            let result = await reqDeleteCart(skuId);
            // 当只需要提交而不需要存储数据时，要加判断是否请求成功
            if (result.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error("faile"));
            }
        },
        // 删除全部选中的商品
        deleteAllCheckedCart(context) {
            let promiseAll = []; // 将成功返回的promise存入
            // 遍历全部数据，context可以拿到state，getters,commit,dispath
            context.getters.shopCart.cartInfoList.forEach((item) => {
                // 必须加判断数据的ischecked是否为1，为1才调用函数deleteCart删除数据，否则为空
                let promise = item.isChecked == 1 ? context.dispatch("deleteCart", item.skuId) : "";
                // 存储成功删除的返回的promise
                promiseAll.push(promise);
            });
            // Promise.all判断所有的promise是否成功，有一个失败则失败返回reject，全部成功才返回成功
            return Promise.all(promiseAll);
        }
    },
    //操作state
    mutations: {
        GETSHOPCARLIST(state, shopCarList) {
            state.shopCarList = shopCarList;
        }
    },
    //state：存储仓库数据
    state: {
        shopCarList: [],
    },
    //理解为计算属性，用于简化仓库仓库数据，便于组件获取
    getters: {
        //简化购物车数据 
        shopCart(state) {
            return state.shopCarList[0] || [];
        }
    },
}
