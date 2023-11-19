<script setup lang="ts">
import { routeType } from './types'
import { getUserInfoApi } from '../../../api/users'
import { useAuthorStore } from '~/store/modules/author';
import { useTouristStore } from '~/store/modules/tourist';
import { authorInfoResultModel } from '../../../api/types/author'
const routeArr: routeType[] = [
    {
        title: '主页',
        toPath: '/home',
        icon: 'tdesign:city-ancient'
    }, {
        title: '笔记',
        toPath: '/articles',
        icon: 'tdesign:article'
    }, {
        title: '项目经历',
        toPath: '/projects',
        icon: 'tdesign:logo-codesandbox'
    }, {
        title: '闲谈',
        toPath: '/talk',
        icon: 'tdesign:chat-bubble-smile'
    }, {
        title: '友链',
        toPath: '/friendsLink',
        icon: 'tdesign:usergroup'
    }, {
        title: '博主',
        toPath: '/authorinfo',
        icon: 'tdesign:user-vip'
    }
]
const authorStore = useAuthorStore()
const touristStore = useTouristStore()
const avatar = ref('')
const infoInit = () => {
    getUserInfoApi()
        .then((res: any) => {
            if (res.code == 200) {
                const { result } = res
                authorStore.init(result)
            }
        }).finally(() => {
            avatar.value = authorStore.userInfo!.avatar
        })
    touristStore.init()
}
infoInit()
</script>
<template>
    <div>
        <div
            class="z-50 flex items-center justify-between w-screen h-16 px-10 font-mono font-semibold bg-white border-b-0 border-teal-500 bg-opacity-80">
            <div class="">
                <NuxtLink class="flex-auto h-16 p-2" to="/">六时的Blog</NuxtLink>
            </div>
            <div class="flex-auto w-96"></div>
            <div class="flex items-center flex-auto">
                <NuxtLink v-for="(item, index) in routeArr" :key="index" :to="item.toPath"
                    class="flex items-center justify-center flex-auto p-2 rounded-lg after:w-0 after:h-2 after:absolute after:top-12 after:rounded-lg after:duration-150 hover:after:w-16 hover:after:bg-teal-400">
                    <Icon class="m-2.5" :name="item.icon" />
                    {{ item.title }}
                </NuxtLink>
                <div
                    class="flex items-center justify-center w-10 h-10 overflow-hidden duration-150 rounded-lg hover:shadow-lg">
                    <NuxtLink to="/authorinfo">
                        <img class="w-10 h-10 " style="object-fit: cover;" :src="avatar" alt="avatar">
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>