<template>
  <div>
    <div v-if="results.length > 0" class="space-y-2">
      <div
        v-for="(result, index) in groupedResults"
        :key="index"
        class="bg-white rounded p-2 border border-green-300"
      >
        <h3 class="font-semibold text-sm mb-2 text-center bg-orange-400 text-white py-1 rounded">
          Race {{ result.raceId }} ({{ result.distance }}m)
        </h3>
        <div class="space-y-1">
          <div
            v-for="position in result.positions"
            :key="position.horse.id"
            class="flex items-center justify-between text-xs p-1 rounded"
            :class="getPositionClass(position.position)"
          >
            <div class="flex items-center space-x-2">
              <span class="w-4 h-4 flex items-center justify-center text-xs font-bold"
                :class="getPositionBadge(position.position)"
              >
                {{ position.position }}
              </span>
              <div 
                class="w-2 h-2 rounded-full"
                :style="{ backgroundColor: position.horse.color }"
              ></div>
              <span class="text-xs font-medium">{{ position.horse.name }}</span>
            </div>
            <span class="text-xs text-gray-600">{{ position.time.toFixed(2) }}s</span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="h-full flex items-center justify-center">
      <div class="text-center text-green-700">
        <div class="text-2xl mb-2">🏁</div>
        <div class="text-sm font-medium">No Results Yet</div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RaceResults',
  computed: {
    ...mapGetters('race', ['allResults']),
    results() {
      return this.allResults;
    },
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
    }
  }
};
</script> 