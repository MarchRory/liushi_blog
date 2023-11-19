<script setup lang="ts">
import { routeArr } from './types'
const routeArr: routeArr[] = [
    {
        title: '首页',
        toPath: '/'
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
</script>
<template>
    <div class="DefaultLayout">
        <div class=" w-screen h-16 border-b-2 border-teal-500 flex px-10 items-center justify-between">
            <NuxtLink class="flex-auto" to="/">六时的World</NuxtLink>
            <div class="flex flex-auto w-64">
                <NuxtLink class="flex-auto flex items-center justify-center p-2 rounded-lg
                           after:w-0 hover:after:w-10 hover:after:bg-green-400" v-for="(item) in routeArr"
                    :to="item.toPath">
                    {{ item.title }}
                </NuxtLink>
            </div>
        </div>
        <slot />
    </div>
</template>