<script setup lang="ts">
</script>
<template>
    <div>
        <ClientOnly>
            <div class=" w-screen h-16 border-b-2 border-teal-500 flex px-10 items-center justify-between font-mono
            font-semibold">
                <div class="">
                    <NuxtLink class="flex-auto p-2 h-16" to="/">六时的Blog</NuxtLink>
                </div>
                <div class="flex flex-auto">
                    <NuxtLink v-for="(item, index) in routeArr" :key="index" :to="item.toPath"
                        class="flex-auto flex items-center justify-center p-2 rounded-lg
                           after:w-0 after:h-2 after:absolute after:top-12 after:rounded-lg after:duration-150 hover:after:w-16 hover:after:bg-teal-400">
                        <Icon class="m-2.5" :name="item.icon" />
                        {{ item.title }}
                    </NuxtLink>
                    <div class="rounded-full hover:shadow-lg duration-150 w-14 h-14 overflow-hidden">
                        <NuxtLink to="/authorinfo">
                            <img src="" alt="avatar">
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </ClientOnly>
        <slot />
    </div>
</template>