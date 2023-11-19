<script setup lang="ts">
import { watch, onBeforeUnmount } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { useRoute } from "#vue-router";
import { getArticleDetail } from "../../../api/article";
import { ResultDetailModel } from "../../../api/types/article";
import { BufferToMd } from "../../../utils/md/index";
import { articleItem } from "~/api/types/article";
import "md-editor-v3/lib/preview.css";
import { MdPreview, MdCatalog } from "md-editor-v3";
const route = useRoute();
const pageDetail = ref(route.query as unknown as articleItem);
const mdContent = ref("");
const isContentFixed = ref(false);
const header = ref();
const comment = ref();
const mdtheme = {
  preview: "cyanosis",
  code: "stackoverflow",
};
const getMd = () => {
  getArticleDetail(pageDetail.value.articleId as string).then(
    async (res: ResultDetailModel) => {
      const { type, data } = res.result;
      mdContent.value = (await BufferToMd(data)) as string;
    }
  );
};
const toTop = () => {
  window.scrollTo({ top: header.value.offsetTop, behavior: "smooth" });
};
const toComments = () => {
  window.scrollTo({ top: comment.value.offsetTop, behavior: "smooth" });
};
const { stop } = useIntersectionObserver(
  header, // 观察的目标, vue的ref引用
  // isIntersecting -> 是否进入可视区域, boolean
  // observerElement -> 被观察的DOM
  ([{ isIntersecting }], observerElement) => {
    isContentFixed.value = !isIntersecting;
  },
  // 观察的目标进入视口的比例 [0,1]
  { threshold: 0 }
);
const scrollElement = ref();
{
  if (process.client) {
    scrollElement.value = document.documentElement;
  }
}
getMd();
onBeforeUnmount(() => {
  stop();
});
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-start w-1/1"
    style="top: -4rem"
  >
    <div
      class="flex items-center overflow-hidden h-96 w-1/1 bg-slate-400"
      ref="header"
      style="width: 100%"
    >
      <img
        class="relative brightness-50"
        style="width: 100%; margin-bottom: 2rem"
        :src="pageDetail.cover"
        alt="arricleCover"
      />
      <div
        class="absolute z-50 flex flex-col items-center h-auto bottom-6 z-25 left-1/2 top-1/2"
        style="margin: 0 auto; transform: translate(-50%, -50%)"
      >
        <span class="font-mono text-5xl text-white">{{
          pageDetail.title
        }}</span>
        <div
          class="flex flex-row w-auto mt-6 antialiased text-white divide-x-4 divide-slate-400/80"
        >
          <div class="item">
            <Icon name="solar:calendar-linear" size="20" class="ml-0" />
            <span class="ml-1 mr-2"
              >发布于
              {{ pageDetail.publishTime.toString().substring(0, 10) }}</span
            >
          </div>
          <div class="item" v-if="pageDetail.updateTime">
            <Icon name="solar:refresh-line-duotone" size="20" class="ml-2" />
            <span class="ml-1 mr-2"
              >上次更新
              {{ pageDetail.updateTime.toString().substring(0, 10) }}</span
            >
          </div>
          <div class="item">
            <Icon
              name="fluent-emoji-high-contrast:eyes"
              size="20"
              class="ml-2"
            />
            <span class="ml-1">访问量 {{ pageDetail.views }}</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <div class="w-9/12 h-12 mt-8 mb-6">
      <ClientOnly>
        <div
          class="flex flex-col items-center float-left w-8/12 h-auto py-6 duration-300 bg-white rounded-lg shadow-lg articleBox hover:shadow-2xl"
        >
          <MdPreview
            class="p-2"
            editorId="preview-only"
            :modelValue="mdContent"
            :previewTheme="mdtheme.preview"
            :codeTheme="mdtheme.code"
          />
          <Copyright />
          <div
            style="width: 100%; margin: 0 auto"
            class="flex flex-col items-center mb-10"
          >
            <hr />
            <div class="relative -translate-y-1/2 -left-1/4">
              <Icon
                name="mdi:content-cut"
                size="30"
                class="-mt-1 text-gray-600"
              />
            </div>
          </div>
          <div ref="comment" style="width: 94%">
            <CommentsList :articleId="pageDetail.articleId" />
          </div>
        </div>
      </ClientOnly>

      <div class="content" :class="isContentFixed ? 'contentFixed' : ''">
        <MdCatalog
          editorId="preview-only"
          :scrollElement="scrollElement"
          :scrollElementOffsetTop="50"
        />
      </div>
    </div>

    <ul
      style="list-style: none"
      class="fixed transition-all duration-200 tools -right-16 -bottom-10"
      :class="isContentFixed ? 'toolBar' : ''"
    >
      <li class="rounded-lg bg-sky-400 rounded-tl-2xl" @click="toTop">
        <Icon name="tdesign:backtop" color="white" size="30" />
      </li>
      <li class="bg-teal-400 rounded-lg rounded-br-2xl" @click="toComments">
        <Icon name="tdesign:chat-message" color="white" size="30" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
}

.content {
  @apply p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl ml-auto relative overflow-scroll h-auto;
  width: 345px;
  max-height: 83.3vh;
}

.contentFixed {
  @apply top-4 fixed overflow-scroll;
  margin-left: calc(75% - 345px);
}

.toolBar {
  @apply right-16 bottom-10 opacity-100;
}

.tools li {
  @apply mb-6 p-3 cursor-pointer duration-300 transition-shadow;
}

hr {
  margin: 0 auto;
  width: 94%;
  height: 0;
  border: none;
  border-top: 4px dashed grey;
}
</style>
