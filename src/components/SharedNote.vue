<template>
  <div
    class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5"
  >
    <div
      class="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
      style="max-width: 500px"
    >
      <div class="w-full pt-1 pb-5">
        <div
          class="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg"
        >
          <img :src="avatar" alt="avatar" />
        </div>
      </div>
      <div class="w-full mb-10">
        <div class="text-3xl text-indigo-500 text-left leading-tight h-3">
          “
        </div>
        <p
          class="text-sm text-gray-600 text-center px-5 max-h-60 overflow-y-auto"
        >
          {{ note.text }}
        </p>
        <div
          class="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3"
        >
          ”
        </div>
      </div>
      <div class="w-full">
        <p
          v-if="note.fullname"
          class="text-md text-indigo-500 font-bold text-center"
        >
          {{ note.fullname }}
        </p>
        <p v-if="note.login" class="text-xs text-gray-500 text-center">
          @{{ note.login }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SharedNote extends Vue {
  @Prop() private note!: { [key: string]: string };

  get avatar() {
    return (
      this.note.avatar ??
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    );
  }
}
</script>
