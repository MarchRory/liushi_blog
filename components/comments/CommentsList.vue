<script lang="ts" setup>
import { defineProps, watch } from "vue";
import * as commentTypes from "../../api/types/comment";
import * as commentAPI from "../../api/comment";
const props = defineProps<{
  articleId: string;
}>();
const commentListParams = ref<commentTypes.commentPageParamsModel>({
  articleId: props.articleId,
  pageNum: 1,
  pageSize: 10,
});
const parentCommentList = ref<commentTypes.commentItem[]>(
  [] as commentTypes.commentItem[]
);
const parentCommentListTotal = ref(0);
const allCommentTotal = ref(0);
const commentCtrl = ref(null);
const loadList = () => {
  commentAPI
    .getParentCommentListAPI(commentListParams.value)
    .then((res: commentTypes.parentCommentResult) => {
      const { result } = res;
      result.list = result.list.map((item) => {
        item["children"] = [];
        return item;
      });
      parentCommentList.value = result.list;
      parentCommentListTotal.value = result.parentTotal;
      allCommentTotal.value = result.allCommentTotal;
    })
    .finally(() => {});
};
const addCommentCB = (
  newComment: commentTypes.commentItem,
  isParent: boolean
) => {
  if (isParent) {
    parentCommentList.value.unshift(newComment);
    parentCommentListTotal.value++;
    allCommentTotal.value++;
    loadList();
  }
};
const loadChildrenCommentList = (
  parentCommentId: commentTypes.childrenListParams
) => {
  commentAPI
    .getChildrenCommentListAPI(parentCommentId)
    .then((res: commentTypes.childrenCommentResult) => {
      const { result } = res;
      let index = parentCommentList.value.findIndex(
        (item: commentTypes.commentItem) =>
          item.commentId == (parentCommentId as unknown as string)
      );
      result.forEach((childComment: commentTypes.commentItem) => {
        parentCommentList.value.push(childComment);
      });
    })
    .finally(() => {});
};
const handleCurrentPage = (newPage: number) => {
  commentListParams.value.pageNum = newPage;
};
/* const delComment = (
  articleId: string,
  commentId: string,
  parentCommentId: string | undefined
) => {
  commentAPI
    .delCommentAPI(articleId, commentId, parentCommentId)
    .then((res: any) => {
      const { code } = res;
      if (code === 200) {
        if (parentCommentId) {
          let index = parentCommentList.value.findIndex(
            (item: commentTypes.commentItem) =>
              item.commentId == parentCommentId
          );
          let childIndex = parentCommentList.value[index].children?.findIndex(
            (item: commentTypes.commentItem) => item.commentId == commentId
          );
          parentCommentList.value[index].children?.slice(childIndex, 1);
          parentCommentList.value[index].childCommentCnt--;
        } else {
          let index = parentCommentList.value.findIndex(
            (item: commentTypes.commentItem) => item.commentId == commentId
          );
          parentCommentList.value.splice(index, 1);
        }
        parentCommentListTotal.value--;
        allCommentTotal.value--;
      }
    })
    .finally(() => {});
}; */
watch(
  () => props.articleId,
  (newVal) => {
    commentListParams.value.articleId = newVal;
  },
  { immediate: true }
);
watch(
  () => commentListParams.value.pageNum,
  (newVal) => {
    loadList();
  }
);
loadList();
</script>

<template>
  <div style="width: 100%" class="py-6">
    <div class="flex items-center mb-6">
      <Icon name="tdesign:chat-double" size="35" style="color: #53aeb1" />
      <span class="ml-2 text-2xl font-bold text-black" style="color: #53aeb1"
        >评论</span
      >
    </div>
    <CommentControl
      class="mb-6"
      :article-id="props.articleId"
      :is-parent-comment="true"
      @comment-added="addCommentCB"
    >
    </CommentControl>

    <div class="h-auto py-6 w-1/1">
      <div class="flex items-center justify-between mb-6 font-bold w-1/1">
        <span class="text-xl">全部评论 {{ allCommentTotal }}</span>
        <span class="text-teal-500 hover:cursor-pointer" @click="loadList"
          >刷新
          <Icon class="rotate-45" name="dashicons:update2" size="25" />
        </span>
      </div>
      <transition-group>
        <div v-for="(item, index) in parentCommentList" :key="index">
          <LazyCommentItem :comment="item" @onDelete="loadList" />
        </div>
      </transition-group>
      <LazyPagination
        :pagination="{
          pageNum: commentListParams.pageNum,
          pageSize: commentListParams.pageSize,
        }"
        :total="allCommentTotal"
        :showTotal="parentCommentList.length"
        @on-current-page="handleCurrentPage"
      />
    </div>
  </div>
</template>

<style scoped></style>
