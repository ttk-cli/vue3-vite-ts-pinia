1. eslint 自动导入 @types 中声明的 namespace

   - 问题：需要手动在 .eslintrc.js 中声明全局类型
   - 思路：按目录自动导入（可配置）
   - 命名：.eslintrc-auto-import-types.json（暂定）

2. pinia ts 优化
   - 问题：目前重复性代码太多，需要优化
   - 路径：src\store\index.ts
   - 思路：infer ?
