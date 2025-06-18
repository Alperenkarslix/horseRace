<template>
  <button 
    @click="$emit('click')"
    class="px-6 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="[baseClasses, colorClasses, sizeClasses]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  emits: ['click'],
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    baseClasses() {
      return this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    },
    colorClasses() {
      const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
        secondary: 'bg-gray-200 hover:bg-gray-100 text-gray-800 focus:ring-gray-500',
        success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
      };
      return variants[this.variant];
    },
    sizeClasses() {
      const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-6 py-2',
        lg: 'px-8 py-3 text-lg'
      };
      return sizes[this.size];
    }
  }
};
</script> 