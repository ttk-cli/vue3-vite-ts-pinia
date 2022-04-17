<template>
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <el-backtop target=".el-main"></el-backtop>
</template>
<script lang="ts" setup></script>
