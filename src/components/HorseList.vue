<template>
  <div class="space-y-2">
    <div v-if="sortedHorses.length === 0" data-test="empty-state" class="text-center text-gray-500 py-4">
      No horses available
    </div>
    <div
      v-for="horse in sortedHorses"
      :key="horse.id"
      class="horse-item bg-white rounded p-2 border border-gray-300"
      data-test="horse-item"
    >
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center space-x-2">
          <div 
            class="horse-color w-3 h-3 rounded-full"
            :style="{ backgroundColor: horse.color }"
          ></div>
          <span class="text-sm font-medium">{{ horse.name }}</span>
        </div>
        <div class="text-xs font-medium" :class="getConditionClass(horse.condition)">
          {{ horse.condition }}%
        </div>
      </div>
      <div class="h-1.5 bg-gray-200 rounded overflow-hidden">
        <div
          class="h-full rounded transition-all duration-300"
          :class="getProgressClass(horse.condition)"
          :style="{ width: `${horse.condition}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HorseList',
  computed: {
    ...mapGetters('race', ['allHorses']),
    sortedHorses() {
      return [...this.allHorses].sort((a, b) => b.condition - a.condition);
    }
  },
  methods: {
    getConditionClass(condition) {
      if (condition >= 80) return 'text-green-600';
      if (condition >= 60) return 'text-blue-600';
      if (condition >= 40) return 'text-yellow-600';
      return 'text-red-600';
    },
    getProgressClass(condition) {
      if (condition >= 80) return 'bg-green-500';
      if (condition >= 60) return 'bg-blue-500';
      if (condition >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  },
  created() {
    if (this.allHorses.length === 0) {
      this.$store.dispatch('race/createHorses');
    }
  }
};
</script> 