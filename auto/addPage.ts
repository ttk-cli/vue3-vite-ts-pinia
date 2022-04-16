const fs = require('fs')
const path = require('path')

const metaJson = require('../src/pages.json')
const metaArr = Object.keys(metaJson)
const filesList = readFileList('./src/views')
const news = getNews(metaArr, filesList)

// 获取当前已有路由
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) //递归读取文件
    } else {
      const index = dir.lastIndexOf('\\') + 1
      filesList.push(dir.slice(index))
    }
  })
  return filesList
}
// 获取需要新增的路由  =>取两个数组的差集
function getNews(arr1, arr2) {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  const subset = []
  for (const item of set1) {
    if (!set2.has(item)) {
      subset.push(item)
    }
  }
  return subset
}
// 添加新路由
function addPages(pages) {
  console.log('\x1B[32m%s\x1B[39m', 'Start to add new routes.\n')
  if (pages.length === 0) return console.log('\x1B[33m%s\x1B[39m', 'No new routes to add.\n')

  for (const page of pages) {
    const { title, hasChild } = metaJson[page]
    const template = hasChild
      ? `<template>
  <router-view></router-view>
</template>
`
      : `<template>
  <div>${title}</div>
</template>

<script lang="ts" setup name="${page}"></script>

<style lang="scss" scoped></style>
`
    const dirPath =
      title.length > 1 ? `./src/views/${parentPage(title)}/${page}` : `./src/views/${page}`
    fs.mkdirSync(dirPath)
    const filePath = `${dirPath}/index.vue`
    const createStream = fs.createWriteStream(filePath)
    createStream.write(template)
    createStream.end()
    console.log(`${page} has been added.`)
  }
  console.log('\x1B[34m%s\x1B[39m', '\nFile created successfully.\n')
}
// 获取父级路由路径
function parentPage(title, fullPath = '') {
  for (const key in metaJson) {
    const target = metaJson[key].title
    if (JSON.stringify(target) === JSON.stringify(title.slice(0, -1))) {
      if (target.length > 1) return parentPage(target, key)
      return key + '/' + fullPath
    }
  }
}

addPages(news)
