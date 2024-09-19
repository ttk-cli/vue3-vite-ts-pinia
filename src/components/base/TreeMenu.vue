<script setup lang="ts">
defineProps<{
  menus: any[]
}>()
</script>

<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <div class="mr-10 box-border min-w-24" :class="menu.meta.icon" />
        <span>{{ menu.meta.title }}</span>
      </template>
      <TreeMenu :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <div class="mr-10 box-border min-w-24" :class="menu.meta.icon" />
      <template #title>
        {{ menu.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>
