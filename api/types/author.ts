interface userInfo{
    avatar: string
    nickname: string
    homePath: string
    introduce: string
}
interface contact {
    github: string
    gitee: string
    juejin: string
    email: string
    csdn: string
}
interface AuthorModel{
    userInfo: userInfo
    contact: contact
}

export interface authorInfoResultModel {
    code: number
    message: string | null
    result: AuthorModel
}