<template>
  <header class="bg-red-400 text-white h-16 flex items-center justify-between px-3 md:px-6">
    <!-- Title - Responsive -->
    <h1 class="text-lg md:text-2xl font-bold truncate mr-2">
      <span class="hidden sm:inline">Horse Racing</span>
      <span class="sm:hidden">🏇 Racing</span>
    </h1>
    
    <!-- Button Group - Responsive -->
    <div class="flex space-x-1 md:space-x-4 flex-shrink-0">
      <BaseButton 
        v-if="!isRunning"
        @click="generateProgram"
        variant="secondary"
        :size="buttonSize"
        data-test="generate-program"
        class="whitespace-nowrap"
      >
        <span class="hidden sm:inline">GENERATE PROGRAM</span>
        <span class="sm:hidden">🎲 GEN</span>
      </BaseButton>
      
      <BaseButton 
        v-if="!allRacesFinished"
        @click="toggleRaces"
        :variant="buttonVariant"
        :size="buttonSize"
        data-test="toggle-pause"
        class="whitespace-nowrap"
      >
        <span class="hidden sm:inline">{{ buttonText }}</span>
        <span class="sm:hidden">{{ getMobileButtonText() }}</span>
      </BaseButton>
      
      <BaseButton
        v-if="allRacesFinished"
        @click="restartGame"
        variant="success"
        :size="buttonSize"
        data-test="restart"
        class="whitespace-nowrap"
      >
        <span class="hidden sm:inline">RESTART</span>
        <span class="sm:hidden">🔄</span>
      </BaseButton>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from './ui/BaseButton.vue';

export default {
  name: 'AppHeader',
  components: {
    BaseButton
  },
  computed: {
    ...mapGetters('race', ['isRunning', 'isPaused', 'allRaces']),
    buttonText() {
      if (!this.isRunning) return 'START RACES';
      return this.isPaused ? 'RESUME' : 'PAUSE';
    },
    buttonVariant() {
      if (!this.isRunning) return 'success';
      return this.isPaused ? 'warning' : 'danger';
    },
    allRacesFinished() {
      return this.allRaces.length > 0 && this.allRaces.every(race => race.status === 'finished');
    },
    buttonSize() {
      // Mobile first approach - small buttons on mobile, medium on desktop
      return 'sm';
    }
  },
  methods: {
    generateProgram() {
      this.$store.dispatch('race/createProgram');
    },
    toggleRaces() {
      this.$store.dispatch('race/togglePause');
    },
    restartGame() {
      this.$store.dispatch('race/restart');
    },
    getMobileButtonText() {
      if (!this.isRunning) return '▶️';
      return this.isPaused ? '▶️' : '⏸️';
    }
  }
};
</script> 