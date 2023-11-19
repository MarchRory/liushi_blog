import httpRequest from "~/utils/http";
import { ResultTagsModel } from './types/tags'
import { pageParamsModel } from "./types/index";

enum API {
    tagList = '/front/tagList'
}

export const getTagsApi = (tagListparmas:pageParamsModel) => {
    return httpRequest.get<ResultTagsModel>(API.tagList, tagListparmas)
}