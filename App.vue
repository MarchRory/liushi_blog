<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 0px;
  /* 取消x轴滚动条 */
  background-color: rgba(202, 202, 202, 0);
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #51d4b6;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track {
  background-color: rgba(1, 1, 1, 0);
}
</style>