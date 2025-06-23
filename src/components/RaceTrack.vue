<template>
  <div class="h-full bg-gray-300 rounded-lg relative" ref="trackContainer">
    <div class="absolute top-1 md:top-2 left-1/2 transform -translate-x-1/2 z-10">
      <h2 class="text-black text-sm md:text-lg font-bold">RACE TRACK</h2>
    </div>

    <div v-if="currentRace" class="h-full pt-6 md:pt-8">
      <div class="h-full flex flex-col justify-center space-y-0.5 md:space-y-1 px-2 md:px-4">
        <div
          v-for="(horse, index) in currentRace.horses"
          :key="horse.id"
          class="relative h-6 md:h-8 bg-green-500 border-t-2 border-b border-white"
        >
          <div class="absolute left-0.5 md:left-1 top-0 h-full flex items-center">
            <div class="w-4 h-4 md:w-6 md:h-6 bg-green-600 text-white text-xs font-bold rounded-sm flex items-center justify-center">
              {{ index + 1 }}
            </div>
          </div>
          
          <div class="absolute inset-0 ml-5 md:ml-8 mr-2 md:mr-4">
            <div class="absolute inset-0 flex">
              <div class="w-1/4 border-r border-white border-dashed opacity-60"></div>
              <div class="w-1/4 border-r border-white border-dashed opacity-60"></div>
              <div class="w-1/4 border-r border-white border-dashed opacity-60"></div>
              <div class="w-1/4"></div>
            </div>
          </div>
          
          <div
            class="absolute top-0 h-full flex items-center transition-all duration-300 ease-out z-20"
            :style="{ 
              left: getHorsePosition(horse.progress || 0) + 'px'
            }"
          >
            <div class="text-black text-lg md:text-2xl">🐴</div>
          </div>
          
          <div class="absolute right-1 md:right-2 top-0 h-full flex items-center">
            <div class="text-xs text-white font-semibold bg-black bg-opacity-50 px-1 rounded max-w-20 md:max-w-none truncate">
              <span class="hidden md:inline">{{ horse.name }}</span>
              <span class="md:hidden">{{ horse.name.substring(0, 3) }}</span>
              {{ Math.round(horse.progress || 0) }}%
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute top-6 md:top-8 right-3 md:right-4 bottom-16 md:bottom-20 w-1 bg-red-600"></div>
      <div class="absolute top-6 md:top-8 right-1 md:right-2 bottom-16 md:bottom-20 w-1 bg-red-400"></div>
      
      <div class="absolute bottom-8 md:bottom-12 right-1 md:right-2 text-black font-bold text-xs md:text-sm bg-white bg-opacity-80 px-1 rounded">
        FINISH
      </div>
      
      <div class="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 text-black font-bold text-xs md:text-sm text-center">
        <div>Race {{ currentRace.id }} - {{ currentRace.distance }}m</div>
      </div>
    </div>
    
    <div v-else class="h-full flex items-center justify-center">
      <div class="text-center text-gray-700 px-4">
        <div class="text-4xl md:text-6xl mb-2 md:mb-4">🏁</div>
        <div class="text-lg md:text-xl font-bold mb-1 md:mb-2">No Active Race</div>
        <div class="text-xs md:text-sm">
          <div class="md:hidden">Generate program & start races</div>
          <div class="hidden md:block">Click "GENERATE PROGRAM" then "START RACES"</div>
        </div>
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
      const isMobile = window.innerWidth < 768;
      const startPos = isMobile ? 24 : 40;
      const finishLineOffset = isMobile ? 20 : 40;
      const maxDistance = this.containerWidth - startPos - finishLineOffset;
      
      return startPos + (maxDistance * progress / 100);
    }
  }
};
</script> 