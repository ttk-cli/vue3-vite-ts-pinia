<template>
  <div :class="className"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
  },
  w: {
    type: String,
  },
  h: {
    type: String,
  },
})

const className = computed(() => {
  const { icon, w, h } = props
  return ['icon', w, h, icon || 'carbon:unknown']
})
</script>

<style scoped></style>
