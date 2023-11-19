export interface articleItem{
    tagId?:string
    articleId: string
    title: string
    summary: string
    cover: string
    views: number
    publishTime: Date
    updateTime: Date
}

export interface articleListModel {
    list: articleItem[]
    total: number
}

export interface ResultArticleModel {
    code: number
    message: string | null
    result: articleListModel
}

export interface articleDetail {
    type: string
    data: Buffer
}

export interface ResultDetailModel {
    code: number
    message: string | null
    result: articleDetail
}
