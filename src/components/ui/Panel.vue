<template>
  <div class="overflow-y-auto" :class="[bgClass, 'p-4']">
    <h2 
      v-if="title"
      class="text-lg font-bold mb-3 text-center py-2 rounded"
      :class="headerClass"
    >
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'panelPage',
  props: {
    title: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary', 'success', 'warning'].includes(value)
    }
  },
  computed: {
    bgClass() {
      const variants = {
        default: 'bg-gray-100',
        primary: 'bg-blue-400',
        secondary: 'bg-yellow-300',
        success: 'bg-green-400',
        warning: 'bg-orange-400'
      };
      return variants[this.variant];
    },
    headerClass() {
      const variants = {
        default: 'bg-gray-500 text-white',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-yellow-400 text-gray-800',
        success: 'bg-green-500 text-white',
        warning: 'bg-orange-500 text-white'
      };
      return variants[this.variant];
    }
  }
};
</script> 