<template>
  <div>控制台</div>
  <div @click="pushRouter('test1_1')">test1_1</div>
  <div @click="pushRouter('test2')">test2</div>
  <div>name:{{ name }}</div>
  <div>fullName:{{ fullName }}</div>
  <div @click="updateName">updateName</div>
</template>

<script lang="ts" setup name="dashboard">
import { useTestStore } from '@/store/test'
import { storeToRefs } from 'pinia'

const router = useRouter()
function pushRouter(path: string) {
  router.push(path)
}

const testStore = useTestStore()
const { name, fullName } = storeToRefs(testStore)

function updateName() {
  testStore.updateName('333')
}
</script>

<style lang="scss" scoped></style>
