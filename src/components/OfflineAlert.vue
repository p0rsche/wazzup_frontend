<template>
  <div
    v-if="isOffline"
    class="px-4 py-3 leading-normal text-red-100 bg-red-700 rounded-lg"
    role="alert"
  >
    <p>There is a problem with your connection or backend error.</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {
  },
  computed: {
    ...mapGetters(['isOffline'])
  }
})
export default class OfflineAlert extends Vue {
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
