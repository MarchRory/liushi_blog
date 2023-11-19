<script setup>
import { nextTick } from 'vue';
const navbar = ref()
const listenWindowScroll = () => {
    // 使用 process.client 判断是否在客户端, 服务端没有window
    if (process.client) {
        window.addEventListener('mousewheel', function (e) {
            const isDown = e.deltaY > 0
            if (isDown) {
                nextTick(() => {
                    console.log(navbar.value.offsetHeight)
                })
            }
        })
    }
}
listenWindowScroll()
</script>
<template>
    <div>
        <ClientOnly>
            <Navbar ref="navbar" class=" duration-150"></Navbar>
        </ClientOnly>
        <slot />
    </div>
</template>