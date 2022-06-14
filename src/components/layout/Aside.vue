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
      <TreeMenu :menus="treeMenus"></TreeMenu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { APP_NAME } from '@/config/app'
import router from '@/utils/router'

const route = useRoute()
// 菜单
const routers = router.find((i) => i.path === '/')?.children
const treeMenus = getTreeMenus(routers)

function getTreeMenus(menus: any, treeMenus: any = [], level = 1) {
  const targetMenus = menus.filter((i: any) => i.meta.title.length === level)
  if (targetMenus.length === 0) return treeMenus
  targetMenus.forEach((i: any) => {
    if (i.meta.hasChild) {
      i.children = getTreeMenus(menus, [], level + 1)
    }
    treeMenus.push(i)
  })
  return treeMenus
}

const { isCollapse } = useStore('app')
</script>

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
