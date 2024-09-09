<script lang="ts" setup>
const { setUserInfo } = useStore('user')
const router = useRouter()
function login() {
  setUserInfo({
    name: 'admin',
    token: 'admin',
  })
  router.push('/')
}
</script>

<template>
  <div @click="login">
    login
  </div>
</template>
