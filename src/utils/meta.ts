export const meta = {
  dashboard: { title: ['控制台'], icon: 'el-icon-s-home' },
  test1: { title: ['test1'], icon: 'el-icon-s-order', hasChild: true },
  test1_1: { title: ['test1', 'test1_1'], icon: 'el-icon-s-order' },
  test2: { title: ['test2'], icon: 'el-icon-s-order' },
}

export type MetaType = keyof typeof meta
