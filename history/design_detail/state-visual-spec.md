# 状态视觉规范补充

> 在已定义的色彩系统（Nordic Azure）基础上，补充**状态态**的视觉规范：
> 空态、加载态、错误态、交互态（hover / active / focus / disabled）、边界态。
> 与 `ARTIST_DESIGN.md` 的配色体系保持一致。
> 最后更新: 2026-06-05

---

## 一、状态色映射（基于 Nordic Azure 扩展）

原色板参考 `index.html` 和 `css/design-system.css`，状态色在现有 Token 基础上推导：

| 状态 | 主色 | 背景色 | 边框色 | 文字色 |
|------|------|--------|--------|--------|
| **默认 (Default)** | `--sky` (#4ca5d7) | `--accent-bg` (rgba 9%) | `--glass-border` (rgba 13%) | `--text` (#261e5c) / `#e6f2f8`(暗) |
| **悬停 (Hover)** | `--accent-deep` (#3494c0) | `--accent-bg-deep` (rgba 15%) | `--glass-border-focus` (rgba 28%) | 保持 |
| **按下 (Active)** | 加深 10% | 加深到 22% | 加深到 35% | 保持 |
| **聚焦 (Focus)** | `--sky` + glow | 保持 | `--sky` 2px solid | 保持 |
| **禁用 (Disabled)** | N/A | 无 | rgba 5% | `--text-tertiary` 50% opacity |
| **空态 (Empty)** | `--text-tertiary` (#6e8a9e) | `--accent-bg` (#4ca5d7 9%) | `--glass-border` | `--text-tertiary` |
| **加载 (Loading)** | `--sky` (动画) | 保持 | 保持 | `--text-secondary` |
| **成功 (Success)** | `#4caf7d` | `rgba(76,175,125,0.09)` | `rgba(76,175,125,0.14)` | `#2e7d4a` |
| **警告 (Warning)** | `#e6a23c` | `rgba(230,162,60,0.09)` | `rgba(230,162,60,0.18)` | `#8a6310` |
| **错误 (Error)** | `#e05555` | `rgba(224,85,85,0.09)` | `rgba(224,85,85,0.18)` | `#b91c1c` |
| **信息 (Info)** | `--sky` (#4ca5d7) | `--accent-bg` | `rgba(76,165,215,0.18)` | `--accent-deep` (#3494c0) |

> 暗色模式下所有背景透明度 × 1.6，边框透明度 × 1.5，确保在深色背景上可见。

---

## 二、空态 (Empty State)

### 2.1 空态定义

适用于：内容列表为空、搜索结果为空、无数据展示的场景。

### 2.2 视觉规范

```
┌──────────────────────────────────────────────┐
│                glass-card                    │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │           (icon/emoji, 48px)           │  │
│  │                                        │  │
│  │          描述文本（14px）               │  │
│  │          color: --text-tertiary        │  │
│  │                                        │  │
│  │     [ 行动按钮 ]  （可选）              │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

| 元素 | 规格 |
|------|------|
| 容器 | `.glass-card` 默认规格，内边距 48px |
| 图标 | 48×48px / emoji 36px，居中，margin-bottom: 16px |
| 标题 | 14px, `--text-secondary`, weight 500, margin-bottom: 6px |
| 描述 | 13px, `--text-tertiary`, line-height 1.7 |
| 行动按钮 | 12px pill 按钮, `--sky` 背景, 白色文字, radius 99px |
| 空列表分割线 | 若为列表，保留卡片结构但无 `.info-row`，换成空态占位 |

### 2.3 预设文案

| 场景 | 图标 | 标题 | 描述 |
|------|------|------|------|
| 项目列表为空 | 📂 | 暂无项目 | 项目内容正在整理中，稍后回来看看 |
| 搜索无结果 | 🔍 | 没有找到匹配结果 | 试试调整搜索关键词 |
| 技能标签为空 | 🏷️ | 暂无标签 | — |
| 联系方式为空 | 🔗 | 暂无联系方式 | — |

### 2.4 CSS 变量

```css
--empty-icon-size:    48px;
--empty-title-size:   14px;
--empty-desc-size:    13px;
--empty-spacing:      16px;
```

---

## 三、加载态 (Loading State)

### 3.1 加载态定义

适用于：页面首次加载（Hero 淡入）、内容区域异步加载、数据请求中。

### 3.2 骨架屏 (Skeleton) 规范

```css
/* 骨架屏基础 */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--accent-bg)       0%,
    var(--accent-bg-deep)  40%,
    var(--accent-bg)       80%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
  border-radius: 6px;
}

@keyframes skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 3.3 骨架屏映射

| 组件 | 骨架形状 | 尺寸 |
|------|----------|------|
| Avatar | 圆形 | 90×90px, border-radius: 50% |
| 标题 (Name) | 短矩形 | 220px × 30px |
| Tagline | 短矩形 | 180px × 20px |
| Subtitle 行1 | 长矩形 | 340px × 16px |
| Subtitle 行2 | 中矩形 | 260px × 16px |
| InfoRow 单行 | 中矩形 | 280px × 18px |
| Tag 标签 | 短圆角 | 80px × 28px, radius: 99px |
| ConnectItem | 中矩形 | 260px × 54px, radius: 14px |

### 3.4 轻量加载指示器 (Spinner)

```
┌──────────────────────────────┐
│                              │
│        ◌  (旋转动画)          │
│     loading text...          │
│                              │
└──────────────────────────────┘
```

| 元素 | 规格 |
|------|------|
| Spinner 尺寸 | 24×24px |
| Spinner 颜色 | `--sky` |
| Spinner 粗细 | 2.5px border, 顶部透明 |
| 动画 | 0.8s linear infinite rotate |
| 文字 | 13px, `--text-tertiary`, margin-top: 12px |

### 3.5 已有加载行为

| 场景 | 当前实现 | 规范 |
|------|----------|------|
| 页面首次渲染 | Hero `fadeUp` 0.55s | ✅ 已实现 |
| Section 滚动入场 | IntersectionObserver → `fadeUp` 0.55s | ✅ 已实现 |
| CSS 加载失败 | 无 | ⚠️ 待补充：回退到系统字体 + 纯色背景 |
| JS 加载失败 | 无 | ⚠️ 待补充：降级无动画，内容直接展示 |

---

## 四、错误态 (Error State)

### 4.1 错误态定义

适用于：资源加载失败、网络错误、数据获取异常。

### 4.2 视觉规范

```
┌──────────────────────────────────────────────┐
│                glass-card                    │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │           ⚠️ (emoji, 36px)             │  │
│  │                                        │  │
│  │         出错了（14px, --text-secondary）│  │
│  │    描述文字（13px, --text-tertiary）     │  │
│  │                                        │  │
│  │      [ 重试 ]  pill 按钮               │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### 4.3 错误场景与文案

| 场景 | 图标 | 标题 | 描述 | 行动 |
|------|------|------|------|------|
| 页面资源加载失败 | ⚠️ | 页面加载异常 | 请检查网络连接后刷新重试 | [刷新页面] |
| 外部链接不可用 | 🔗 | 链接无法访问 | 该平台暂时无法连接，请稍后再试 | — |
| CSS 文件 404 | 无图标 | — | 降级：纯色背景 + 系统字体，功能不受影响 | — |
| JS 文件 404 | 无图标 | — | 降级：无动画效果，内容直接展示 | — |
| 图片加载失败 | 🖼️ | 图片加载失败 | 占位：显示 alt 文字 + 浅蓝背景 | — |

### 4.4 全局错误边界 (Error Boundary)

```html
<!-- 降级加载方案 -->
<noscript>
  <div style="padding:40px;text-align:center;color:var(--navy)">
    <p>JavaScript 未启用或加载失败，页面将以简化模式显示。</p>
  </div>
</noscript>
```

---

## 五、交互态 (Interactive States)

### 5.1 卡片交互态

| 状态 | 属性变化 | 时长 | 缓动 |
|------|----------|------|------|
| **默认** | `box-shadow: --shadow-sm` | — | — |
| **Hover (desktop)** | `box-shadow: --shadow-md` | 0.35s | `var(--ease)` |
| **Active (mobile/click)** | `transform: translateY(-1px)`, `box-shadow: --shadow-lg` | 即时 | — |

### 5.2 连接项 (ConnectItem) 交互态

| 状态 | 视觉变化 |
|------|----------|
| **默认** | 淡蓝磨砂背景 + 1px 淡边框 |
| **Hover** | 背景加深到 `--accent-bg`，边框变 `--glass-border-focus` |
| **Active** | `scale(0.97)` 缩按反馈，背景进一步加深 |

### 5.3 标签 (Tag) 交互态

| 状态 | 视觉变化 |
|------|----------|
| **默认** | `--accent-bg` 背景 + `--accent-deep` 文字 |
| **Hover** | 背景 `--accent-bg-deep`，边框颜色微亮 |
| **Active** | 无需特殊反馈（纯展示标签） |

### 5.4 链接 / 按钮交互态

| 状态 | 视觉变化 |
|------|----------|
| **默认** | 无下划线，`color: inherit` |
| **Hover** | 文字变为 `--accent-deep` |
| **Focus-visible** | 2px `--sky` outline，outline-offset: 2px |
| **Disabled** | 50% opacity，cursor: not-allowed，无交互 |

### 5.5 Focus 可见性 (Accessibility)

```css
:focus-visible {
  outline: 2px solid var(--sky);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## 六、边界态 (Edge Cases)

### 6.1 文字溢出

| 场景 | 处理方式 |
|------|----------|
| 标题过长 (>40字) | 按当前设计，标题固定为人工维护的短文案，不处理溢出 |
| 正文过长 | `line-height: 1.6~1.85` 自然换行 |
| 标签过多 (>8个) | flex-wrap 自然换行，gap: 8px |
| 单标签文字过长 | 不截断（标签为人工维护），必要时用 `max-width: 200px; truncate` |
| 连接项 URL 过长 | `.url` class 字号 11px + 自然换行 |

### 6.2 超小屏幕 (< 320px)

| 元素 | 调整 |
|------|------|
| `.wrapper` | padding 缩减到 10px |
| `.hero-avatar` | 64×64px, font-size: 24px |
| `.hero h1` | font-size: 21px |
| `.section-inner` | padding: 18px 14px |
| `.connect-grid` | 1 列（grid-template-columns: 1fr） |

### 6.3 超大屏幕 (> 1440px)

| 元素 | 调整 |
|------|------|
| `.wrapper` | max-width 保持 560px，居中留白 |
| 背景光晕 | 使用 vw/vh 相对单位自动缩放 |

### 6.4 暗色模式边界

| 场景 | 处理 |
|------|------|
| 光晕装饰 | 降低透明度，从 0.18 → 0.10 |
| Glassmorphism 高光 | `::after` 渐变透明度从 22% → 5% |
| 阴影 | 更换为纯黑底阴影，加深扩散 |
| Emoji 渲染 | 不做处理（系统和浏览器自行渲染） |

### 6.5 打印样式

```css
@media print {
  .bg-layer, .bg-wash-center, .bg-grid, .bg-grain { display: none; }
  .glass-card {
    background: white;
    box-shadow: none;
    border: 1px solid #ddd;
  }
  body { background: white; color: black; }
}
```

### 6.6 prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .status-line .dot { animation: none; }
  .bg-layer::before, .bg-layer::after { animation: none; }
}
```

---

## 七、状态快速查阅

| 需要什么状态？ | 看哪一节 |
|----------------|----------|
| 页面元素为空怎么展示 | § 二、空态 |
| 数据加载中骨架屏/Spinner | § 三、加载态 |
| 网络错误/资源失败怎么展示 | § 四、错误态 |
| 按钮/卡片 hover 效果 | § 五、交互态 |
| 文字太长怎么办 | § 六、边界态：文字溢出 |
| 极窄屏幕适配 | § 六、边界态：超小屏幕 |
| 无障碍动效关闭 | § 六、边界态：prefers-reduced-motion |
