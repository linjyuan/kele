import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import { filterParams, getMessageInfo, } from '@/api/utils';
import { ElMessage } from 'element-plus';
import type { ApiResponse } from '../api/index.type';

const TIMEOUT = 60000;

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量读取接口基础路径
  timeout: TIMEOUT, // 超时时间
});


// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求前统一处理（如添加 token）
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 可在此处过滤或转换请求参数
    if (config.params) {
      config.params = filterParams(config.params); // 自定义参数过滤函数
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -------------------- 响应拦截器（过滤器） --------------------
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据统一处理（如提取 data 字段）
    const res = response.data;
    // 假设业务状态码 200 表示成功
    if (res.code === 200) {
      return res.data; // 直接返回业务数据
    } else {
      // 处理业务错误（如 token 过期）
      // handleBusinessError(res.code, res.message);
      ElMessage({
        message: getMessageInfo(response.status),
        type: 'error',
      });
      return Promise.reject(res);
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 错误（如 404、500）
    // handleHttpError(error.response?.status);
    ElMessage({
      message: "网络错误，请稍后重试！",
      type: 'error',
    });
    return Promise.reject(error);
  }
);


// 所有接口均会按照这样的格式返回，那么我们可以使用TS设计一个类型，便于我们获得类型提示与校验。
// 我们将他放置在 /src/utils/types.ts 下，并且可以传入一个泛型进行 data 数据格式的类型校验。
export interface BaseResponse<T = any> {
  code: number | string;
  message: string;
  data: T;
}

// BaseResponse 为 res.data 的类型
// T 为 res.data.data 的类型 不同的接口会返回不同的 data 所以我们加一个泛型表示
// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<BaseResponse>>(conf)
      .then((res: AxiosResponse<BaseResponse>) => {
        const data = res.data;
        // 如果data.code为错误代码返回message信息
        if (data.code != 1) {
          ElMessage({
            message: data.message,
            type: 'error',
          });
          reject(data.message);
        } else {
          ElMessage({
            message: data.message,
            type: 'success',
          });
          // 此处返回data信息 也就是 api 中配置好的 Response类型
          resolve(data.data as T);
        }
      });
  });
};


// -------------------- 封装 GET/POST 方法 --------------------
export function get<T = any>(
  { url, params, config }: {
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  }
): Promise<any> {
  return service.get<ApiResponse<T>>(url, { ...config, params }).then((res) => res.data);
}

export function post<T = any>({ url, params, config }: {
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
}
): Promise<any> {
  return service.post<ApiResponse<T>>(url, params, config).then((res) => res.data);
}

export default requestInstance
