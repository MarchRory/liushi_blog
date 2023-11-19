<script setup lang="ts">
interface skill {
    skillName: string,
    icon: string
}
const roundColor: string[] = ref([
    'orange', 'amber', 'lime', 'green',
    'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple',
    'fuchsia', 'pink', 'rose'
])
const skill: skill[] = [
    {
        skillName: 'HTML',
        icon: 'logos:html-5'
    }, {
        skillName: 'CSS',
        icon: 'logos:css-3'
    }, {
        skillName: 'JavaScript',
        icon: 'logos:javascript'
    }, {
        skillName: 'Node.js',
        icon: 'logos:nodejs'
    }, {
        skillName: 'Webpack',
        icon: 'logos:webpack'
    }, {
        skillName: 'Axios',
        icon: 'logos:axios'
    }, {
        skillName: 'Vite',
        icon: 'logos:vitejs'
    }, {
        skillName: 'Vue.js',
        icon: 'logos:vue'
    }, {
        skillName: 'TypeScript',
        icon: 'vscode-icons:file-type-typescript-official'
    }, {
        skillName: 'Express',
        icon: 'logos:express'
    }, {
        skillName: 'MongoDB',
        icon: 'logos:mongodb'
    }, {
        skillName: 'Nuxt.js',
        icon: 'logos:nuxt-icon'
    }
]
</script>

<template>
    <div class="flex items-center justify-center flex-col w-screen h-auto">
        <div class=" flex items-center justify-center h-64 place-self-center w-screen text-5xl text-teal-400 antialiased">
            <div class=" items-center">前端技术笔记</div>
        </div>
        <div
            class=" w-3/4 h-full p-x-30 p-y-20 flex flex-col justify-between bg-opacity-25 border-2 border-teal-500 rounded-2xl shadow-lg shadow-cyan-500/50">
            <div class=" h-20 w-1/1 flex items-center justify-center text-3xl text-neutral-500">
                <Icon name="ic:sharp-bookmarks" class=" mr-4" /> 分类
            </div>
            <ClientOnly>
                <div class=" w-1/1 min-h-fit h-20 p-x-30 p-y-20 flex flex-wrap items-center justify-center">
                    <div class=" mr-4 mb-4 text-lg flex items-center justify-center rounded-lg p-2"
                        v-for="(item, index) in skill" :key="index">
                        <Icon :name="item!.icon" size="30" class=" mr-2" />
                        {{ item.skillName }}
                    </div>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>