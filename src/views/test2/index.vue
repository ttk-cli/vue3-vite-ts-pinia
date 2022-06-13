<template>
  <div class="page-test2">
    test2
    <el-date-picker v-model="dateVal" type="date" placeholder="Pick a day" />
  </div>
</template>

<script lang="ts" setup name="test2">
const dateVal = ref(new Date())
</script>

<style lang="scss" scoped></style>
