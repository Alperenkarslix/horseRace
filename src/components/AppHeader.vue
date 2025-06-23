<template>
  <header class="bg-red-400 text-white h-16 flex items-center justify-between px-3 md:px-6">
    <h1 class="text-lg md:text-2xl font-bold truncate mr-2">Horse Racing</h1>
    
    <div class="flex space-x-1 md:space-x-4 flex-shrink-0">
      <BaseButton 
        v-if="!isRunning"
        @click="generateProgram"
        variant="secondary"
        :size="buttonSize"
        data-test="generate-program"
        class="whitespace-nowrap"
      >
        GENERATE PROGRAM
      </BaseButton>
      
      <BaseButton 
        v-if="!allRacesFinished"
        @click="toggleRaces"
        :variant="buttonVariant"
        :size="buttonSize"
        data-test="toggle-pause"
        class="whitespace-nowrap"
      >
        {{ buttonText }}
      </BaseButton>
      
      <BaseButton
        v-if="allRacesFinished"
        @click="restartGame"
        variant="success"
        :size="buttonSize"
        data-test="restart"
        class="whitespace-nowrap"
      >
        RESTART
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
      return window.innerWidth < 768 ? 'sm' : 'md';
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
    }
  }
};
</script> 