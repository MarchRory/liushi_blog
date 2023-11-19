import { EmitFlags } from 'typescript';
<script setup lang="ts">
import { ref, defineProps, watch, computed } from "vue";
import { paginationType } from "./types";
const props = defineProps<{
  pagination: paginationType;
  total: number;
  showTotal: number;
}>();
const emit = defineEmits<{
  (e: "onCurrentPage", pageNum: number): void;
}>();
const pagiNationCopy = ref({
  keywords: "",
  pageNum: 1,
  pageSize: 10,
});
const pageTotal = computed(() => {
  return Math.ceil(props.total / props.pagination.pageSize);
});
watch(
  () => props.pagination,
  (newVal) => {
    pagiNationCopy.value = JSON.parse(JSON.stringify(newVal));
  },
  { immediate: true }
);
watch(
  () => pagiNationCopy.value.pageNum,
  (newVal) => {
    emit("onCurrentPage", newVal);
  }
);
</script>

<template>
  <div v-if="props.total">
    <div
      style="margin: 30px auto"
      class="relative flex items-center justify-around w-44"
    >
      <button
        class="pageBtn"
        :disabled="pagiNationCopy.pageNum == 1"
        @click="pagiNationCopy.pageNum--"
      >
        <Icon name="fa6-solid:angle-left" size="25" />
      </button>

      <span class="font-mono text-lg text-zinc-400">
        {{ pagiNationCopy.pageNum }}/{{ pageTotal }}
      </span>
      <button
        class="pageBtn"
        :disabled="pagiNationCopy.pageNum >= pageTotal"
        @click="pagiNationCopy.pageNum++"
      >
        <Icon name="fa6-solid:angle-right" size="25" />
      </button>
    </div>
  </div>
</template>

<style wscoped>
.pageBtn {
  @apply p-2 rounded-xl text-zinc-400 bg-gray-200 transition-all duration-200 hover:bg-emerald-400 hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:text-zinc-300 disabled:bg-gray-100;
}
</style>
