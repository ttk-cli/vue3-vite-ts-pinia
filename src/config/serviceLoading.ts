import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'

let loadingInstance: ReturnType<typeof ElLoading.service>
let loadingCount = 0

export function loadingShow() {
  loadingCount += 1
  if (loadingCount > 1) return
  loadingInstance = ElLoading.service({
    text: 'Loading...',
  })
}

export function loadingClose() {
  loadingCount -= 1
  if (loadingCount > 0) return
  loadingInstance.close()
}
