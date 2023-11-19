<script setup lang="ts">
interface SkillType {
    skillName: string | null | undefined,
    icon: string | null | undefined
}

// 先写着做动画用，后面要从server获取
const skill: SkillType[] = [
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
        skillName: 'Node',
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
        skillName: 'Uniapp',
        icon: ''
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
    <div class="">
        home
    </div>
</template>