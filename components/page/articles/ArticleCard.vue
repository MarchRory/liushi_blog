<script setup lang="ts">
import { LocationQueryRaw } from '#vue-router';
import { defineProps, ref, toRef } from 'vue';
import { articleItem } from '~/api/types/article';
import { tagItem } from '~/api/types/tags';
const props = defineProps<{
    article: articleItem
}>()

const openArticleDetailPage = async () => {
    await navigateTo({
        path: 'articles/children/articleDetail',
        query: { ...props.article } as unknown as LocationQueryRaw
    })
}
</script>

<template>
    <div @click="openArticleDetailPage"
        class="flex flex-row justify-around p-6 mb-4 duration-300 bg-white border-2 rounded-lg shadow-xl preview_card min-h-16 h-fit w-1/1 border-cyan-100 hover:border-cyan-300 hover:cursor-pointer">
        <div class="h-auto overflow-hidden rounded-lg w-96">
            <img class="object-cover transition-all duration-500 cover ease" :src="props.article.cover" alt="articleCover">
        </div>
        <div class="flex flex-col justify-start flex-1 px-12 py-4 font-mono">
            <p class="mb-3 text-2xl font-bold">{{ props.article.title }}</p>
            <div class="flex items-center mb-3 space-x-6">
                <div>
                    <Icon name="solar:calendar-linear" size="20" class="mr-2 " />
                    <span>发布于 {{ props.article.publishTime.toString().substring(0, 10) }}</span>
                </div>
                <div v-if="props.article.updateTime">
                    <Icon name="solar:refresh-line-duotone" size="20" class="mr-2 " />
                    <span>上次更新 {{ props.article.updateTime.toString().substring(0, 10) }}</span>
                </div>
                <div>
                    <Icon name="fluent-emoji-high-contrast:eyes" size="20" class="mr-2 " />
                    <span>访问量 {{ props.article.views }}</span>
                </div>
            </div>
            <article class="mt-2 font-medium indent-2">{{ props.article.summary }}</article>
        </div>
    </div>
</template>

<style scoped>
.preview_card:hover img {
    transform: scale(1.15);
}
</style>