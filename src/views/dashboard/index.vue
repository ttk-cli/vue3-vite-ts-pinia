<template>
  <div>控制台</div>
  <div @click="pushRouter('test1_1')">test1_1</div>
  <div @click="pushRouter('test2')">test2</div>
</template>

<script lang="ts" setup name="dashboard">
const router = useRouter()
function pushRouter(path: string) {
  router.push(path)
}
</script>

<style lang="scss" scoped></style>
