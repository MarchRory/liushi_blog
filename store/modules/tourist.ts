import { defineStore } from "pinia"
import { touristItem } from "~/components/comments/types"

export const useTouristStore = defineStore('touristStore', {
    state: ():touristItem => ({
        qqEmail: '',
        nickname: ''
    }),
    actions:{
        init(){
            let storage = localStorage.getItem('liushi_blog_touristinfo')
            if(storage){
                const tourisStorage = JSON.parse(storage) as touristItem
                this.qqEmail = tourisStorage.qqEmail
                this.nickname = tourisStorage.nickname
            }
        },
        setTouristInfo(touristInfo: touristItem){
            localStorage.setItem('liushi_blog_touristinfo', JSON.stringify(touristInfo))
            this.qqEmail = touristInfo.qqEmail
            this.nickname = touristInfo.nickname
        }
    },
    getters:{
        getTouristInfo: (state) => {
            return { email: state.qqEmail, nickname: state.nickname }
        }
    }
})