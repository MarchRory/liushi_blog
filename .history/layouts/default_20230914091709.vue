<script setup lang="ts">
import { routeArr } from './types'
const routeArr: routeArr[] = [
    {
        title: '首页',
        toPath: '/',
        icon: 'tdesign:city-ancient'
    }, {
        title: '笔记',
        toPath: '/articles'
    }, {
        title: '项目经历',
        toPath: '/projects'
    }, {
        title: '闲谈',
        toPath: '/talk'
    }, {
        title: '友链',
        toPath: '/friendsLink'
    }, {
        title: '作者',
        toPath: '/authorinfo'
    }
]
const chosen = ref(0)
const choosePage = (pageIndex: number) => {
    chosen.value = pageIndex
}
</script>
<template>
    <div class="DefaultLayout">
        <div
            class=" w-screen h-16 border-b-2 border-teal-500 flex px-10 items-center justify-between font-mono font-semibold">
            <NuxtLink class="flex-auto" to="/">六时的World</NuxtLink>
            <div class="flex flex-auto w-64">
                <NuxtLink @click="choosePage(index)"
                    class="flex-auto flex items-center justify-center p-2 rounded-lg
                           after:w-0 after:h-2 after:absolute after:top-12 after:rounded-lg after:duration-150 hover:after:w-10 hover:after:bg-teal-400"
                    v-for="(item, index) in routeArr" :key="index" :to="item.toPath">
                    <Icon :name="item.icon" />
                    {{ item.title }}
                </NuxtLink>
            </div>
        </div>
        <slot />
    </div>
</template>