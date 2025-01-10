/*
 * @Author: sun
 * @Date: 2022-11-01 12:32:53
 * @LastEditTime: 2022-11-30 22:11:34
 * @Description: Do not edit
 */
import cache from "@/utils/cache";
import Request from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const sjRequestObj = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
export default sjRequestObj;
