<script setup lang="ts">
import { ResultTagsModel, tagItem } from '../../api/types/tags'
import { getTagsApi } from '../../api/tags'
import { pageParamsModel } from '../../api/types/index'
import { ref } from 'vue'
const roundColor: string[] = [
    'orange', 'amber', 'lime', 'green',
    'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple',
    'fuchsia', 'pink', 'rose'
]
const tagList = ref([] as tagItem[])
const tagTotal = ref(0)
const chosenTag = ref({
    name: '',
    icon: '',
    id: '',
})
const tagPage = ref({
    keywords: '',
    pageNum: 1,
    pageSize: 10
} as pageParamsModel)
const init = () => {
    if (process.client) {
        getTagsApi(tagPage.value)
            .then((res: ResultTagsModel) => {
                if (res.code === 200) {
                    const { list, total } = res.result
                    tagList.value = list
                    tagTotal.value = total
                }
            })
    }
}
const choseTag = (tagItem: tagItem) => {
    chosenTag.value.name = tagItem.tagname
    chosenTag.value.icon = tagItem.tagIcon
    chosenTag.value.id = tagItem.tagId
}
init()
</script>

<template>
    <div class="flex flex-col items-center justify-center w-screen h-auto">
        <div class="flex items-center justify-center w-screen h-64 text-5xl antialiased text-teal-400 place-self-center">
            <div class="items-center ">前端技术笔记</div>
        </div>
        <div
            class="flex flex-col justify-between w-3/4 h-full bg-opacity-25 border-2 border-teal-500 shadow-lg p-x-30 p-y-20 rounded-2xl shadow-cyan-500/50">
            <div class="flex items-center justify-center h-20 text-3xl w-1/1 text-neutral-500">
                <Icon name="ic:sharp-bookmarks" class="mr-4 " /> 分类
            </div>
            <ClientOnly>
                <div class="flex flex-wrap items-center justify-center w-1/1 min-h-20 p-x-30 p-y-20">
                    <div class="flex items-center justify-center w-auto h-auto px-4 py-2 mb-4 mr-4 text-lg duration-150 rounded-xl hover:bg-cyan-500 hover:text-white hover:cursor-pointer"
                        v-for="(item, index) in tagList" :key="index" @click="choseTag(item)">
                        <Icon :name="item!.tagIcon" size="30" class="mr-2 " />
                        {{ item.tagname }}
                        <span class="px-2 ml-2 border-l-2 border-cyan-500">{{ item.hasNums }}</span>
                    </div>
                </div>
            </ClientOnly>
        </div>
        <div class="flex flex-col justify-between w-3/4 h-full mt-4 bg-opacity-25 p-x-30 p-y-20">
            <ArticlesList :tag-id="chosenTag.id" :tag-icon="chosenTag.icon" :tagname="chosenTag.name"></ArticlesList>
        </div>
    </div>
</template>