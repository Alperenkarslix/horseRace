<template>
  <div>
    <div v-if="results.length > 0" class="space-y-1 md:space-y-2">
      <div
        v-for="(result, index) in groupedResults"
        :key="index"
        class="bg-white rounded p-1.5 md:p-2 border border-green-300 hover:shadow-md transition-shadow"
        data-test="result-item"
      >
        <h3 class="font-semibold text-xs md:text-sm mb-1 md:mb-2 text-center bg-orange-400 text-white py-0.5 md:py-1 rounded">
          <span class="hidden sm:inline">Race {{ result.raceId }} ({{ result.distance }}m)</span>
          <span class="sm:hidden">R{{ result.raceId }} - {{ result.distance }}m</span>
        </h3>
        <div class="space-y-0.5 md:space-y-1">
          <div
            v-for="position in result.positions"
            :key="position.horse.id"
            class="flex items-center justify-between text-xs p-0.5 md:p-1 rounded"
            :class="getPositionClass(position.position)"
          >
            <div class="flex items-center space-x-1 md:space-x-2 flex-1 min-w-0">
              <span class="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-xs font-bold flex-shrink-0"
                :class="getPositionBadge(position.position)"
              >
                {{ position.position }}
              </span>
              <div 
                class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0"
                :style="{ backgroundColor: position.horse.color }"
              ></div>
              <span class="text-xs font-medium truncate">
                {{ getMobileHorseName(position.horse.name) }}
              </span>
            </div>
            <span class="text-xs text-gray-600 flex-shrink-0 ml-1">
              {{ position.time.toFixed(2) }}s
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="h-full flex items-center justify-center" data-test="empty-state">
      <div class="text-center text-green-700 px-4">
        <div class="text-xl md:text-2xl mb-1 md:mb-2">🏁</div>
        <div class="text-xs md:text-sm font-medium">
          <div class="md:hidden">No Results</div>
          <div class="hidden md:block">No Results Yet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RaceResults',
  computed: {
    ...mapGetters('race', ['results']),
    groupedResults() {
      const grouped = {};
      this.results.forEach(result => {
        if (!grouped[result.raceId]) {
          grouped[result.raceId] = {
            raceId: result.raceId,
            distance: result.distance,
            positions: []
          };
        }
        grouped[result.raceId].positions.push(result);
      });
      
      Object.values(grouped).forEach(race => {
        race.positions.sort((a, b) => a.position - b.position);
      });
      
      return Object.values(grouped);
    }
  },
  methods: {
    getPositionClass(position) {
      if (position === 1) return 'bg-yellow-100 border border-yellow-300';
      if (position === 2) return 'bg-gray-100 border border-gray-300';
      if (position === 3) return 'bg-orange-100 border border-orange-300';
      return 'bg-gray-50';
    },
    getPositionBadge(position) {
      if (position === 1) return 'bg-yellow-500 text-white rounded';
      if (position === 2) return 'bg-gray-500 text-white rounded';
      if (position === 3) return 'bg-orange-500 text-white rounded';
      return 'text-gray-600';
    },
    getMobileHorseName(name) {
      return window.innerWidth < 640 ? name.substring(0, 6) + (name.length > 6 ? '...' : '') : name;
    }
  }
};
</script> 