import httpRequest from "~/utils/http";
import { pageParamsModel } from "./types/index";
import { ResultArticleModel, ResultDetailModel } from './types/article'
interface articleListParamsModel extends pageParamsModel {
    tagId: string
}

enum API {
    getArticleList = '/front/articlesList',
    getArticleDetail = '/front/getArticleDetail',
}

export const getArticleList = async (articleListParams: articleListParamsModel) => {
    return await httpRequest.get<ResultArticleModel>(API.getArticleList, articleListParams)
}

export const getArticleDetail = async (articleId: string) => {
    return await httpRequest.get<ResultDetailModel>(API.getArticleDetail, {
        articleId: articleId
    })
}