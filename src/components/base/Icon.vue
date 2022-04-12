<template>
  <div :class="[...size, icon || 'carbon-unknown']"></div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
  },
  size: {
    type: Array,
    default: ['w40', 'h40'],
  },
})
</script>

<style scoped></style>
