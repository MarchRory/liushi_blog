<script setup lang="ts">
import { defineProps, watch } from "vue";
import { getArticleList } from "../../../api/article";
import { gsap } from "gsap";
import { ResultArticleModel, articleItem } from "~/api/types/article";
import { pageParamsModel } from "~/api/types";
const props = defineProps<{
  tagname?: String;
  tagIcon?: String;
  tagId?: String;
}>();
const pageParmas = ref<pageParamsModel>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});
const listTotal = ref(0);
const articleList = ref<articleItem[]>([] as articleItem[]);
gsap.config({
  units: { height: "%" },
});
const onEnter = (el, done) => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      height: 0,
      delay: el.dataset.index * 0.1,
      xPercent: el.dataset.index % 2 == 0 ? -20 : 20,
      yPercent: 30,
      duration: 1,
    },
    {
      opacity: 1,
      height: 100,
      delay: el.dataset.index * 0.15,
      xPercent: 0,
      yPercent: 0,
      onComplete: done,
    }
  );
};
const onLeave = (el, done) => {
  gsap.fromTo(
    el,
    {
      opacity: 1,
      height: "100%",
      delay: el.dataset.index * 0.1,
      xPercent: 0,
      yPercent: 0,
      onComplete: done,
    },
    {
      opacity: 0,
      height: "0%",
      delay: el.dataset.index * 0.15,
      xPercent: el.dataset.index % 2 == 0 ? 20 : -20,
      yPercent: 30,
      onComplete: done,
    }
  );
};
const loadList = () => {
  getArticleList({ ...pageParmas.value, tagId: props.tagId as string }).then(
    (res: ResultArticleModel) => {
      const { list, total } = res.result;
      articleList.value = list;
      listTotal.value = total;
    }
  );
};
const handleCurrentPage = (currentPage: number) => {
  pageParmas.value.pageNum = currentPage;
  loadList();
};
watch(
  () => props.tagId,
  (newVal) => {
    if (newVal) {
      articleList.value = [];
      pageParmas.value.pageNum = 1;
      pageParmas.value.keywords = "";
      loadList();
    }
  }
);
</script>

<template>
  <div>
    <transition-group
      name="card"
      :css="false"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        class="w-1/1"
        v-for="(item, index) in articleList"
        :key="index"
        :data-index="index"
      >
        <LazyArticleCard :article="item" />
      </div>
    </transition-group>
    <LazyPagination
      :pagination="pageParmas"
      :total="listTotal"
      :showTotal="articleList.length"
      @on-current-page="handleCurrentPage"
    />
  </div>
</template>
<style scoped></style>
