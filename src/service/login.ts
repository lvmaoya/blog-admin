import { post } from "./apiService";

export interface UserLoginParams {
  username: string;
  password: string;
  captcha: string
}

export interface User {
  id: number;
  name: string;
  nickName: string;
  email: string;
  mobile: string;
  otherContact: string;
  introduce: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginResponseData {
  token: string;
  user: User;
}
export async function login(data: UserLoginParams) {
  return await post<UserLoginResponseData, UserLoginParams>("/login", data);
}