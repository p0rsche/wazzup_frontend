<template>
  <div>
    <div
      class="h-screen w-screen bg-vendor-green flex justify-center content-center flex-wrap"
    >
      <p class="font-sans text-white error-text">404</p>
    </div>

    <div
      class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl"
    >
      <!-- <span class="opacity-50">Take me back to</span>
      <a class="border-b" href="https://tailwindcomponents.com"
        >tailwindcomponents.com</a> -->
    </div>
  </div>
</template>

<!-- component -->
<style scoped>
.error-text {
  font-size: 130px;
}

@media (min-width: 768px) {
  .error-text {
    font-size: 220px;
  }
  .bg-vendor-green {
    background-color: rgb(75, 203, 124);
  }
}
</style>
