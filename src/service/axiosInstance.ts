import cache from '@/utils/cache';
import axios from 'axios';

let BASE_URL;

if (import.meta.env.MODE === "production") {
    BASE_URL = "https://lvmaoya.cn:3002";
} else {
    BASE_URL = "http://localhost:8080";
}
// src/api/axiosInstance.ts

axios.defaults.withCredentials = true

// 创建 Axios 实例
const instance = axios.create({
    baseURL: BASE_URL, // 从环境变量获取 baseURL，如果没有则使用默认值
    timeout: 100000, // 请求超时时间
    withCredentials: true, // 允许携带凭证
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 可以在这里添加 token 等请求头信息
        const token = cache.getCache('token');
        if (token && config.headers) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 可以在这里对响应数据做统一处理，如错误码判断等
        return response;
    },
    (error: any) => {
        // 可以在这里对响应错误做统一处理
        return Promise.reject(error);
    }
);

export default instance;