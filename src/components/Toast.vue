<template>
  <div class="fixed top-0 right-0 m-6">
    <Transition name="slide-fade">
      <div
        class="bg-red-200 text-red-900 rounded-lg shadow-md p-6 pr-10"
        style="min-width: 240px"
      >
        <button
          @click.prevent="$emit('close')"
          class="opacity-75 cursor-pointer absolute top-0 right-0 py-2 px-3 hover:opacity-100"
        >
          ×
        </button>
        <div class="flex items-center">
          {{ text }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Pagination from "@/components/Pagination.vue";

@Component({
  components: {
    Pagination,
  },
})
export default class Toast extends Vue {
  @Prop() private text!: string;
}
</script>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>
