import httpRequest from "~/utils/http";
import { authorInfoResultModel } from './types/author'
enum API {
    author = '/front/authorInfo',
}

export const getUserInfoApi = () => {
    return httpRequest.get<authorInfoResultModel>(API.author)
}