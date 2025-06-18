<template>
  <div class="horse-item bg-white rounded p-2 border border-gray-300" data-test="horse-item">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div 
          class="horse-color w-3 h-3 rounded-full"
          :style="{ backgroundColor: horse.color }"
        ></div>
        <span class="text-sm font-medium">{{ horse.name }}</span>
      </div>
      <div class="text-xs font-medium" :class="getConditionClass(horse.condition)">
        {{ horse.condition }}%
      </div>
    </div>
    <div class="mt-1">
      <div class="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          class="bg-green-500 h-1.5 rounded-full transition-all duration-300"
          :style="{ width: horse.condition + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorseItem',
  props: {
    horse: {
      type: Object,
      required: true
    }
  },
  methods: {
    getConditionClass(condition) {
      if (condition >= 80) return 'text-green-600';
      if (condition >= 60) return 'text-blue-600';
      if (condition >= 40) return 'text-yellow-600';
      return 'text-red-600';
    }
  }
};
</script> 