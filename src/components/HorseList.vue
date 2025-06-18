<template>
  <div class="space-y-2">
      <HorseItem
        v-for="horse in horses"
        :key="horse.id"
        :horse="horse"
      />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HorseItem from './ui/HorseItem.vue';

export default {
  name: 'HorseList',
  components: {
    HorseItem
  },
  computed: {
    ...mapGetters('race', ['allHorses']),
    horses() {
      return this.allHorses;
    }
  },
  created() {
    if (this.horses.length === 0) {
      this.$store.dispatch('race/createHorses');
    }
  }
};
</script> 