<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthorStore } from "~/store/modules/author";
const authorStore = useAuthorStore();
const contactType = ref();
onMounted(() => {
  contactType.value = Object.keys(authorStore.contact as Object);
});
const hobbies = [
  {
    icon: "twemoji:man-swimming-medium-light-skin-tone",
    text: "游泳",
  },
  {
    icon: "twemoji:film-projector",
    text: "电影",
  },
  {
    icon: "twemoji:microphone",
    text: "K歌",
  },
];
const skillStack = [
  {
    text: "熟悉HTML5、CSS3",
  },
  {
    text: "熟悉JavaScript、ES6标准, 了解TypeScript",
  },
  {
    text: "了解uniapp",
  },
  {
    text: "熟练使用Vue全家桶进行项目搭建开发, 并有移动端H5开发经验",
  },
  {
    text: "了解Nuxt3及SSR",
  },
  {
    text: "了解webpack、Vite等打包工具, 有打包优化经验",
  },
];
</script>

<template>
  <div
    style="margin: 3rem auto"
    class="flex flex-col w-9/12 h-auto px-6 py-8 duration-200 border-2 border-teal-300 rounded-lg hover:shadow-xl"
  >
    <div>
      <div class="flex items-center">
        <Icon name="noto-v1:boy" size="30" />
        <span class="title">基本信息</span>
      </div>
      <ul>
        <li>
          <span class="itemKey">马甲: </span
          ><span class="infoWords">{{ authorStore.userInfo?.nickname }}</span>
        </li>
        <li>
          <span class="itemKey">简介: </span
          ><span class="infoWords">{{ authorStore.userInfo?.introduce }}</span>
        </li>
        <li>
          <span class="itemKey">教育经历:</span>
          <span class="infoWords">西南石油大学</span>
        </li>
        <li>
          <span class="itemKey">年级</span>
          <span class="infoWords">&nbsp;2021级</span>
        </li>
        <li>
          <span class="itemKey">专业</span>
          <span class="infoWords">&nbsp;软件工程</span>
        </li>
      </ul>
    </div>
    <div>
      <div>
        <Icon name="twemoji:globe-with-meridians" size="30" />
        <span class="title">联系博主</span>
      </div>
      <ul>
        <li v-for="(item, index) in contactType" :key="index">
          <span class="itemKey"> {{ item }}: </span>
          <a
            class="text-indigo-400 underline underline-offset-7"
            v-if="item != 'email'"
            :href="authorStore.contact[item]"
            target="_blank"
          >
            <span class="infoWords">{{ authorStore.contact[item] }}</span></a
          >
          <span v-else class="infoWords">{{ authorStore.contact[item] }}</span>
        </li>
      </ul>
    </div>
    <div class="flex items-center">
      <Icon name="noto-v1:heart-suit" size="30" />
      <span class="title">兴趣爱好</span>
    </div>
    <ul>
      <li class="hobby" v-for="(item, index) in hobbies" :key="index">
        <Icon :name="item.icon" />
        <span class="ml-2">{{ item.text }}</span>
      </li>
    </ul>
    <div>
      <div class="flex items-center">
        <Icon name="noto-v1:hammer-and-pick" size="30" />
        <span class="title">技术栈</span>
      </div>
      <ul>
        <li
          class="text-sm font-semibold list-decimal"
          v-for="(item, index) in skillStack"
          :key="index"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  @apply list-none mt-2 mb-4 ml-6;
}
.title {
  @apply text-lg font-bold ml-2;
}
.itemKey {
  @apply text-base font-bold text-teal-500;
}
.infoWords {
  @apply ml-2 text-base font-mono font-bold;
}
.hobby {
  @apply inline-block mr-4 px-2 py-1 rounded-lg bg-emerald-200 font-semibold text-sm;
}
</style>
