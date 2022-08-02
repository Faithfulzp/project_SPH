// 引入uuid库
import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    // 获取本地存储的uuid唯一标识
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 如果本地没有则生成一个唯一标识，并放入本地存储
    if (!uuid_token) {
        // 生成用户唯一标识
        uuid_token = uuidv4();
        // 存储到本地存储
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
}