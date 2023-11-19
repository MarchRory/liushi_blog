export interface friendLinkItem {
    userId: string | number
    nickname: string
    homePath: string
    avatar: string
    introduce: string | null
}

export interface friendsResult {
    list: friendLinkItem[]
    total: number
}

export interface friendsResultModel {
    code: number
    message: string | null
    result: friendsResult
}