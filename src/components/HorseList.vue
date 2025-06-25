<template>
  <div class="space-y-1 md:space-y-2">
    <div v-if="sortedHorses.length === 0" data-test="empty-state" class="text-center text-gray-500 py-4">
      No horses available
    </div>
    <HorseItem
      v-for="horse in sortedHorses"
      :key="horse.id"
      :horse="horse"
      data-test="horse-item"
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
    sortedHorses() {
      return [...this.allHorses].sort((a, b) => b.condition - a.condition);
    }
  },
  created() {
    if (this.allHorses.length === 0) {
      this.$store.dispatch('race/createHorses');
    }
  }
};
</script> 