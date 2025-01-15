<script setup lang="ts">
const { logout } = useStore('user')

const {
  isCollapse,
  tabs,
  updateCollapse,
  removeTab,
  removeOtherTab,
  removeRightTab,
  removeAllTab,
} = useStore('app')

const route = useRoute()
const router = useRouter()

// 面包屑
const breadcrumbArr = computed(() => {
  return route.matched.filter((item) => !['/'].includes(item.path) && item.meta.title)
})

// 切换tabs
function tabClick(val: number | string = 0, delay = true) {
  let fullPath: any
  if (typeof val === 'number') {
    fullPath = tabs.value[val].fullPath
  } else {
    fullPath = val
  }
  setTimeout(
    () => {
      const parsedUrl = new URL(fullPath, window.location.origin) // 使用当前域名和路径
      const path = parsedUrl.pathname
      const query = Object.fromEntries(new URLSearchParams(parsedUrl.search) as any)

      router.push({
        path,
        query,
      })
    },
    delay ? 200 : 0,
  )
}

// tabs右键选项
const visible = ref(false)
const top = ref(0)
const left = ref(0)
let clickName = ''
function rightClick(e: { x: number; y: number }, fullPath: string) {
  clickName = fullPath
  left.value = e.x + 5
  top.value = e.y + 5
  visible.value = true
}
function closeMenu() {
  visible.value = false
}
function tabRemove(fullPath: string = clickName) {
  const index = tabs.value.findIndex((i: App.Tab) => i.fullPath === fullPath)
  removeTab(fullPath)
  if (route.fullPath === fullPath) {
    const nextTabIndex = index > tabs.value.length - 1 ? tabs.value.length - 1 : index
    tabClick(nextTabIndex)
  }
}
function tabRemoveOther() {
  removeOtherTab(clickName)
  tabClick()
}
function tabRemoveRight() {
  removeRightTab(clickName)
  if (tabs.value.every((i: App.Tab) => i.fullPath !== route.fullPath)) {
    tabClick(clickName)
  }
}
function tabRemoveAll() {
  removeAllTab()
  tabClick()
}
watch(visible, (curAge) => {
  if (curAge) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

// tabs拖拽
let dragIndex = 0

function dragstart(index: number) {
  dragIndex = index
  closeMenu()
}
function dragover(e: { preventDefault: () => void }) {
  e.preventDefault()
}
function dragenter(e: { preventDefault: () => void }, index: number) {
  if (document.querySelector('.tabs-move')) return
  e.preventDefault()
  if (dragIndex !== index) {
    const source = tabs.value[dragIndex]
    tabs.value.splice(dragIndex, 1)
    tabs.value.splice(index, 0, source)
    dragIndex = index
  }
}
</script>

<template>
  <div class="breadcrumb">
    <div class="flex items-center">
      <div class="collapse-icon" @click="updateCollapse">
        <div
          class="mx-10 h-30 w-30"
          :class="[isCollapse ? 'foundation-indent-less' : 'foundation-indent-more']"
        />
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/"> dashboard </el-breadcrumb-item>
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="item in breadcrumbArr" :key="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="logout" @click="logout">退出</div>
  </div>
  <div class="tabs">
    <transition-group name="tabs">
      <div
        v-for="(item, index) in tabs"
        :key="item.fullPath"
        class="tab-item"
        :class="{ 'tab-active': item.fullPath === route.fullPath }"
        draggable="true"
        @click="tabClick(item.fullPath, false)"
        @contextmenu.prevent="rightClick($event, item.fullPath)"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event)"
        @dragstart="dragstart(index)"
      >
        <div v-show="item.fullPath === route.fullPath" class="circle" />
        <div class="content">
          {{ item.title }}
        </div>
        <div
          class="carbon:close close-icon hover:carbon:close-filled"
          @click.stop="tabRemove(item.fullPath)"
        />
      </div>
    </transition-group>
    <ul v-show="visible" :style="{ left: `${left}px`, top: `${top}px` }" class="contextmenu">
      <li @click="tabRemove()">关闭</li>
      <li @click="tabRemoveOther">关闭其他</li>
      <li @click="tabRemoveRight">关闭到右侧</li>
      <li @click="tabRemoveAll">关闭所有</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .collapse-icon {
    display: inline-block;
    margin-right: 20px;
    padding: 15px;
    cursor: pointer;
    color: #666;
    transition: background 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .logout {
    margin-right: 30px;
    cursor: pointer;
  }
}
.tabs {
  overflow-x: scroll;
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  .tab-item {
    display: inline-block;
    position: relative;
    margin: 0 3px;
    padding: 5px 20px;
    border: 1px solid #ddd;
    border-radius: 2px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    .circle {
      margin-right: 5px;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background: #fff;
    }
    .circle,
    .content {
      display: inline-block;
      transition: transform 0.2s;
    }
    .close-icon {
      position: absolute;
      right: 0;
      top: 6px;
      opacity: 0;
      font-size: 14px;
      transition-property: opacity, transform;
      transition-duration: 0.2s, 0.2s;
    }
    &:hover {
      .circle,
      .content,
      .close-icon {
        transform: translateX(-7px);
      }
      .close-icon {
        opacity: 1;
      }
    }
  }
  .tab-active {
    border-color: #42b983;
    background: #42b983;
    color: #fff;
  }
  .contextmenu {
    position: absolute;
    z-index: 1000;
    list-style-type: none;
    margin: 0;
    padding: 5px 0;
    border-radius: 4px;
    background: #fff;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    font-weight: 400;
    font-size: 12px;
    color: #333;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
