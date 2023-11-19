export interface tagItem{
    tagId: string
    tagname: string
    tagIcon: string
    hasNums: number
    publishTime: Date
    updateTime: Date
}
interface tagListModel {
    list: tagItem[]
    total: number
}
export interface ResultTagsModel {
    code: number
    message: string | null
    result: tagListModel
}