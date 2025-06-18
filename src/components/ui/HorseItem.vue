<template>
  <div class="bg-white rounded p-2 shadow">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div 
          class="w-4 h-4 rounded-full"
          :style="{ backgroundColor: horse.color }"
        ></div>
        <span class="text-sm font-medium">{{ horse.name }}</span>
      </div>
      <div class="text-xs text-gray-600">
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
  }
};
</script> 