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
// 获得注册验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "GET" });
// 完成注册，发送数据 /api/user/passport/register POST ,data:电话号，密码，验证码
export const reqUserRegister = (data) => requests({ url: "/user/passport/register", method: "POST", data });
// 登录业务，发送数据 /api/user/passport/login POST ,data:电话号，密码
export const reqUserLogin = (data) => requests({ url: "/user/passport/login", method: "POST", data });
// 登录之后获取用户信息【需要在请求拦截器中带着token向服务器要数据】/api/user/passport/auth/getUserInfo GET
export const reqGetUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: "GET" });
// 退出登录接口 /api/user/passport/logout get
export const reqLogout = () => requests({ url: "/user/passport/logout", method: "GET" });
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: "GET" });
// 获取订单交易信息 /api/order/auth/trade get
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "GET" });
// 提交订单信息 /api/order/auth/submitOrder?tradeNo={tradeNo}  post tradeNo:用户表示，data：其他信息
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: "post", data });
// 订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqGetPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });
// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });









