<script setup lang="ts">
import { APP_NAME } from '@/config/app'
import router from '~pages'

const route = useRoute()
const { isCollapse } = useStore('app')
const menus = getMenus(router, '')

function getMenus(route: any, path: string) {
  return route
    .sort((a: any, b: any) => a.meta.sort - b.meta.sort)
    .map((item: any) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          path: `${path}${item.path}`,
          children: getMenus(item.children, `${path}${item.path}/`),
        }
      }
      return {
        ...item,
        path: `${path}${item.path}`,
      }
    })
}
</script>

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
      <TreeMenu :menus="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu {
  margin-top: 60px;
  border-right: 0;
  width: 200px;
  &::before {
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 10;
    box-sizing: border-box;
    padding: 0 10px;
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
