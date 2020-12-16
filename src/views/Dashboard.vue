<template>
  <div class="home">
    <NavBar />
    <OfflineAlert />
    <NotesList />
    <NoteModal v-if="isModalOpen" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import Loader from "@/components/Loader.vue";
import NotesList from "@/components/NotesList.vue";
import NoteModal from "@/components/NoteModal.vue";
import OfflineAlert from '@/components/OfflineAlert.vue';

import { mapGetters } from "vuex";

@Component({
  components: {
    NavBar,
    Loader,
    NotesList,
    NoteModal,
    OfflineAlert,
  },
  computed: {
    ...mapGetters(["isModalOpen"]),
  },
})
export default class Dashboard extends Vue {}
</script>
