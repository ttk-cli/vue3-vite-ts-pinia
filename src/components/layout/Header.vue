<template>
  <div class="flex items-center">
    <div class="collapse-icon" @click="updateCollapse">
      <Icon
        :icon="isCollapse ? 'foundation-indent-less' : 'foundation-indent-more'"
        w="w30"
        h="h30"
      />
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">控制台</el-breadcrumb-item>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbArr" :key="item">
          {{ item }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
  <div class="logout" @click="logout">退出</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const { logout } = useUserStore()

const appStore = useAppStore()
const { isCollapse } = storeToRefs(appStore)
const { updateCollapse } = appStore

const route = useRoute()
const router = useRouter()
//面包屑
const breadcrumbArr = computed(() => {
  const arr = route.meta.title
  return arr.filter((i) => i !== '控制台')
})
</script>

<style lang="scss" scoped>
.collapse-icon {
  display: inline-block;
  margin-right: 20px;
  padding: 15px;
  cursor: pointer;
  color: #666;
  transition: background 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.logout {
  margin-right: 30px;
  cursor: pointer;
}
</style>
