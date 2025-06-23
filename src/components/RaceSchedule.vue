<template>
  <div class="space-y-1 md:space-y-2">
    <div
      v-for="race in races"
      :key="race.id"
      class="bg-white rounded p-1.5 md:p-2 hover:shadow-md transition-shadow"
      :class="getRaceClass(race.status)"
      data-test="race-item"
    >
      <div class="flex justify-between items-center mb-1 md:mb-1">
        <div>
          <h3 class="font-semibold text-xs md:text-sm">Race {{ race.id }}</h3>
          <p class="text-xs text-gray-600">{{ race.distance }}m</p>
        </div>
        <span 
          class="px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-medium" 
          :class="getStatusClass(race.status)"
          data-test="race-status"
        >
          {{ getStatusText(race.status) }}
        </span>
      </div>
        
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-0.5 md:gap-1 text-xs">
        <div
          v-for="horse in race.horses"
          :key="horse.id"
          class="text-gray-700 bg-gray-100 rounded px-1 py-0.5 flex items-center space-x-1"
        >
          <div 
            class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0"
            :style="{ backgroundColor: horse.color }"
          ></div>
          <span class="text-xs truncate">{{ horse.name }}</span>
        </div>
      </div>
    </div>
    
    <div v-if="!races.length" data-test="empty-state" class="text-center text-gray-500 py-4">
      <div class="text-sm md:text-base">No races scheduled</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RaceSchedule',
  computed: {
    ...mapGetters('race', ['allRaces', 'isPaused']),
    races() {
      return this.allRaces;
    }
  },
  methods: {
    getRaceClass(status) {
      if (status === 'running') return 'border-blue-400 bg-blue-50';
      if (status === 'finished') return 'border-green-400 bg-green-50';
      return 'border-gray-300';
    },
    getStatusClass(status) {
      if (status === 'running' && this.isPaused) return 'text-yellow-700 bg-yellow-200';
      if (status === 'running') return 'text-blue-700 bg-blue-200';
      if (status === 'finished') return 'text-green-700 bg-green-200';
      return 'text-gray-600 bg-gray-200';
    },
    getStatusText(status) {
      if (status === 'running') return this.isPaused ? 'Paused' : 'Racing';
      if (status === 'finished') return 'Finished';
      return 'Waiting';
    }
  }
};
</script> 