import router from "@/router";
import cache from "@/utils/cache";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
// import { JSEncrypt } from "JSEncrypt";

import axios from "axios";


class Request {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    // 全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (error) => {
        switch (error.response.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          default:
        }
        return error;
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}
export default Request;
