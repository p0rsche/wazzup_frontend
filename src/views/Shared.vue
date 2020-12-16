<template>
  <SharedNote v-if="note" :note="note" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SharedNote from '../components/SharedNote.vue';
import SharedService from '@/services/shared.service';

@Component({
  components: {
    SharedNote
  },
  data() {
    return {
      note: null,
    }
  }
})
export default class Shared extends Vue {
  private note!: {[key: string]: string}

  async created() {
    try {
      const { link } = this.$route.params;
      const note = await SharedService.getShared(link);
      this.note = note;
    } catch (e) {
      this.$router.push({ name: 'notfound'});
    }
  }
}
</script>
