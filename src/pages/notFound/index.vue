<template>
  <div class="not-found">
    <h1>Not Found</h1>
    The requested URL {{ $route.path }} was not found on this server.
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
setTimeout(() => {
  router.push('/')
}, 2000)
</script>

<style lang="scss" scoped>
.not-found {
  margin: 15px;
}
</style>
