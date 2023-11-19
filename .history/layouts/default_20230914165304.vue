<script setup>
const listenWindowScroll = () => {
    if (window) {
        window.addEventListener('mousewheel', function (e) {
            const isUp = e.deltaY > 0
            if (isUp) {
            }
        })
    }
}
listenWindowScroll()
</script>
<template>
    <div>
        <ClientOnly>
            <Navbar></Navbar>
        </ClientOnly>
        <slot />
    </div>
</template>