<script setup lang="ts">
import { friendsResultModel, friendLinkItem } from "~/api/types/friends";
import { getFriendsListAPI } from "~/api/friends";
import { ref, watch } from "vue";
import { gsap } from "gsap";
const pagination = ref({
  pageNum: 1,
  pageSize: 10,
});
const friendsList = ref<friendLinkItem[]>([] as friendLinkItem[]);
const friendsTotal = ref<number>(0);

function loadList(): void {
  getFriendsListAPI({ ...pagination.value }).then((res: friendsResultModel) => {
    const { list, total } = res.result;
    friendsList.value = list;
    friendsTotal.value = total;
  });
}
function handlePageChange(newPage: number): void {
  pagination.value.pageNum = newPage;
}
watch(
  () => pagination.value.pageNum,
  () => {
    loadList();
  }
);
loadList();
</script>

<template>
  <div class="">
    <div>
      <ul>
        <li v-for="(item, index) in friendsList" :key="index">
          <LazyFriendCard :friendLinkItem="item" />
        </li>
      </ul>
    </div>
    <LazyPagination
      :pagination="{
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      }"
      :total="friendsTotal"
      :showTotal="friendsList.length"
      @on-current-page="handlePageChange"
    />
  </div>
</template>

<style scoped>
ul {
  @apply list-none;
}
</style>
