<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <div :class="[menu.meta.icon, 'mr10']" />
        <span>{{ lastItem(menu.meta.title) }}</span>
      </template>
      <TreeMenu :menus="menu.children"></TreeMenu>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <div :class="[menu.meta.icon, 'mr10']" />
      <template #title>{{ lastItem(menu.meta.title) }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { lastItem } from '@/utils/shared'

defineProps<{
  menus: any[]
}>()
</script>
