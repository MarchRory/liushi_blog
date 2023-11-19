<script setup lang="ts">
import { routeArr } from './types'
const routeArr: routeArr[] = [
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
</script>
<template>
    <div class=" w-screen h-16 border-b-2 border-teal-500 flex px-10 items-center justify-between font-mono
            font-semibold">
        <div class="">
            <NuxtLink class="flex-auto p-2 h-16" to="/">六时的Blog</NuxtLink>
        </div>
        <div class="flex flex-auto w-64">
            <NuxtLink v-for="(item, index) in routeArr" :key="index" :to="item.toPath"
                class="flex-auto flex items-center justify-center p-2 rounded-lg min-w-fit
                           after:w-0 after:h-2 after:absolute after:top-12 after:rounded-lg after:duration-150 hover:after:w-16 hover:after:bg-teal-400">
                <Icon class="m-2.5" :name="item.icon" />
                {{ item.title }}
            </NuxtLink>
            <div class="rounded-full hover:shadow-lg duration-150 w-14 h-14 overflow-hidden">
                <NuxtLink to="/authorinfo">
                    <img src="" alt="avatar">
                </NuxtLink>
            </div>
        </div>
    </div>
    <slot />
</template>