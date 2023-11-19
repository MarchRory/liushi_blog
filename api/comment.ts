import httpRequest from "~/utils/http";
import * as commentTypes from './types/comment'

enum API {
    comment = '/front/comment',
    childrenComment = '/front/comment/children'
}
export const getParentCommentListAPI = async (params: commentTypes.commentPageParamsModel) => {
    return await httpRequest.get<commentTypes.parentCommentResult>(API.comment, params)
}

export const getChildrenCommentListAPI = async (parentCommentId: commentTypes.childrenListParams) => {
    return await httpRequest.get<commentTypes.childrenCommentResult>(API.childrenComment+`?parentCommentId=${parentCommentId}`)
}

export const addCommentAPI = async (data: commentTypes.commentItem) => {
    return await httpRequest.post<commentTypes.addCommentResult>(API.comment, data)
}

export const delCommentAPI = async (articleId: string, commentId: string, parentCommentId: string) => {
    return await httpRequest.delete(`${API.comment}/${articleId}/${commentId}/${parentCommentId}`)
}
