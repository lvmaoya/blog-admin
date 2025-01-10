/*
 * @Author: sun
 * @Date: 2022-11-01 12:36:23
 * @LastEditTime: 2023-01-04 16:29:43
 * @Description: Do not edit
 */
let BASE_URL: string;
const TIME_OUT = 10000;

if (import.meta.env.MODE === "development") {
  BASE_URL = "http://localhost:8080";
} else if (import.meta.env.MODE === "production") {
  BASE_URL = "https://lvmaoya.cn:3002";
} else {
  BASE_URL = "https://lvmaoya.cn:3000";
}
export { BASE_URL, TIME_OUT };
