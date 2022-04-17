<template>
  <div class="page-dashboard">
    <div>控制台</div>
    <div @click="pushRouter('test1_1')">test1_1</div>
    <div @click="pushRouter('test2')">test2</div>
    <div>name:{{ name }}</div>
    <div>fullName:{{ fullName }}</div>
    <div @click="updateName">updateName</div>
    <el-button class="m10 w200 br10 c-#387">I am ElButton</el-button>
    <el-date-picker v-model="dateVal" type="date" placeholder="Pick a day" />
    <Icon v-for="icon in icons" :key="icon" :icon="icon" />
    <div v-for="i in 50" :key="i">test</div>
  </div>
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

const dateVal = ref(new Date())

const icons = ['foundation-indent-more', 'foundation-indent-less', '']
</script>

<style lang="scss" scoped></style>
