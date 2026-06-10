# 页面组件树 & 数据映射表

> 记录 index.html 的完整 DOM 组件层级，以及每个组件的数据来源、格式和渲染方式。
> 最后更新: 2026-06-05

---

## 一、页面组件树

```
index.html
│
├── Background Layer（背景层）
│   ├── .bg-layer            ← 双层模糊光晕（固定背景装饰）
│   ├── .bg-wash-center      ← 中央柔光 wash
│   ├── .bg-grid             ← 网格纹理
│   └── .bg-grain            ← 噪点纹理
│
├── Scroll-trigger enter animations  ← IntersectionObserver（JS）
│
└── .wrapper                  ← 内容容器（max-width: 560px, 居中）
    │
    ├── [Section] Hero        ← .glass-card.hero
    │   ├── Avatar            ← .hero-avatar > "HR"（渐变字母头像）
    │   ├── Name              ← <h1>
    │   ├── Tagline           ← .tagline > <p>
    │   ├── Subtitle          ← .subtitle > <p>（含 <strong> 加粗关键词）
    │   └── StatusLine        ← .status-line > .dot + 文字（脉冲指示灯）
    │
    ├── [Section] Identity    ← .glass-card.section.a1
    │   ├── SectionHeader     ← .sec-header > .icon + h2
    │   ├── SecDivider        ← .sec-divider
    │   └── InfoRow × 3       ← .info-row（icon + label + value）
    │
    ├── [Section] Bio         ← .glass-card.section.a2
    │   ├── SectionHeader     ← .sec-header
    │   ├── SecDivider        ← .sec-divider
    │   └── BioBlock          ← .bio-block > p × 2
    │
    ├── [Section] Tags        ← .glass-card.section.a3
    │   ├── SectionHeader     ← .sec-header
    │   ├── SecDivider        ← .sec-divider
    │   └── TagsRow           ← .tags-row > .tag × 5
    │
    ├── [Section] Connect     ← .glass-card.section.a4
    │   ├── SectionHeader     ← .sec-header
    │   ├── SecDivider        ← .sec-divider
    │   └── ConnectGrid       ← .connect-grid > .connect-item × 2
    │
    └── Footer               ← .footer.a5（纯文本）
```

---

## 二、数据映射表

### 2.1 Hero 区

| 数据字段 | DOM 位置 | 数据格式 | 来源 | 渲染方式 | 可配置 |
|----------|----------|----------|------|----------|--------|
| 头像文字 | `.hero-avatar` | `string` (2字母) | HTML 硬编码 `"HR"` | 纯文本 + 渐变背景 | ✅ 改名后需手动改 |
| 姓名 | `.hero h1` | `string` | HTML 硬编码 `"HaiRong Chen"` | 纯文本 | ✅ |
| 一句话定位 | `.hero .tagline` | `string` | HTML 硬编码 | 纯文本 | ✅ |
| 副标题 | `.hero .subtitle` | `string` (内嵌 `<strong>`) | HTML 硬编码 | 纯文本 + 加粗关键词 | ✅ |
| 状态文案 | `.status-line` 内文本 | `string` | HTML 硬编码 `"开放合作 · 正在尝试自由开发"` | 纯文本 + 圆点动画 | ✅ |
| 圆点动画 | `.status-line .dot` | `CSS animation` | `design-system.css` → `@keyframes pulse-status` | CSS 脉冲动画 | ❌ 全局样式 |

### 2.2 基本信息 (Identity)

| 数据字段 | DOM 位置 | 数据格式 | 来源 | 是否动态 |
|----------|----------|----------|------|----------|
| 区块标题 | `.sec-header h2` | `string` | HTML 硬编码 `"基本信息"` | ❌ 静态 |
| 所在地 | `.info-row:nth(1) .info-value` | `string` | HTML 硬编码 `"深圳"` | ❌ 静态 |
| 教育背景 | `.info-row:nth(2) .info-value` | `string` | HTML 硬编码 | ❌ 静态 |
| 当前状态 | `.info-row:nth(3) .info-value` | `string` | HTML 硬编码 | ❌ 静态 |

### 2.3 一句话介绍 (Bio)

| 数据字段 | DOM 位置 | 数据格式 | 来源 |
|----------|----------|----------|------|
| 段落 1 | `.bio-block p:nth(1)` | `string` | HTML 硬编码 |
| 段落 2 | `.bio-block p:nth(2)` | `string` | HTML 硬编码 |

### 2.4 技能标签 (Tags)

| 数据字段 | DOM 位置 | 数据格式 | 来源 |
|----------|----------|----------|------|
| 标签列表 | `.tag` × 5 | `string[]` (5个标签) | HTML 硬编码，每个 `.tag` 一个条目 |

当前标签值:
1. `企业级后端开发`
2. `分布式系统设计`
3. `量化交易`
4. `AI 应用探索`
5. `系统化思维`

### 2.5 联系方式 (Connect)

| 数据字段 | DOM 位置 | 数据格式 | 来源 |
|----------|----------|----------|------|
| GitHub 链接 | `.connect-item:nth(1) @href` | `url` | HTML 硬编码 `https://github.com/Roke111` |
| GitHub 文案 | `.connect-item:nth(1) .url` | `string` | HTML 硬编码 `@Roke111` |
| Email 链接 | `.connect-item:nth(2) @href` | `url` | HTML 硬编码 `mailto:412994248@qq.com` |
| Email 文案 | `.connect-item:nth(2) .url` | `string` | HTML 硬编码 `412994248@qq.com` |

---

## 三、可复用组件模式

以下组件在页面中多次出现，提取为模式便于后续扩展：

### 3.1 `SectionHeader` 模式

```
<div class="sec-header">
  <div class="icon">{emoji}</div>
  <h2>{标题}</h2>
</div>
<div class="sec-divider"></div>
```

参数：
| 参数 | 类型 | 示例 |
|------|------|------|
| emoji | string | `🪪`, `💡`, `🏷️`, `🔗` |
| 标题 | string | `基本信息`, `一句话介绍`, `技能标签`, `联系方式` |

### 3.2 `GlassCard` 模式

```
<div class="glass-card section">
  <div class="section-inner">
    <!-- 内容 -->
  </div>
</div>
```

CSS 变量控制：`--glass-bg`, `--glass-border`, `--shadow-md`, `--radius-lg`

### 3.3 `InfoRow` 模式

```
<div class="info-row">
  <div class="info-icon">{emoji}</div>
  <div>
    <div class="info-label">{标签}</div>
    <div class="info-value">{值}</div>
  </div>
</div>
```

参数：emoji, label, value

### 3.4 `ConnectItem` 模式

```
<a class="connect-item" href="{url}">
  <span class="ci">{emoji}</span>
  <div>
    <div class="lbl">{平台名}</div>
    <div class="url">{账号}</div>
  </div>
</a>
```

参数：url, emoji, 平台名, 账号

---

## 四、数据流向总结

```
当前阶段: 全静态站点（无后端、无CMS）
数据来源: HTML 内联硬编码
渲染方式: 服务端直出 HTML（GitHub Pages 静态托管）

未来升级路径:
  标签列表    → 可改为 JS 数组渲染（方便增删，无需改 HTML）
  联系方式    → 可改为 JSON 配置文件统一管理
  项目列表    → 若后续添加 project page，建议从 JSON 加载
  状态文案    → 可从外部数据源（GitHub API）实时拉取
```
