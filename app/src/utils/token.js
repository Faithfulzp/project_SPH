// 将token设置为本地存储
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}
// 获取本地存储的token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}
// 清除本地存储的token
export const removeToken = () => {
    return localStorage.removeItem("TOKEN");
}