<script lang="ts" setup>
const { tabs } = useStore('app')

const router = useRouter()
const routes = router.getRoutes()
const needCacheRouteNames = routes
  .filter((item) => item.meta && !item.meta.notCache)
  .map((item) => item.name)

const cacheList = computed(() => {
  const arr = tabs.value
    .map((item) => item.name)
    .filter((item) => needCacheRouteNames.includes(item))
    .map((item) => item.replace(/^\//, ''))
  return arr
})
</script>

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
            <keep-alive :include="cacheList">
              <component :is="Component" :key="route.name" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
  <el-backtop target=".el-main" />
</template>
