<route lang="json">
{
  "meta": {
    "title": "dashboard",
    "icon": "clarity:dashboard-solid",
    "sort": 1
  }
}
</route>

<script lang="ts" setup>
import apiTest from '@/api/apiTest'

const router = useRouter()
function pushRouter(path: string) {
  router.push(path)
}

const { name, fullName, updateName } = useStore('test')
const { userInfo, setUserInfo } = useStore('user')

const dateVal = ref(new Date())

const icons = ['foundation-indent-more', 'foundation-indent-less']

async function getTest() {
  const res = await apiTest.getTest({ a: 1, isLoading: true })
  if (!res) return
  console.log(res, 111)
  // res.data.age
  // res.data.name
}
async function postTest() {
  const res = await apiTest.postTest({ a: 2 })
  if (!res) return
  // res.data.val
}
</script>

<template>
  <div class="page-index">
    <div>控制台</div>
    <div @click="pushRouter('test1_1')">test1_1</div>
    <div @click="pushRouter('test2')">test2</div>
    <div>name:{{ name }}</div>
    <div>fullName:{{ fullName }}</div>
    <div @click="updateName('333')">updateName</div>
    <el-button class="br-10 m-10 w-200 c-#387"> I am ElButton </el-button>
    <el-date-picker v-model="dateVal" type="date" placeholder="Pick a day" />
    <div v-for="icon in icons" :key="icon" :class="icon" />
    <div @click="getTest">getTest</div>
    <div @click="postTest">postTest</div>
    <div @click="setUserInfo({ name: 'allen', token: String(Math.random()) })">setUserInfo</div>
    <div>userInfo:{{ JSON.stringify(userInfo) }}</div>
    <div v-for="i in 50" :key="i">test</div>
  </div>
</template>

<style lang="scss" scoped></style>
