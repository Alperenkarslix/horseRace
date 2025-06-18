<template>
  <header class="bg-red-400 text-white h-16 flex items-center justify-between px-6">
    <h1 class="text-2xl font-bold">Horse Racing</h1>
    <div class="flex space-x-4">
      <BaseButton 
        @click="generateProgram"
        variant="secondary"
      >
        GENERATE PROGRAM
      </BaseButton>
      <BaseButton 
        @click="toggleRaces"
        :variant="buttonVariant"
      >
        {{ buttonText }}
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
    ...mapGetters('race', ['isRunning', 'isPaused']),
    buttonText() {
      if (!this.isRunning) return 'START RACES';
      return this.isPaused ? 'RESUME' : 'PAUSE';
    },
    buttonVariant() {
      if (!this.isRunning) return 'success';
      return this.isPaused ? 'warning' : 'danger';
    }
  },
  methods: {
    generateProgram() {
      this.$store.dispatch('race/createProgram');
    },
    toggleRaces() {
      this.$store.dispatch('race/togglePause');
    }
  }
};
</script> 