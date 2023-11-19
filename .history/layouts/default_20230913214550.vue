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
        <div class=" w-screen h-12 border-b-2 border-teal-500 flex px-10">
            <div class="flex-none">
                六时的world
            </div>
            <div class="flex flex-auto w-64">
                <nuxt-link class="flex-auto" v-for="(item) in routeArr" :to="item.toPath">
                    {{ item.title }}
                </nuxt-link>
            </div>
        </div>
        <slot />
    </div>
</template>