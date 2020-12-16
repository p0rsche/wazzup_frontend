<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="../assets/img/logo.png"
              alt="Wazzup"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="../assets/img/logo.png"
              alt="Wazzup"
            />
          </div>
          <div class="md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                @click.prevent="addNewNote()"
                class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"
                >Add new note</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="ml-3 relative">
            <div v-click-outside="hide" @click="isActive = !isActive">
              <button
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            <div
              v-show="isActive"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                @click.prevent="signout()"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ClickOutside from "vue-click-outside";

@Component({
  directives: {
    ClickOutside,
  },
})
export default class NavBar extends Vue {
  public isActive = false;

  signout(): void {
    this.$store
      .dispatch("logout")
      .then(() => this.$router.push({ name: "login" }))
      .catch((e) => console.log(e));
  }

  hide(): void {
    this.isActive = false;
  }

  addNewNote() {
    this.$store.dispatch('openModal');
  }
}
</script>

<style scoped lang="scss"></style>
