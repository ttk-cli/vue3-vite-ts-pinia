<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/en'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss"></style>
