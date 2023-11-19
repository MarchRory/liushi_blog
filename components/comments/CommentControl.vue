<script lang="ts" setup>
import { defineProps, computed, watch, defineEmits } from "vue";
import { commentItem, addCommentResult } from "../../api/types/comment";
import { addCommentAPI } from "../../api/comment";
import { useAuthorStore } from "../../store/modules/author";
import { contactType, authorType } from "../../store/modules/author";
import { useTouristStore } from "../../store/modules/tourist";
import { storeToRefs } from "pinia";
const props = defineProps<{
  articleId: string;
  reviewedItem?: commentItem;
  isParentComment: boolean;
}>();
const touristStore = useTouristStore();
const authorStore = useAuthorStore();
const { getTouristInfo } = storeToRefs(touristStore);
const emit = defineEmits<{
  (e: "commentAdded", newCommentItem: commentItem, isParent: boolean): void;
  (e: "quitComment"): void;
}>();
const commentInfo = ref<commentItem>({
  articleId: props.articleId, // 评论所属的文章id
  floorId: "", // 该条评论所属的楼主评论id
  qqEmail: getTouristInfo.value.email, // 评论者邮箱,
  avatar: "", // 评论者头像
  nickname: getTouristInfo.value.nickname, // 评论者昵称
  content: "", // 评论内容
  childCommentCnt: 0, // 子评论数
  identity: -1, // 评论者身份: 1 - 博主, 0 - 层主, -1 - 楼层中普通用户
  time: null, // 评论时间
  floorOwnerEmail: "",
  reviewedCommentId: "", // 被评论的评论id
  reviewedEmail: "", // 被评论者邮箱
  reviewedNickname: "", // 被评论者昵称
});
const reg_qqEmail = /^[1-9]\d{4,11}@qq.com$/;
const btnDisabled = ref(true);

const addComment = () => {
  const newComment = JSON.parse(JSON.stringify(commentInfo.value));
  newComment.time = new Date();
  if (props.isParentComment) {
    newComment.identity = 0;
    newComment.floorOwnerEmail = newComment.qqEmail;
  } else {
    newComment.floorOwnerEmail = props.reviewedItem?.floorOwnerEmail;
    newComment.identity =
      newComment.qqEmail == props.reviewedItem?.floorOwnerEmail ? 0 : -1;
  }
  addCommentAPI(newComment).then((res: addCommentResult) => {
    const { result } = res;
    newComment["commentId"] = result;
    const isParent = commentInfo.value.floorId == "";
    if (touristStore.qqEmail == "") {
      touristStore.setTouristInfo({
        qqEmail: commentInfo.value.qqEmail,
        nickname: commentInfo.value.nickname,
      });
    }
    commentInfo.value.content = "";
    commentInfo.value.reviewedEmail = "";
    commentInfo.value.reviewedNickname = "";
    commentInfo.value.floorOwnerEmail = "";
    commentInfo.value.identity = -1;
    emit("commentAdded", newComment, isParent);
  });
};
const avatar = computed(() => {
  if (
    reg_qqEmail.test(commentInfo.value.qqEmail) &&
    commentInfo.value.nickname
  ) {
    commentInfo.value.avatar = `https://q1.qlogo.cn/g?b=qq&nk=${
      commentInfo.value.qqEmail.split("@")[0]
    }&s=140`;
    return commentInfo.value.avatar;
  }
});
watch(
  () => [
    commentInfo.value.qqEmail,
    commentInfo.value.nickname,
    commentInfo.value.content,
  ],
  (newVal) => {
    btnDisabled.value =
      (authorStore.contact as contactType).email == commentInfo.value.qqEmail ||
      !reg_qqEmail.test(newVal[0]) ||
      newVal[1] == "" ||
      newVal[2] == "";
  }
);
watch(
  () => props.articleId,
  (newVal) => {
    commentInfo.value.articleId = newVal;
  },
  { immediate: true }
);
watch(
  () => props.reviewedItem,
  (newVal) => {
    if (typeof newVal !== "undefined") {
      commentInfo.value.floorId =
        props.reviewedItem!.floorId == ""
          ? props.reviewedItem!.commentId
          : props.reviewedItem!.floorId;
      commentInfo.value.reviewedEmail = props.reviewedItem!.qqEmail;
      commentInfo.value.reviewedNickname = props.reviewedItem!.nickname;
      commentInfo.value.reviewedCommentId = props.reviewedItem!.commentId;
    }
  },
  { immediate: true, new: true }
);
watch(
  () => [commentInfo.value.qqEmail, commentInfo.value.nickname],
  (newval) => {
    touristStore.setTouristInfo({
      qqEmail: commentInfo.value.qqEmail,
      nickname: commentInfo.value.nickname,
    });
  }
);
</script>

<template>
  <div class="flex justify-between h-auto w-1/1">
    <img
      :src="avatar"
      alt="avatar"
      class="object-cover w-10 h-10 rounded-lg bg-zinc-200"
    />
    <div class="flex flex-col" style="width: calc(100% - 4rem)">
      <div class="flex flex-row justify-between w-1/1">
        <div class="inputDiv">
          <label>昵称</label>
          <input
            class="textInput"
            placeholder="请输入昵称, 必填"
            v-model="commentInfo.nickname"
            type="text"
          />
        </div>
        <div class="inputDiv">
          <label>QQ邮箱</label>
          <input
            class="textInput"
            placeholder="请输入QQ邮箱, 必填"
            v-model="commentInfo.qqEmail"
            type="text"
          />
        </div>
      </div>
      <textarea
        class="p-4 mt-2 text-sm font-bold text-gray-500 transition-colors duration-200 bg-gray-100 border-2 border-gray-200 rounded-lg focus:bg-white min-h-16 hover:border-gray-300 focus:border-teal-400"
        placeholder="留言或评论需要填写昵称、QQ邮箱, 方便回访; 输入QQ邮箱可自动识别头像"
        v-model="commentInfo.content"
        maxlength="600"
        cols="30"
        rows="10"
      />
      <div style="width: 100%" class="flex justify-end mt-2">
        <span
          v-if="!props.isParentComment"
          class="px-4 py-2 mr-4 text-base font-bold text-gray-700 duration-200 border-2 rounded-md hover:cursor-pointer hover:bg-red-300 hover:text-white"
          @click="$emit('quitComment')"
          >取消评论</span
        >
        <button
          type="button"
          @click="addComment"
          :disabled="btnDisabled"
          class="sendBtn"
        >
          发送评论
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.textInput {
  @apply border-zinc-100 border border-solid px-2 py-1 font-bold text-sm;
}
.inputDiv {
  @apply border-2 border-gray-200 rounded-lg overflow-hidden border-l-2;
}
.sendBtn {
  @apply text-white font-mono font-bold text-base px-4 py-2 border-0 rounded-md disabled:cursor-not-allowed disabled:bg-sky-300 transition-colors duration-200 cursor-pointer bg-sky-400;
}
label {
  @apply px-2 py-1 bg-gray-200 border-4 text-sm font-bold text-gray-500;
}
input:focus {
  outline: none;
}
textarea:focus {
  outline: none;
}
</style>
