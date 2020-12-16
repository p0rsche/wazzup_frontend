<template>
  <div
    class="min-h-screen flex-1 bg-gray-200 p-4 flex justify-center items-start pt-20"
  >
    <div class="bg-white w-full md:max-w-4xl rounded-lg shadow">
      <div v-if="sortedNotes.length > 0" class="px-6">
        <Note v-for="(item, i) in sortedNotes" :key="i" :note="item" />
        <Pagination v-if="pagination.total > 10" :pagination="pagination" @navigate="onNavigate"/>
      </div>
      <div v-else class="px-6">
        <div
          class="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded-lg  shadow-inner"
        >
          <div
            class="flex items-center border border-gray-400 p-2 border-dashed rounded cursor-pointer"
          >
              <svg
                class="text-gray-500 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokelinecap="round"
                  strokelinejoin="round"
                  strokewidth="{2}"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            <div @click="addNewNote()" class="ml-1 text-gray-500 font-medium">No notes found. Create new one now!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NoteModel from "@/store/models/notes.model";
import Pagination from '@/components/Pagination.vue';
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import Note from "./Note.vue";
import Loader from "@/components/Loader.vue";

@Component({
  components: {
    Note,
    Loader,
    Pagination,
  },
  computed: {
    ...mapState(["isRequestsProcessing", "pagination"]),
    ...mapGetters(['sortedNotes']),
  },
})
export default class NotesList extends Vue {
  notes!: Array<NoteModel>;

  onNavigate(page: number) {
    this.$store.dispatch('fetchAllNotes', page);
  }

  created() {
    this.$store.dispatch("fetchAllNotes");
  }

  addNewNote() {
    this.$store.dispatch('openModal');
  }
}
</script>

<style scoped lang="scss"></style>
