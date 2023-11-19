<script setup lang="ts">
import { skillMap } from '../../utils/skillIcon/index'
const roundColor: string[] = ref([
    'orange', 'amber', 'lime', 'green',
    'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple',
    'fuchsia', 'pink', 'rose'
])
const mySkill = skillMap()
</script>

<template>
    <div class="flex items-center justify-center flex-col w-screen h-auto">
        <div class=" flex items-center justify-center h-64 place-self-center w-screen text-5xl text-teal-400 antialiased">
            <div class=" items-center">前端技术笔记</div>
        </div>
        <div
            class=" w-3/4 min-h-fit p-x-30 p-y-20 flex flex-col justify-between bg-opacity-25 border-2 border-teal-500 rounded-2xl shadow-lg shadow-cyan-500/50">
            <div class=" h-20 w-1/1 flex items-center justify-center text-3xl text-neutral-500">
                <Icon name="ic:sharp-bookmarks" class=" mr-4" /> 分类
            </div>
            <div class=" w-1/1 min-h-fit h-20 p-x-30 p-y-20 flex flex-wrap items-center justify-between">

            </div>
        </div>
    </div>
</template>