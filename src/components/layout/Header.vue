<template>
  <div class="collapse-icon" @click="updateCollapse">
    <Icon
      :icon="isCollapse ? 'foundation-indent-less' : 'foundation-indent-more'"
      w="w30"
      h="h30"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isCollapse } = storeToRefs(appStore)
const { updateCollapse } = appStore
</script>

<style lang="scss" scoped>
.collapse-icon {
  display: inline-block;
  padding: 15px;
  cursor: pointer;
  color: #666;
  transition: background 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
