<template>
  <div class="h-full bg-gray-300 rounded-lg relative" ref="trackContainer">
    <div class="absolute top-2 left-1/2 transform -translate-x-1/2">
      <h2 class="text-black text-lg font-bold">RACE TRACK</h2>
    </div>

    <div v-if="currentRace" class="h-full pt-8">
      <div class="h-full flex flex-col justify-center space-y-1 px-4">
        <div
          v-for="(horse, index) in currentRace.horses"
          :key="horse.id"
          class="relative h-8 bg-green-500 border-t-2 border-b border-white"
        >
          <div class="absolute left-1 top-0 h-full flex items-center">
            <div class="w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-sm flex items-center justify-center">
              {{ index + 1 }}
            </div>
          </div>
          
          <div class="absolute inset-0 ml-8 mr-4">
            <div class="absolute inset-0 flex">
              <div class="w-1/4 border-r border-white border-dashed opacity-60"></div>
              <div class="w-1/4 border-r border-white border-dashed opacity-60"></div>
              <div class="w-1/4 border-r border-white border-dashed opacity-60"></div>
              <div class="w-1/4"></div>
            </div>
          </div>
          
          <div
            class="absolute top-0 h-full flex items-center transition-all duration-300 ease-out"
            :style="{ 
              left: getHorsePosition(horse.progress || 0) + 'px'
            }"
          >
            <div class="text-black text-2xl">🐴</div>
          </div>
          
          <div class="absolute right-2 top-0 h-full flex items-center">
            <div class="text-xs text-white font-semibold bg-black bg-opacity-50 px-1 rounded">
              {{ horse.name }} {{ Math.round(horse.progress || 0) }}%
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute top-8 right-4 bottom-20 w-1 bg-red-600"></div>
      <div class="absolute top-8 right-2 bottom-20 w-1 bg-red-400"></div>
      
      <div class="absolute bottom-12 right-2 text-black font-bold text-sm bg-white bg-opacity-80 px-1 rounded">
        FINISH
      </div>
      
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-black font-bold text-sm">
        Race {{ currentRace.id }} - {{ currentRace.distance }}m
      </div>
    </div>
    
    <div v-else class="h-full flex items-center justify-center">
      <div class="text-center text-gray-700">
        <div class="text-6xl mb-4">🏁</div>
        <div class="text-xl font-bold">No Active Race</div>
        <div class="text-sm">Click "GENERATE PROGRAM" then "START RACES"</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RaceTrack',
  data() {
    return {
      containerWidth: 800
    };
  },
  computed: {
    ...mapGetters('race', ['currentRace'])
  },
  mounted() {
    this.updateContainerWidth();
    window.addEventListener('resize', this.updateContainerWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerWidth);
  },
  methods: {
    updateContainerWidth() {
      if (this.$refs.trackContainer) {
        this.containerWidth = this.$refs.trackContainer.offsetWidth;
      }
    },
    getHorsePosition(progress) {
      const startPos = 40;
      const finishLineOffset = 40;
      const maxDistance = this.containerWidth - startPos - finishLineOffset;
      
      return startPos + (maxDistance * progress / 100);
    }
  }
};
</script> 