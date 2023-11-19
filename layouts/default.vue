<script setup>
import { onMounted } from 'vue';
import { bgEffect } from '../utils/speEffect/index'
const navbar = ref()
const listenWindowScroll = () => {
    // 使用 process.client 判断是否在客户端, 服务端没有window
    if (process.client) {
        window.addEventListener('mousewheel', function (e) {
            const isDown = e.deltaY > 0
            if (isDown) {

            }
        })
    }
}
onMounted(() => {
    listenWindowScroll()
    bgEffect()
})
</script>
<template>
    <div>
        <ClientOnly>
            <Navbar ref="navbar" class="sticky z-50 duration-150"></Navbar>
        </ClientOnly>
        <slot />
    </div>
</template>