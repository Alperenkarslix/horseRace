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
  },
  data() {
    return {
      activeTab: 'track'
    };
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-200">
    <AppHeader />

    <!-- Mobile Layout (< md) -->
    <main class="md:hidden">
      <!-- Tab Navigation for Mobile -->
      <div class="bg-white border-b flex">
        <button 
          @click="activeTab = 'track'"
          :class="activeTab === 'track' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
        >
          🏁 Track
        </button>
        <button 
          @click="activeTab = 'horses'"
          :class="activeTab === 'horses' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
        >
          🐴 Horses
        </button>
        <button 
          @click="activeTab = 'program'"
          :class="activeTab === 'program' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
        >
          📋 Program
        </button>
        <button 
          @click="activeTab = 'results'"
          :class="activeTab === 'results' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
        >
          🏆 Results
        </button>
      </div>

      <!-- Mobile Content -->
      <div class="h-[calc(100vh-8rem)] overflow-hidden">
        <div v-show="activeTab === 'track'" class="h-full p-2">
          <div class="h-full bg-gray-300 rounded-lg">
            <RaceTrack />
          </div>
        </div>
        
        <div v-show="activeTab === 'horses'" class="h-full">
          <Panel 
            variant="secondary"
            title="Horse List (1-20)"
            class="h-full"
          >
            <HorseList />
          </Panel>
        </div>
        
        <div v-show="activeTab === 'program'" class="h-full">
          <Panel 
            variant="primary"
            title="Program"
            class="h-full"
          >
            <RaceSchedule />
          </Panel>
        </div>
        
        <div v-show="activeTab === 'results'" class="h-full">
          <Panel 
            variant="success"
            title="Results"
            class="h-full"
          >
            <RaceResults />
          </Panel>
        </div>
      </div>
    </main>

    <!-- Desktop Layout (>= md) -->
    <main class="hidden md:flex h-[calc(100vh-4rem)]">
      <!-- Horse List - Left Panel -->
      <Panel 
        class="w-full md:w-1/4 lg:w-1/5 xl:w-1/6" 
        variant="secondary"
        title="Horse List (1-20)"
      >
        <HorseList />
      </Panel>

      <!-- Race Track - Center -->
      <div class="flex-1 bg-gray-300 p-2 md:p-4">
        <RaceTrack />
      </div>

      <!-- Right Panels - Program & Results -->
      <div class="w-full md:w-2/5 lg:w-2/5 xl:w-1/3 flex flex-col md:flex-row">
        <Panel 
          class="flex-1 min-h-0" 
          variant="primary"
          title="Program"
        >
          <RaceSchedule />
        </Panel>
        <Panel 
          class="flex-1 min-h-0" 
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

/* Mobile optimization */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 4px;
  }
}
</style>
