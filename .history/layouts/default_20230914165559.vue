<script setup>
const listenWindowScroll = () => {

    if (process.client) {
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