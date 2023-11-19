<script setup>
const listenWindowScroll = () => {
    if (window.addEventListener) {
        window.addEventListener('mousewheel', function (e) {
            const isUp = e.deltaY > 0
            console.log(isUp)
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