<template>
  <el-scrollbar height="100vh">
    <el-menu
      router
      :default-active="route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <template v-for="menu in menus" :key="menu.path">
        <el-menu-item v-if="menu.children.length === 0" :index="menu.path">
          <Icon :icon="menu.meta.icon" />
          <template #title>{{ lastItem(menu.meta.title) }}</template>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <Icon :icon="menu.meta.icon" />
            <span>{{ lastItem(menu.meta.title) }}</span>
          </template>
          <el-menu-item v-for="subMenu in menu.children" :key="subMenu.path" :index="subMenu.path">
            <Icon :icon="subMenu.meta.icon" />
            <template #title>{{ lastItem(subMenu.meta.title) }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import router from '@/utils/router'
import meta from '../../pages.json'
import { lastItem } from '@/utils/shared'
const route = useRoute()
const isCollapse = false
// 菜单
const menus: any = computed(() => router[0].children?.filter((i) => i.meta))
</script>

<style lang="scss" scoped>
.el-menu {
  margin-top: 60px;
  border-right: 0;
  &::before {
    position: fixed;
    top: 0;
    z-index: 10;
    padding: 0 7px;
    width: 205px;
    height: 60px;
    background: #189f92;
    line-height: 60px;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 16px;
    color: #fff;
    white-space: nowrap;
    content: 'VUE3 - ADMIN';
  }
}
.el-menu--collapse {
  width: 64px;
  &::before {
    content: 'ADMIN';
  }
}
</style>
