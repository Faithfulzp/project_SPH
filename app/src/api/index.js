// 当前这个模块：API进行统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax";

// 三级联动接口
//：/api/product/getBaseCategoryList get请求 无参数
export const reqCategoryList = () => {
    // 发请求：axios发请求返回结果为promise对象
    return requests.get('/product/getBaseCategoryList');
};
//请求banner数据
export const reqGetBannerList = () => {
    // 发请求：axios发请求返回结果为promise对象
    return mockRequests.get('/banner');
};
//请求floor数据
export const reqGetFloorList = () => {
    // 发请求：axios发请求返回结果为promise对象
    return mockRequests.get('/floor');
}
//当前这个接口，给服务器传递一个默认参数params【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params });
//获取商品详情的数据 /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });
// 将加购和更新购物车数据传给服务器
// /api/cart/addToCart/{ skuId }/{ skuNum }传过去的数据是个对象
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
//获取购物车数据的数据 /api/cart/cartList
export const reqCartList = (skuId) => requests({ url: "/cart/cartList", method: "get" });
// 删除购物车数据 /api/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "DELETE" });
// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCart = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "GET" });