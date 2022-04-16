<template>
  <div @click="login">login</div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
const { setUserInfo } = useUserStore()
const router = useRouter()
async function login() {
  await setUserInfo({
    name: 'admin',
    token: 'admin',
  })
  router.push('/')
}
</script>
