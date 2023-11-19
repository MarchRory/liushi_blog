import { defineStore } from "pinia";
export interface contactType {
    github: string | null
    gitee: string | null
    csdn: string | null
    juejin: string | null
    email: string | null
}
export interface authorType {
    nickname: string | null
    avatar: string
    homePath: string | null
    introduce: string | null
}
interface stateType {
    userInfo: authorType | null
    contact: contactType | null
}
export const useAuthorStore = defineStore('authorStore', {
    state: (): stateType => ({
        userInfo: {} as authorType,
        contact: {} as contactType
    }),
    actions: {
        init(authorInfo: stateType) {
            this.userInfo = authorInfo.userInfo
            this.contact = authorInfo.contact
        },
    },
    getters: {
        getAuthorInfo(): stateType {
            return { userInfo: this.userInfo, contact: this.contact }
        },
    }
})