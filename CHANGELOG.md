# Changelog

所有对 zuocuo 项目的显著改动都将记录在此文件。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### Added
- 首页轮播图新增 **轮盘（Wheel）交互类型**，支持类似 minimaxi.com 的弧形轮盘焦点图效果。
  - 鼠标滚轮旋转轮盘
  - 触摸/鼠标拖拽旋转（移动端+桌面端）
  - 中心卡片最大、最清晰，且可点击跳转
  - 两侧卡片自动缩小、变透明、倾斜
- 后台管理轮播图表单新增 **交互方式** 选择（标准 / 轮盘）。
- 轮盘类型支持配置 **多张独立图片**，每张图片拥有独立的链接。
- `banners` 表新增 `type`（标准/轮盘）和 `items`（JSON 轮盘数据）字段。
- API 全面支持 `type` 与 `items` 字段的读写。

### Changed
- 管理后台轮播图列表增加类型标识（`| 轮盘`）。
- 优化编辑轮播图时的数据加载方式，改用内存缓存避免 base64 图片嵌入 HTML 属性。
- **重构轮盘轮播效果**：
  - 固定显示 5 个槽位（左2 / 中1 / 右2），无论实际图片数量多少（最少2张即可循环展示）。
  - 布局改为以底部圆心向外放射的弧形排列：`transform-origin: bottom center`，中间卡片最高最大，两侧逐级降低并向外倾斜（`rotate`），超出轮盘区域的卡片被截断。
  - 移除轮盘独立的左右箭头与分页点，避免与全局 Swiper 焦点图冲突，仅保留全局焦点图的切换与指示器。
  - 支持点击两侧非中心卡片，自动将其切换至中央。
  - 中央卡片添加白色边框高亮与 hover 反馈，整体视觉更贴近 MiniMax 参考效果。
  - 底部增加弧形装饰线增强轮盘感。
  - 每个轮盘卡片下方支持独立操作按钮，后台可为每张卡片配置 `btn_text` 与 `btn_link`。

### Removed
- 清理本地根目录下的无用文件（备份文件、其他项目的 `package.json`、重复 `index.html` 等）。
- 删除 `zuolog/` 子项目目录（旧的独立应用代码）。

---

## [0.1.0] - 2026-04-18

### Added
- 项目初始化：Cloudflare Pages + D1 + Pages Functions 架构。
- 首页标准轮播图（Swiper.js）与九宫格展示。
- 管理后台：登录认证（JWT）、轮播图 CRUD、九宫格 CRUD。
- 图片上传支持点击选择、拖拽、Ctrl+V 粘贴，客户端压缩后 base64 存储。
- D1 数据库表结构：`admins`、`banners`、`grids`。

---
