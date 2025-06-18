<template>
  <header class="bg-red-400 text-white h-16 flex items-center justify-between px-6">
    <h1 class="text-2xl font-bold">Horse Racing</h1>
    <div class="flex space-x-4">
      <BaseButton 
        v-if="!isRunning"
        @click="generateProgram"
        variant="secondary"
        data-test="generate-program"
      >
        GENERATE PROGRAM
      </BaseButton>
      <BaseButton 
        v-if="!allRacesFinished"
        @click="toggleRaces"
        :variant="buttonVariant"
        data-test="toggle-pause"
      >
        {{ buttonText }}
      </BaseButton>
      <BaseButton
        v-if="allRacesFinished"
        @click="restartGame"
        variant="success"
        data-test="restart"
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