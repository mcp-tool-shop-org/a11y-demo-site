<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  
            <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/a11y-demo-site/readme.png"
           alt="A11y Demo Site Logo" width="200" />
</p>

<p align="center">
    <em>Automated Accessibility Compliance & Provenance</em>
</p>

<p align="center">
    <a href="https://github.com/mcp-tool-shop-org/a11y-demo-site/actions/workflows/a11y-artifacts.yml">
        <img src="https://github.com/mcp-tool-shop-org/a11y-demo-site/actions/workflows/a11y-artifacts.yml/badge.svg" alt="CI">
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    </a>
    <a href="https://mcp-tool-shop-org.github.io/a11y-demo-site/">
        <img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page">
    </a>
</p>

---

这个仓库展示了一个**验证过的无障碍访问流水线**。它展示了如何使用 `a11y-evidence-engine` 来扫描问题，以及如何使用 `a11y-assist` 来收集、验证和报告这些问题。

**主要特性：**

*   **证据生成：** 扫描 HTML 代码，查找无障碍访问方面的违规行为。
*   **密码学证明：** 对证据包进行签名，以确保它们没有被篡改。
*   **自动化建议：** 将发现结果转换为面向修复的指导。
*   **CI/CD 集成：** 展示如何在回归时阻止构建（或在发现问题时发出警告）。

## 快速开始

### 先决条件

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### 本地运行

```bash
./scripts/a11y.sh
```

这将执行以下操作：
1.  扫描 `html/` 目录。
2.  在 `results/` 目录中生成发现结果。
3.  收集发现结果并验证其来源。
4.  将摘要输出到控制台。

## 项目结构

*   `html/`: 正在扫描的网页内容（包含故意引入的无障碍访问错误）。
*   `scripts/`: 用于运行流水线的自动化脚本。
*   `.github/workflows`: CI 配置。

## 许可证

MIT


---

## 在 GitHub Actions 中检查结果（工件）

此仓库的 CI 会将完整的 `results/` 目录作为 GitHub Actions 的工件上传到每次运行（即使由于 HTML 代码故意损坏而导致任务失败）。

### 如何下载工件

1.  转到 GitHub 上的 **Actions** 选项卡。
2.  单击最近的 workflow 运行：
- **"A11y (upload results)"**（推荐用于检查）
3.  滚动到运行页面的底部。
4.  在 **Artifacts** 下，下载：
- **`a11y-results`**

将其解压到本地。您将看到：

```
results/
├── findings.json
├── provenance/
│   └── finding-0001/
│       ├── record.json
│       ├── digest.json
│       └── envelope.json
└── a11y-assist/
    ├── ingest-summary.json
    └── advisories.json
```

### 首先打开以下文件（推荐顺序）

1.  **`results/a11y-assist/ingest-summary.json`**
快速概览，包括计数、最常见的规则和最常见的文件。

2.  **`results/a11y-assist/advisories.json`**
面向修复的任务列表。每个任务都包含 `instances[]`，其中包含 `evidence_ref` 链接。

3.  **`results/provenance/finding-*/digest.json`**
存储的 `integrity.digest.sha256` 记录。

4.  **`results/provenance/finding-*/record.json`**
证据记录 (`engine.extract.evidence.json_pointer`)，显示捕获的内容。

### "Provenance: VERIFIED" 的含义

当运行 `a11y-assist ingest --verify-provenance` 时，它会从规范化的证据中重新计算 SHA-256 摘要，并将其与存储的摘要进行比较。

如果它们匹配，CI 会打印：

```
Provenance: VERIFIED
```

这证明捕获的证据自扫描产生以来没有被篡改（**完整性**）。
但是，它本身并不能证明原始扫描环境是可信的。

---

## 演示中故意引入的错误

**html/index.html:**
- `<html>` 缺少 `lang` 属性
- `<img>` 缺少 `alt` 属性
- `<button>` 缺少可访问的名称
- `<a>`（空链接）缺少可访问的名称

**html/contact.html:**
- `<html lang="">`（空的 lang 属性）
- `<input>` 缺少关联的标签

---

## 修复演示（可选）

要使 CI 通过，请修复 HTML 代码：

```html
<!-- index.html -->
<html lang="en">
  ...
  <img src="hero.png" alt="Hero image">
  <button>Click me</button>
  <a href="/contact.html">Contact us</a>
```

```html
<!-- contact.html -->
<html lang="en">
  ...
  <label for="email">Email</label>
  <input type="email" id="email" />
```

---

## 相关仓库

| Repo | 描述 |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | 正式的来源规范 |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | 具有来源的无障碍扫描器 |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | 具有来源验证的修复建议器 |

---

## 许可证

MIT
