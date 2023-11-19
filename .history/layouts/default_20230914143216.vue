<script setup lang="ts">
</script>
<template>
    <div>
        <ClientOnly>
            <Navbar></Navbar>
        </ClientOnly>
        <slot />
    </div>
</template>