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
  width: 4px;
  height: auto;
  background-color: rgba(202, 202, 202, 0.185);
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #206be6;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track {
  background-color: #83838300;
}</style>