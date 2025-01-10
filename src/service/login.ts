import request from "@/service/request"

export interface UserLoginParams {
  username: string;
  password: string;
  captcha: string
}

export function login(data: UserLoginParams) {
  return request.post("/login",data);
}