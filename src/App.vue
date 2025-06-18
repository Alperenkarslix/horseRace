<script>
import AppHeader from './components/AppHeader.vue';
import Panel from './components/ui/Panel.vue';
import HorseList from './components/HorseList.vue';
import RaceSchedule from './components/RaceSchedule.vue';
import RaceTrack from './components/RaceTrack.vue';
import RaceResults from './components/RaceResults.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Panel,
    HorseList,
    RaceSchedule,
    RaceTrack,
    RaceResults
  }
};
</script>

<template>
  <div class="h-screen bg-gray-200">
    <AppHeader />

    <main class="flex h-[calc(100vh-4rem)]">
      <Panel 
        class="w-1/5" 
        variant="secondary"
        title="Horse List (1-20)"
      >
        <HorseList />
      </Panel>

      <div class="flex-1 bg-gray-300 p-4">
        <RaceTrack />
      </div>

      <div class="w-2/5 flex">
        <Panel 
          class="flex-1" 
          variant="primary"
          title="Program"
        >
          <RaceSchedule />
        </Panel>
        <Panel 
          class="flex-1" 
          variant="success"
          title="Results"
        >
          <RaceResults />
        </Panel>
      </div>
    </main>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.5);
}
</style>
