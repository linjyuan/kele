// -------------------- 辅助函数 --------------------
// 参数过滤（示例：移除空值参数）
export function filterParams(params: Record<any, any>) {
  const filtered: Record<any, any> = {};
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      filtered[key] = params[key];
    }
  });
  return filtered;
}

// 处理业务错误
export function handleBusinessError(code: number, message: string) {
  switch (code) {
    case 401:
      // Token 过期，跳转登录页
      window.location.href = '/index/login';
      break;
    default:
      console.error(`业务错误 [${code}]: ${message}`);
      break;
  }
}

// 处理 HTTP 错误
export function getMessageInfo(status: number): string {
  let msg = ""
  switch (status) {
    case 401:
      msg = '未授权，请重新登录';
      break;
    case 404:
      msg = '请求资源不存在';
      break;
    case 500:
      msg = '服务器内部错误';
      break;
    default:
      msg = '请求失败，请检查网络';
      break;
  }
  return msg
}
