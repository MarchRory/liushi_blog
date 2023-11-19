<script setup>
const listenWindowScroll = () => {
    if (window.addEventListener) {
        window.addEventListener('mousewheel', function (e) {
            console.log(e)
        })
    }
}
</script>
<template>
    <div>
        <ClientOnly>
            <Navbar></Navbar>
        </ClientOnly>
        <slot />
    </div>
</template>