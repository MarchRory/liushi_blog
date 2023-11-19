<script setup lang="ts">
import { RouteLocation } from '#vue-router';

interface routeArr {
    name: String,
    to: RouteLocation
}
const routeArr: routeArr[] = [
    {
        name: '首页',
        to: '/'
    },
    {
        name: '笔记',
        to: '/articles'
    },
    {
        name: '项目经历',
        to: '/projects'
    },
    {
        name: '闲谈',
        to: '/talk'
    },
    {
        name: '友链',
        to: '/friendsLink'
    },
    {
        name: '作者',
        to: '/authorinfo'
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
                <NuxtLink v-for="(item) in routeArr" :to="item.to">
                    {{ item.name }}
                </NuxtLink>
            </div>
        </div>
        <slot />
    </div>
</template>