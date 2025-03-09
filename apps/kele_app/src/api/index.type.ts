// 定义通用响应结构（根据后端接口调整）
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 定义请求参数过滤函数类型
export type ParamsFilter = (params: Record<string, any>) => Record<string, any>;
