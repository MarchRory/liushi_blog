export interface commentPageParamsModel {
    articleId: string,
    pageNum: number,
    pageSize: number
}

export interface commentItem {
    articleId: string,                                         // 评论所属的文章id
    commentId?: string,                                        // 评论自身的id
    floorId: string,                                           // 该条评论所属的楼主评论id
    floorOwnerEmail: string,                                   // 该条评论所在楼层的楼主邮箱
    qqEmail: string,                                           // 评论者邮箱,
    avatar: string,                                            // 评论者头像
    nickname: string,                                          // 评论者昵称
    content: string,                                           // 评论内容
    childCommentCnt: number,                                   // 子评论数
    identity: number,                                          // 评论者身份: 1 -> 博主, 0 -> 楼主, -1 -> 楼层中普通用户
    time: Date | null,                                         // 评论时间
    reviewedCommentId?:string,                                 // 被评论项id
    reviewedEmail: string,                                     // 被评论者邮箱
    reviewedNickname: string,                                  // 被评论者昵称
    children?: commentItem[]                                   // 子评论列表
}

export interface childrenListParams {
    parentCommentId: string
}

interface parentCommentList {
    list: commentItem[],
    parentTotal: number,
    allCommentTotal: number
}

export interface parentCommentResult {
    code: number,
    message: string | null,
    result: parentCommentList
}

export interface childrenCommentResult{
    code: number,
    message: string | null,
    result: commentItem[]
}

export interface addCommentResult{
    code: number,
    message: string | null,
    result: string
}