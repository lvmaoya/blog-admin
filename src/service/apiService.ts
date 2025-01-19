// src/api/apiService.ts
import axiosInstance from './axiosInstance';

// 通用的 GET 请求方法
export async function get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
}

// 通用的 POST 请求方法
export async function post<T, D>(url: string, data?: D): Promise<T> {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
}

// 通用的 PUT 请求方法
export async function put<T, D>(url: string, data?: D): Promise<T> {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
}

// 通用的 DELETE 请求方法
export async function del<T>(url: string): Promise<T> {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
}