<template>
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        :class="{ 'hidden': hidePreviousLink }"
        @click.prevent="prevPage()"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
      >
        Previous
      </a>
      <a
        href="#"
        :class="{ 'hidden': hideNextLink }"
        @click.prevent="nextPage()"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
      >
        Next
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ pagination.from + 1 }}</span>
          to
          <span class="font-medium">{{ pagination.to }}</span>
          of
          <span class="font-medium">{{ pagination.total }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            @click.prevent="prevPage()"
            :class="{ 'hidden': hidePreviousLink }"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: chevron-left -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href=""
            @click.prevent="goTo(page)"
            v-for="(page, i) in totalPages" :key="i"
            :class="{ 'pointer-events-none cursor-not-allowed opacity-50': page === pagination.currentPage}"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {{ page }}
          </a>
          <a
            href=""
            @click.prevent="nextPage()"
            :class="{ 'hidden': hideNextLink}"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: chevron-right -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PaginationModel from '@/store/models/pagination.model';

@Component
export default class Pagination extends Vue {
  @Prop() private pagination!: PaginationModel;

  nextPage() {
    this.goTo(this.pagination.currentPage + 1);
  }

  prevPage() {
    this.goTo(this.pagination.currentPage - 1);
  }

  goTo(page: number | string) {
    this.$emit('navigate', page);
  }

  get hidePreviousLink() {
    return this.pagination.currentPage === 1;
  }

  get hideNextLink() {
    return this.pagination.currentPage === this.pagination.lastPage;
  }

  get totalPages() {
    return this.pagination.lastPage;
  }
}
</script>

