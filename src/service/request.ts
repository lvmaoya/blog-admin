import axios from 'axios';

let BASE_URL;

if (import.meta.env.MODE === "production") {
    BASE_URL = "https://lvmaoya.cn:3002";
} else {
    BASE_URL = "http://localhost:8080";
}
axios.defaults.withCredentials = true
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;