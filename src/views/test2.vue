<route lang="json">
{
  "meta": {
    "title": "test2",
    "icon": "logos:vitest",
    "sort": 3
  }
}
</route>

<script lang="ts" setup>
const dateVal = ref(new Date())
</script>

<template>
  <div class="page-test2">
    test2
    <el-date-picker v-model="dateVal" type="date" placeholder="Pick a day" />
  </div>
</template>

<style lang="scss" scoped></style>
