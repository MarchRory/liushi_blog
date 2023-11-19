// 类型引入
import { UseFetchOptions } from "nuxt/app";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";

/* const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public */
// 限制请求方法
type Methods = "GET" | "POST" | "DELETE" | "PUT";

// 从环境变量获取请求BASE_URL
const API_BASE_URL = 'http://127.0.0.1:8080';
// 定义返回data的格式
export interface IResultData<T> {
  code: number;
  data: T;
  msg: string;
}

// 封装网络请求类
class HttpRequest {

  request<T = any>(
    url: string,
    method: Methods,
    dataParams: any,
    options?: UseFetchOptions<T>,
  ) {
    return new Promise(async (resolve, reject) => {
      // 创建options对象，设置请求的基本参数
      const newOptions: UseFetchOptions<T> = {
        baseURL: API_BASE_URL,
        method: method,
        onRequest() {

        },
        onResponse({ request, response }) {
          const { _data } = response
          const { code } = _data
          if (code !== 200) {
            reject()
          }
          resolve(_data)
        },
        ...options,
      };
      // 根据请求方法放置携带的参数
      if (method === "GET") {
        newOptions.params = dataParams;
      }
      if (method === "POST" || method === "PUT") {
        newOptions.body = dataParams;
      }
      await useFetch(url, { ...newOptions })
    });
  }

  // 封装常用方法, 博客前台一般只用得到get, 但是后面计划中的评论功能用得上post、delete

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "GET", params, options);
  }

  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }

  put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "PUT", data, options);
  }

  delete<T = any>(url: string, options?: UseFetchOptions<T>) {
    return this.request(url, "DELETE", options);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;

