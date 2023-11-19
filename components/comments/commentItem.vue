<script setup lang="ts">
import { defineProps, computed, defineEmits, getCurrentInstance } from "vue";
import { ComponentInternalInstance } from "nuxt/dist/app/compat/capi";
import { commentItem, childrenCommentResult } from "../../api/types/comment";
import { delCommentAPI, getChildrenCommentListAPI } from "../../api/comment";
import { gsap } from "gsap";
import { useTouristStore } from "~/store/modules/tourist";
const touristStore = useTouristStore();
const props = defineProps<{
  comment: commentItem;
  zIndex?: number;
}>();
const emit = defineEmits<{
  (e: "onDelete", comment: commentItem): void;
}>();
const isOpenCommentCtrl = ref(false);
const isChildrenShow = ref(false);
const ctx = ref<ComponentInternalInstance>(
  getCurrentInstance() as ComponentInternalInstance
);
const openCommentArea = () => {
  isOpenCommentCtrl.value = !isOpenCommentCtrl.value;
};
const quitParentComment = () => {
  isOpenCommentCtrl.value = false;
  isOpenCommentCtrl.value = false;
};
const delComment = () => {
  delCommentAPI(
    props.comment.articleId,
    props.comment.commentId as string,
    parentCommentId.value as string
  ).then((res: any) => {
    const { code } = res;
    if (code == 200) {
      if (props.comment.floorId == props.comment.commentId) {
        let chldrenCopy: commentItem[] =
          ctx.value.parent.parent.ctx.comment.children;
        let index = chldrenCopy.findIndex((item: commentItem) => {
          return item.commentId == props.comment.commentId;
        });
        let reviewedIndex: number = chldrenCopy.findIndex(
          (item: commentItem) =>
            item.commentId == props.comment.reviewedCommentId
        );
        console.log(
          reviewedIndex,
          ctx.value.parent.parent.ctx.comment.children
        );
        ctx.value.parent.parent.ctx.comment.children[reviewedIndex]
          .childCommentCnt--;
        ctx.value.parent.parent.ctx.comment.children.splice(index, 1);
        ctx.value.parent.parent.ctx.comment.childCommentCnt--;

        ctx.value.parent.parent.parent.parent.parent.devtoolsRawSetupState
          .allCommentTotal--;
      } else {
        emit("onDelete", props.comment);
      }
    } else {
    }
  });
};
const showChildren = () => {
  if (props.comment.children.length == 0) {
    getChildrenCommentListAPI(props.comment.commentId)
      .then((res: childrenCommentResult) => {
        const { list } = res.result;
        props.comment.children = list;
      })
      .finally(() => {
        isChildrenShow.value = true;
      });
  } else {
    isChildrenShow.value = !isChildrenShow.value;
    isOpenCommentCtrl.value = false;
  }
};
const addChildCommentCB = (newChildComment: commentItem, isParent: boolean) => {
  newChildComment.time = (newChildComment.time as Date)
    .toLocaleDateString()
    .replaceAll("/", "-") as unknown as Date;
  if (!isParent) {
    if (props.zIndex && props.zIndex == 2) {
      // 嵌套组件里内层访问外层
      ctx.value.parent.parent.ctx.comment.children.unshift(newChildComment);
      let childrenCopy = ctx.value.parent.parent.ctx.comment.children;
      let index = childrenCopy.findIndex(
        (item: commentItem) =>
          newChildComment.reviewedCommentId == item.commentId
      );
      ctx.value.parent.parent.ctx.comment.children[index].childCommentCnt++;
      ctx.value.parent.parent.ctx.comment.childCommentCnt++;
      ctx.value.parent.parent.parent.parent.parent.devtoolsRawSetupState
        .allCommentTotal++;
    } else {
      props.comment!.children.unshift(newChildComment);
      props.comment.childCommentCnt++;
      ctx.value.parent.parent.parent.devtoolsRawSetupState.allCommentTotal++;
    }
  }
  isOpenCommentCtrl.value = false;
};
const parentCommentId = computed(() => {
  if (props.comment.floorId == "") {
    return props.comment.commentId;
  } else {
    return props.comment.commentId == props.comment.floorId
      ? props.comment.commentId
      : props.comment.floorId;
  }
});
</script>

<template>
  <div
    class="flex justify-between mb-6 transition-transform duration-300 w-1/1"
  >
    <img
      class="object-cover w-12 h-12 rounded-full"
      :src="props.comment.avatar"
      alt="avatar"
    />
    <div style="width: calc(100% - 3.7rem)" class="flex flex-col">
      <div class="flex items-center justify-between mt-2 mb-2 w-1/1">
        <div>
          <span
            v-if="props.comment.floorId && props.comment.identity != -1"
            class="px-2 py-1 mr-1 text-sm font-bold text-white border-0 rounded-md cursor-default"
            :style="{
              backgroundColor:
                props.comment.identity == 1 ? '#6eccf5' : '#73d3d3',
            }"
          >
            {{ props.comment.identity == 1 ? "博主" : "层主" }}
          </span>
          <span class="text-base font-bold text-teal-600">{{
            props.comment.nickname
          }}</span>
          <span class="ml-3 font-mono text-base font-bold text-gray-400">
            {{ props.comment.time?.toString().substring(0, 10) }}</span
          >
        </div>
        <div class="flex flex-row items-center font-mono text-base font-bold">
          <div
            v-if="props.comment.qqEmail == touristStore.qqEmail"
            class="mr-2 hover:cursor-pointer"
            @click="delComment"
          >
            <Icon
              name="mingcute:delete-2-fill"
              size="20"
              class="text-red-600"
            />
          </div>
          <div
            class="text-teal-500 hover:cursor-pointer commentTrigger"
            @click="openCommentArea"
          >
            <Icon name="mdi:comment-text-outline" size="20" class="mr-2" />
            <span>{{ props.comment.childCommentCnt }}</span>
          </div>
        </div>
      </div>
      <article
        style="letter-spacing: 1px"
        class="h-auto p-4 font-sans text-sm antialiased font-bold text-gray-600 rounded-lg bg-zinc-200 w-1/1"
      >
        <span v-if="props.comment.floorId" class="cursor-default"
          >回复<span class="text-sky-500">{{
            props.comment.reviewedNickname
          }}</span
          >:&nbsp;</span
        >{{ props.comment.content }}
      </article>
      <div>
        <transition name="commentAreaAnimation">
          <div v-if="isOpenCommentCtrl" class="mt-4 w-1/1">
            <LazyCommentControl
              :article-id="props.comment.articleId"
              :is-parent-comment="false"
              :reviewed-item="props.comment"
              @comment-added="addChildCommentCB"
              @quit-comment="quitParentComment"
            ></LazyCommentControl>
          </div>
        </transition>
      </div>

      <div
        v-if="!props.zIndex && props.comment.childCommentCnt"
        class="mt-2 w-1/1"
      >
        <div
          v-show="isChildrenShow"
          v-for="(childComment, index) in props.comment.children"
          :key="index"
        >
          <hr />
          <LazyCommentItem
            :comment="childComment"
            :z-index="2"
            @onDelete="$emit('onDelete', childComment)"
          />
        </div>
        <div
          @click="showChildren"
          class="flex justify-center py-2 text-sm font-bold text-gray-500 transition-colors duration-300 border-2 border-teal-400 rounded-lg cursor-pointer w-1/1 hover:border-opacity-0 hover:text-white hover:bg-teal-400"
        >
          <span>{{ isChildrenShow ? "收起楼层" : "展开楼层" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commentAreaAnimation-enter-active,
.commentAreaAnimation-leave-active {
  transition: all 0.3s linear;
}

.commentAreaAnimation-enter-from,
.commentAreaAnimation-leave-to {
  opacity: 0;
  height: "0%";
}

/* .commentAreaAnimation-leave-to {
    opacity: 1;
    scale: 1;
} */
hr {
  margin: 1rem auto;
  width: 100%;
  height: 0;
  border: none;
  border-top: 3px dashed grey;
}
</style>
