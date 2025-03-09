import { get, post } from "../http/request"

// 注册
export async function registerUser(params: any): Promise<any> {
  return post({
    url: "/user/information/registerUser",
    params,
  });
}

// 登录
export async function getUserDetail(params: any): Promise<any> {
  return post({
    url: "/user/information/getUserDetail",
    params,
  });
}

// 注册获取邮箱验证码
export async function sendRegisterCodeByMail(params: any): Promise<any> {
  return post({
    url: "/user/information/sendRegisterCodeByMail",
    params,
  });
}

// 校验注册验证码并将用户生效
export async function checkCodeAndRegisterUser(params: any): Promise<any> {
  return post({
    url: "/user/information/checkCodeAndRegisterUser",
    params,
  });
}
