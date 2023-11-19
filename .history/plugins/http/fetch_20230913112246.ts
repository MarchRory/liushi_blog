import { ofetch } from "ofetch"

interface Response{
    data: any,
    code: number,
    msg: string,
    status: string,
    body: any
}

export const useRequest = (api:string, options?:any, headers?: any ) => {
    const runtimeConfig = useRuntimeConfig() // 引入nuxt.config.ts中的runtimeConfig
    const defaultHeaders = {
        'Content-Type': 'application/json'
    }
    const defaultOpts:object = {
        baseURL: runtimeConfig.app.baseURL,
        headers: options&&options.headers ? options.headers : defaultHeaders,
        query: options.query || {},
        timeout: options.timeout || 5 * 1000,
        async onRequest({request, options}: {request:Request, options:any}){

        },
        async onRequestError({ request, options, error }: {request: Request, options: any, error: Error}){
            console.log(request, options)
            return error
        },
        async onResponse({request, options, response}: {request: Request, options: any, response: Response}){
            const { data, code } = response
            if(code !== 200){
                let msg:string
                switch (code) {
                    case 408: msg = '请求超时'; break;
                    case 409: msg = response.msg; break;
                    case 425: msg = 'too early'; break;
                    case 429: msg = '请求过多'; break;
                    case 500: msg = '网络异常';break;
                    case 502: msg = 'bad gateway';break;
                    case 503: msg=  '无法提供服务';break;
                    case 504: msg = 'gateway timeout'; break;
                }
            }
        }
    }
}