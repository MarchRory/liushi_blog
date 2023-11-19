<script setup lang="ts">
import { RouteLocation, RouteLocationRaw } from '#vue-router';

interface routeArr {
    title: String,
    toPath: RouteLocationRaw
}
const routeArr: routeArr[] = [
    {
        title: '首页',
        toPath: '/'
    },
    {
        title: '笔记',
        toPath: '/articles'
    },
    {
        title: '项目经历',
        toPath: '/projects'
    },
    {
        title: '闲谈',
        toPath: '/talk'
    },
    {
        title: '友链',
        toPath: '/friendsLink'
    },
    {
        title: '作者',
        toPath: '/authorinfo'
    }
]
</script>
<template>
    <div class="DefaultLayout">
        <div class=" w-screen h-12 border-b-2 border-indigo-400">
            <div>
                六时的world
            </div>
            <div>
                <nuxt-link v-for="(item) in routeArr" :to="item.toPath"></nuxt-link>
            </div>
        </div>
        <slot />
    </div>
</template>