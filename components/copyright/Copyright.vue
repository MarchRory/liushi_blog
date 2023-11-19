<script lang="ts" setup>
import { useAuthorStore } from '~/store/modules/author';
import { onMounted } from 'vue';
const authorStore = useAuthorStore()
</script>
<template>
    <div style="width: 94%"
        class="flex flex-col h-auto p-4 mb-10 font-mono text-sm font-bold duration-200 border border-solid rounded-lg border-emerald-200 hover:shadow-zinc-200">
        <Icon name="mdi:copyright" size="27" class="mb-3 text-teal-500 " />
        <ul>
            <li class="mb-2">
                <span class="font-bold text-teal-600">文章作者:&nbsp;</span><span
                    class="text-teal-500 underline underline-offset-4">{{ authorStore.userInfo.nickname }}</span>
            </li>
            <li>
                <span class="font-bold text-teal-600">版权声明:&nbsp;</span><span>本博客所有文章除特别声明外，均采用<a
                        class="text-teal-500 underline underline-offset-4"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                        CC BY 4.0许可协议</a>。转载请注明来自<span
                        class="text-teal-500 underline underline-offset-4">六时的Blog</span></span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
}
</style>