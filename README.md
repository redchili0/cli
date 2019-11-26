# @redclili/cli
前端开发常用命令行工具，包含生成区块代码，生成依赖性组件代码等功能。

## 安装

```bash
yarn global add @redchili/cli
```

## 使用

```bash
chili
```
## 开发中功能

- 生成 icon 组件
  - icon 组件依赖项目内的 icon图片(自定义)，大多数项目无法直接使用开源的整体 iconfont 包，故使用命令行工具在项目内读取 icon 图片，生成 type.ts 配置文件，index.scss 样式文件。
    ```bash
    chili icon ./src/package/icons/img
    ```
- 从 github 复制特定代码到本地目录
  - block 需要固定的目录规范，且保存在github 等可以访问的仓库，目录树如下：
    ```bash
    .
    ├── node_modules
    ├── package.json
    ├── templates
    │   ├── edit-table
    ```
此命令最终会复制 templates/[block]/src 下的所有文件。

- blocks 使用说明
  - 配置 github repo, 使用 `chili config` 即可。
  - 更新 github repo, 使用 `chili block -u` 即可。

## 优化清单
- [ ] icon 代码模板将 enum 改为 type【⭑⭑⭑】
- [ ] icon 支持 sprite , web 模板代码【⭑】

## 计划中功能
- [ ] 支持配置文件，固定路径，根据图片大小进行筛选【⭑⭑】

## 参与

## 贡献
