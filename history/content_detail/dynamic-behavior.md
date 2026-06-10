# 动态行为说明

> 定义数据变化时的动画反馈、用户操作的行为响应、以及响应式布局规则。
> 与 `ARTIST_DESIGN.md` 和 `state-visual-spec.md` 配合使用。
> 最后更新: 2026-06-05

---

## 一、动画总览

### 1.1 动画时间线

```
页面加载
 │
 ├── 0ms      DOM 渲染（静态 HTML）
 ├── 0ms      背景层渲染（.bg-layer / .bg-grid / .bg-grain）
 ├── ~50ms    Hero 区 fadeUp 动画开始（.hero 自带 animation）
 ├── ~100ms   滚动监听 IntersectionObserver 初始化
 ├── ~150ms   可见 Section 依次 fadeUp 入场
 │
 ├── 持续      背景光晕无限循环浮动（12-18s）
 └── 持续      状态指示器脉冲动画（2.2s 循环）
```

### 1.2 动画清单

| 动画名称 | 触发条件 | 目标元素 | 效果 | 时长 | 缓动函数 | 实现位置 |
|----------|----------|----------|------|------|----------|----------|
| Hero 淡入 | 页面首次渲染 | `.hero` | opacity 0→1 + translateY(18px)→0 | 0.55s | `cubic-bezier(.4,0,.2,1)` | `index.html` 行内 CSS |
| Section 滚动入场 | 元素进入视口 | `.a1`~`.a5` | fadeUp 动画（暂停→播放） | 0.55s | `cubic-bezier(.4,0,.2,1)` | `index.html` 行内 JS |
| 光晕浮动 (orb-1) | 页面加载后持续 | `.bg-layer::before` | translate + scale 循环 | 12s | ease-in-out | —— 待实现 |
| 光晕浮动 (orb-2) | 页面加载后持续 | `.bg-layer::after` | translate + scale 循环（偏移相位） | 15s | ease-in-out | —— 待实现 |
| 光晕浮动 (orb-3) | 页面加载后持续 | `.bg-wash-center` | translate + scale 循环 | 18s | ease-in-out | —— 待实现 |
| 状态脉冲 | 持续 | `.status-line .dot` | opacity + scale 脉冲 | 2.2s | ease-in-out | `design-system.css` |
| 鼠标跟随光晕 | 鼠标移动 | `.cursor-glow` | translate 跟随鼠标 | 即时 | transition 0.4s | `effects.css` + `effects.js` |
| 点击涟漪 | 点击卡片 | `.ripple` 临时元素 | scale(0)→scale(4) + opacity→0 | 0.6s | ease-out | `effects.css` + `effects.js` |
| 主题切换 (icon) | 点击 theme toggle | `.icon-sun` / `.icon-moon` | rotate + scale 交叉淡入淡出 | 0.4s | `cubic-bezier(.4,0,.2,1)` | `effects.css` |

---

## 二、操作反馈

### 2.1 滚动入场 (IntersectionObserver)

```
触发条件: Section 元素进入视口 (threshold: 6%)
─────────────────────────────────────────────
行为:
  1. 初始状态: opacity: 0, animationPlayState: paused
  2. 进入视口: animationPlayState → running, fadeUp 播放
  3. 播放完毕: opacity → 1, transform → translateY(0)
  4. 取消观察: unobserve()，避免重复触发
  
不回退: 元素离开视口后不会重新隐藏（单向动画）
降级: 不支持 IntersectionObserver 的浏览器，直接显示所有元素
```

### 2.2 主题切换

```
触发: 点击 .theme-toggle 按钮
─────────────────────────────────────────────
行为:
  1. 读取当前 data-theme 属性值
  2. 切换 html[data-theme] 属性: "light" ↔ "dark"
  3. 图标旋转 + scale 交叉动画（0.4s）
  4. 所有 CSS 变量通过属性选择器自动切换
  5. 偏好存入 localStorage: 'theme'
  6. 下次访问自动读取 localStorage 恢复

无动画回退: <noscript> 下默认跟随系统 prefers-color-scheme
```

### 2.3 点击涟漪

```
触发: 点击 .glass-card 区域 (mousedown / touchstart)
─────────────────────────────────────────────
行为:
  1. 在点击位置创建 <span class="ripple">
  2. 设置 left/top 为点击坐标（相对于卡片）
  3. 播放 ripple-expand 动画 (0.6s)
  4. 动画结束自动移除 DOM 元素

移动端: 使用 touchstart 替代 mousedown
```

### 2.4 鼠标跟随光晕

```
触发: 桌面端鼠标移动
─────────────────────────────────────────────
行为:
  1. 创建固定定位 .cursor-glow 元素
  2. mousemove: 实时更新 left/top → 鼠标坐标
  3. 鼠标离开窗口 → 添加 .hidden (opacity: 0)
  4. 鼠标进入 → 移除 .hidden

移动端: 不启用（无 hover 光标概念）
性能: will-change: left, top, opacity 启用 GPU 加速
```

### 2.5 链接点击反馈

```
触发: 点击 .connect-item 链接
─────────────────────────────────────────────
行为:
  1. Active 态: scale(0.97) 按压反馈
  2. 背景色从 --accent-bg 加深
  3. 外部链接 (target="_blank"): 浏览器默认跳转
  4. Email 链接 (mailto:): 打开默认邮件客户端
```

---

## 三、数据变化行为

### 3.1 当前数据更新策略

当前为**纯静态站点**，数据全部硬编码在 HTML 中，无运行时数据变化。

若后续引入动态数据（如 GitHub API 拉取项目列表、微博/博客 RSS），遵循以下行为规范：

### 3.2 数据加载流程

```
用户访问
  │
  ├── ① 渲染骨架屏（skeleton）
  │     所有 .glass-card 内容区显示骨架占位
  │     Hero 区例外：静态信息直接显示
  │
  ├── ② 异步请求数据（fetch / XHR）
  │     显示轻量 Spinner 在对应卡片内
  │
  ├── ③ 数据返回
  │     ├── 成功 → 骨架淡出 + 内容 fadeUp 入场（0.45s ease-out）
  │     └── 失败 → 替换为错误态（⚠️ + 重试按钮）
  │
  └── ④ 完成
        所有卡片内容就绪，去除 loading 标记
```

### 3.3 数据更新动画规范

| 操作 | 动画 | 时长 | 说明 |
|------|------|------|------|
| 列表项新增 | fadeUp + slideDown | 0.4s | 新项从上方滑入 |
| 列表项删除 | fadeOut + slideUp | 0.35s | 项淡出上移，后续项补位 |
| 数据刷新 | skeleton → fadeUp | 0.45s | 骨架屏淡出，内容淡入 |
| 标签变化 | crossfade | 0.3s | 旧标签 opacity→0，新标签 opacity→1 |
| 状态文案更新 | 脉冲闪烁 | 0.3s | dot 快速闪两次后恢复 |

### 3.4 状态文案动态更新

```
当前: 硬编码 "开放合作 · 正在尝试自由开发"
目标: 可从配置或 API 动态更新

动画方案:
  1. 旧文字 opacity→0 (0.25s)
  2. 更新 textContent
  3. 新文字 opacity→1 (0.25s)
  4. dot 快速脉冲 2 次标记"变化发生"
```

---

## 四、响应式规则

### 4.1 断点定义

| 断点名称 | 宽度 | 定位 |
|----------|------|------|
| **xs** | < 320px | 极小屏（旧手机、折叠屏内屏） |
| **sm** | 320px – 380px | 小屏手机（iPhone SE） |
| **md** | 381px – 767px | 标准手机（iPhone 12/13/14） |
| **lg** | 768px – 1023px | 平板竖屏 / 大屏手机横屏 |
| **xl** | ≥ 1024px | 桌面端 |
| **xxl** | ≥ 1440px | 大桌面端（额外留白） |

### 4.2 各断点布局变化

| 属性 | xs (< 320px) | sm (320-380px) | md (381-767px) | lg (768px+) |
|------|-------------|----------------|-----------------|-------------|
| `.wrapper` max-width | 560px | 560px | 560px | 560px |
| `.wrapper` padding-y | 20px / 40px | 30px / 64px | 30px / 64px | 60px / 96px |
| `.wrapper` padding-x | 10px | 16px | 16px | 32px |
| `.hero` padding | 28px 14px 22px | 34px 18px 30px | 44px 32px 38px | 56px 48px 48px |
| `.hero-avatar` | 64×64 (24px字) | 74×74 (28px字) | 90×90 (33px字) | 106×106 (38px字) |
| `.hero h1` | 21px | 24px | 29px | 34px |
| `.hero .tagline` | 12px | 13px | 15px | 15px |
| `.hero .subtitle` | 12px | 13px | 14px | 14px |
| `.section-inner` | 18px 14px | 22px 18px | 28px 26px | 34px 32px |
| `.connect-grid` | 1 列 | 2 列, gap: 8px | 2 列, gap: 10px | 2 列, gap: 10px |
| `.section` margin-bottom | 12px | 14px | 16px | 16px |

### 4.3 响应式行为细节

#### 连接网格 (Connect Grid)
```
< 320px:  单列布局
≥ 320px:  两列布局

变化: grid-template-columns 切换 1fr → 1fr 1fr
过渡: 无动画（grid 不支持 transition），直接切换
```

#### Hero 头像
```
连续缩放: 64px → 74px → 90px → 106px
无过渡动画（避免加载时闪烁）
```

#### 字体大小
```
所有文字使用 px 绝对单位（非 rem/em）
分别在对应媒体查询中重写
原因: 确保各断点下视觉效果精确可控
```

### 4.4 触摸与鼠标交互区分

| 交互 | 桌面端 | 移动端 |
|------|--------|--------|
| Card hover 阴影加深 | ✅ hover 伪类 | ❌ 不可用 |
| Card active 上浮 | ✅ mousedown | ✅ touchstart |
| 鼠标跟随光晕 | ✅ mousemove | ❌ 不创建该元素 |
| 点击涟漪 | ✅ mousedown | ✅ touchstart |
| 链接 hover 变色 | ✅ hover 伪类 | ❌ 不可用 |

### 4.5 暗色模式响应

```
触发方式（优先级从高到低）:
  1. html[data-theme] 手动切换 → 覆盖一切
  2. @media (prefers-color-scheme: dark) → 跟随系统

切换行为:
  CSS 变量全部通过属性选择器 / 媒体查询重定义
  无需 JS 实现（但手动切换按钮需要 JS 写入 data-theme）

已有实现:
  ✅ CSS 变量双轨 (media query + [data-theme])
  ✅ JS 手动切换按钮 (effects.js)
  ✅ localStorage 持久化
```

---

## 五、性能与可访问性

### 5.1 动画性能约束

| 规则 | 说明 |
|------|------|
| 仅动画 `transform` + `opacity` | 不触发 layout/paint，走合成线程 |
| 使用 `will-change` | 提前告知浏览器创建合成层（限定在动画元素上） |
| 避免 `max-height` 动画 | 用 `transform: scaleY` 或 JS 计算替代 |
| 限制并发动画数 | 折叠区展开时仅动画该区内容，不动其他元素 |

### 5.2 prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

影响范围：所有动画几乎消失，内容直接展示。

### 5.3 JS 降级策略

| 场景 | 降级行为 |
|------|----------|
| JS 加载失败 | `<noscript>` 提示简化模式，内容直接可见 |
| IntersectionObserver 不支持 | 所有 Section 直接显示（opacity: 1，无动画） |
| localStorage 不可用 | 主题切换不持久化，每次跟随系统 |
| requestAnimationFrame 不可用 | 鼠标光晕改用 throttle(setInterval, 50ms) |

---

## 六、待实现动画清单

以下动画在 `ARTIST_DESIGN.md` 中规划但尚未在代码中实现：

| 动画 | 当前状态 | 实现建议 |
|------|----------|----------|
| 背景光晕浮动 (3个 orb) | ❌ 未实现 | CSS `@keyframes float` + `animation-delay` 偏移相位 |
| Hero SVG 波浪曲线 | ❌ 未实现 | 内联 `<svg>` 在 Hero 底部，颜色用 `--ice` |
| 姓名波浪下划线 | ❌ 未实现 | `background-image: url("data:image/svg+xml,...")` 重复 |
| 折叠区展开/收起 | ❌ 未实现（当前无折叠区） | 后续若添加折叠区，参考 `ARTIST_DESIGN.md` 第五节 |
| 卡片 hover 光点 | ❌ 未实现 | `::before` 伪元素 + radial-gradient 小光点，hover 时从卡片边角滑入 |

---

## 七、快速查阅

| 想看什么？ | 章节 |
|------------|------|
| 页面加载时发生了什么动画 | § 一、动画时间线 |
| 某个操作触发什么反馈 | § 二、操作反馈 |
| 数据异步加载怎么展示 | § 三、数据变化行为 |
| 各屏幕宽度怎么适配 | § 四、响应式规则 |
| 动画性能怎么保证 | § 五、性能约束 |
| 还有什么动画没做 | § 六、待实现清单 |
