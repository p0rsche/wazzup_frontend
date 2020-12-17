<template>
  <div
    class="flex justify-between items-center h-16 p-4 my-6 rounded-lg border border-gray-100 shadow-md"
  >
    <div>
      <div class="flex items-center">
        <img
          class="rounded-full h-12 w-12"
          :src="author.avatar"
          alt="Avatar"
        />
        <div class="ml-2 overflow-y-auto max-h-12">
          <div class="text-sm font-semibold text-gray-600 ">
            {{ note.text }}
          </div>
          <div class="text-sm font-light text-gray-500">
            <p>
              Created: {{ note.created_at | dateFormatter }} Updated:
              {{ note.updated_at | dateFormatter }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShared" class="flex">
      <a :href="sharedLink" target="_blank">
        <svg
          class="text-green-500 w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </a>
    </div>
    <div class="flex">
      <div :title="getTitle()" class="mr-2">
        <div
          class="flex items-center justify-center w-full shadow-md rounded-full"
          :class="{
            'pointer-events-none': switchDisabled,
            'opacity-50': switchDisabled,
          }"
        >
          <label htmlfor="share-note" class="flex items-center cursor-pointer">
            <div class="flex items-center">
              <input
                id="share-note"
                type="checkbox"
                class="hidden"
                :checked="isShared"
                :value="isShared"
                @change="onShare"
              />
              <div
                class="toggle__line w-20 h-10 bg-gray-300 rounded-full shadow-inner"
              ></div>
              <div
                class="toggle__dot bg-red-400 absolute w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
              >
                <svg
                  class="text-white w-6 h-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokelinecap="round"
                    strokelinejoin="round"
                    strokewidth="{2}"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div class="mr-2">
        <button
          title="Edit note"
          class="btn-edit-note bg-indigo-400 hover:bg-indigo-500 p-2 rounded-full shadow-md flex justify-center items-center"
          @click="editNote(note.id)"
        >
          <svg
            class="text-white toggle__lock w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div>
        <button
          title="Delete note"
          @click="deleteNote(note.id)"
          class="btn-delete-note bg-indigo-400 hover:bg-indigo-500 p-2 rounded-full shadow-md flex justify-center items-center"
        >
          <svg
            class="text-white toggle__lock w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokelinecap="round"
              strokelinejoin="round"
              strokewidth="{2}"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import dateFormatter from "@/filters/dateFormatter";
import UserModel from "@/store/models/user.model";

@Component({
  filters: {
    dateFormatter,
  },
  data() {
    return {
      switchDisabled: false,
    };
  },
})
export default class Note extends Vue {
  @Prop() private note!: { [key: string]: string };
  @Prop() private author!: UserModel;
  switchDisabled!: boolean;

  deleteNote(id: number) {
    this.$store.dispatch("deleteNote", id);
  }

  editNote(id: number) {
    this.$store.dispatch("editNote", id);
  }

  getTitle() {
    return this.isShared ? this.note.link : "Share note";
  }

  disableSwitch() {
    this.switchDisabled = true;
  }

  enableSwitch() {
    this.switchDisabled = false;
  }

  get sharedLink() {
    return "/shared/" + this.note.link;
  }

  get isShared() {
    return !!this.note.link;
  }

  async onShare() {
    this.disableSwitch();
    try {
      if (this.isShared) {
        await this.$store.dispatch('deleteSharedNote', this.note.id);
      } else {
        await this.$store.dispatch('shareNote', this.note.id);
      }
    } catch (e) {
      console.log('Error while sharing link');
    } finally {
      this.enableSwitch();
    }
  }
}
</script>

<style scoped lang="scss">
.toggle__dot {
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
  background-color: #68d391;
}
</style>
