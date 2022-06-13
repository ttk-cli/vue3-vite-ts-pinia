<template>
  <div :class="className"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string | unknown
  w?: string
  h?: string
}>()

const className = computed(() => {
  const { icon, w, h } = props
  return ['icon', w, h, icon || 'carbon:unknown']
})
</script>

<style scoped></style>
