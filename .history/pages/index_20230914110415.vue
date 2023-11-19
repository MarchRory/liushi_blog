<script setup lang="ts">
interface SkillType {
    skillName: string | null | undefined,
    icon: string | null | undefined
}

// 先写着做动画用，后面要从server获取
const skill: SkillType[] = [
    {
        skillName: 'HTML',
        icon: ''
    }, {
        skillName: 'CSS',
        icon: ''
    }, {
        skillName: 'JavaScript',
        icon: ''
    }, {
        skillName: 'Node',
        icon: ''
    }, {
        skillName: 'Ajax',
        icon: ''
    }, {
        skillName: 'Webpack',
        icon: ''
    }, {
        skillName: 'Axios',
        icon: ''
    }, {
        skillName: 'Vite',
        icon: ''
    }, {
        skillName: 'Vue.js',
        icon: ''
    }, {
        skillName: 'Uniapp',
        icon: ''
    }, {
        skillName: 'Express',
        icon: ''
    }, {
        skillName: 'MogonDB',
        icon: ''
    }, {
        skillName: 'Nuxt.js',
        icon: ''
    }
]
</script>

<template>
    <div class="">
        home
    </div>
</template>