<template>
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="tabs.map((i) => i.name.slice(1))">
              <component :is="Component" :key="route.name"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
  <el-backtop target=".el-main"></el-backtop>
</template>
<script lang="ts" setup>
const { tabs } = useStore('app')
</script>
