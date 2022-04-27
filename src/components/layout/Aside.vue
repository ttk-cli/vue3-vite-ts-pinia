<template>
  <el-scrollbar height="100vh">
    <el-menu
      router
      :default-active="route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :data-text="APP_NAME"
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
import { onBeforeRouteUpdate } from 'vue-router'
import router from '@/utils/router'
import { lastItem } from '@/utils/shared'
import { useAppStore } from '@/store/app'
import { APP_NAME } from '@/config/app'

const route = useRoute()

// 菜单
const menus: any = computed(() => router[0].children?.filter((i) => i.meta))

const appStore = useAppStore()
const { isCollapse } = storeToRefs(appStore)
const { addTab } = appStore

// 更新头部tabs
onBeforeRouteUpdate((to, from, next) => {
  const tab = { title: lastItem(to.meta.title as string[]), name: to.path }
  addTab(tab)
  next()
})
</script>

<style lang="scss" scoped>
.el-menu {
  margin-top: 60px;
  border-right: 0;
  width: 200px;
  &::before {
    position: fixed;
    top: 0;
    z-index: 10;
    box-sizing: border-box;
    width: 200px;
    height: 60px;
    background: #189f92;
    line-height: 60px;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 16px;
    color: #fff;
    white-space: nowrap;
    content: attr(data-text);
  }
}
.el-menu--collapse {
  width: 70px;
  &::before {
    width: 70px;
    content: 'ADMIN';
  }
}
.v-leave-to {
  width: 200px;
  &::before {
    width: 200px;
    content: attr(data-text);
  }
}
</style>
