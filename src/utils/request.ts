// src/utils/request.ts
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import useUserInfoStore from "@/store/user";

// 扩展axios接口
declare module "axios" {
  interface AxiosRequestConfig {
    successCode?: number;
  }
}

// 根据你自己的接口情况来匹配这里的类型，如果没有code,message这些，就没必要
// interface ApiResult<T> {
//   code: number;
//   data: T;
//   message: string;
// }

// const SUCCESS_CODE = 0; // 默认请求成功状态码
class Request {
  private instance: AxiosInstance;
  // 存放取消请求控制器Map
  private abortControllerMap: Map<string, AbortController>;

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);

    this.abortControllerMap = new Map();

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.url !== "/login") {
          const token = useUserInfoStore.getState().token;
          if (token) config.headers!["x-token"] = token;
        }

        const controller = new AbortController();
        const url = config.url || "";
        config.signal = controller.signal;
        this.abortControllerMap.set(url, controller);

        return config;
      },
      Promise.reject
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const url = response.config.url || "";
        this.abortControllerMap.delete(url);
        // const successCode = response.config.successCode || SUCCESS_CODE;
        // if (response.data.code !== successCode) {// 业务错误码，这个如果按照restful的规范返回，就可以不用这个判断了
        //   return Promise.reject(response.data);
        // }
        return response.data;
      },
      (err) => {
        if (err.response?.status === 401) {
          // 登录态失效，清空userInfo，跳转登录页
          useUserInfoStore.getState().clear();
          window.location.href = `/login?redirect=${window.location.pathname}`;
        }

        return Promise.reject(err);
      }
    );
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }

  // 取消指定的请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }

  //   request<T>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
  //     return this.instance.request(config);
  //   }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  //   get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
  //     return this.instance.get(url, config);
  //   }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  //   post<T, D = unknown>(
  //     url: string,
  //     data?: D,
  //     config?: AxiosRequestConfig
  //   ): Promise<ApiResult<T>> {
  //     return this.instance.post(url, data, config);
  //   }

  post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }
}

export const httpClient = new Request({
  timeout: 10 * 1000,
  baseURL: import.meta.env.VITE_API_URL,
});
