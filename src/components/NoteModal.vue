<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: pencil-alt -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {{ title }}
              </h3>
              <div class="mt-2">
                <textarea
                  name="newnote"
                  v-model.trim.lazy="text"
                  rows="5"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Add note text here"
                ></textarea>
                <p v-if="error" class="error-txt mt-2 text-sm text-red-500">
                  {{ error }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="btn-proceed w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="processNote()"
          >
            {{ btnText }}
          </button>
          <button
            type="button"
            class="btn-cancel mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="closeModal()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";

@Component({
  data() {
    return {
      text: "",
      error: '',
    };
  },
  components: {},
  computed: {
    ...mapState(["modal"]),
    ...mapGetters(['isEditModal'])
  },
})
export default class NewNote extends Vue {
  isEditModal!: boolean;
  text!: string;
  error!: string | null;
  modal!: { [key: string]: string }

  created() {
    if (this.isEditModal) {
      this.text = this.modal.text;
    }
  }

  closeModal() {
    this.$store.dispatch("closeModal");
  }

  processNote() {
    //loading true, send note, if no errors = close modal
    if (this.isEditModal) {
      if (this.text.length) {
        this.$store.dispatch("saveNote", this.text);
      } else {
        //delete note which length is zero
        this.$store.dispatch("deleteNote", this.modal.noteId);
        this.$store.dispatch('closeModal');
      }
    } else {
      //creating new note
      if (this.text.length > 3) {
        this.$store.dispatch('createNote', this.text);
      }
    }
  }
  get title() {
    return this.isEditModal ? 'Edit note' : 'Add new note';
  }

  get btnText() {
    return this.isEditModal ? 'Save' : 'Add new note';
  }
}
</script>

<style></style>
