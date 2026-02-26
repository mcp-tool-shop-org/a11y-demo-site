<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/a11y-demo-site/readme.png" alt="A11y Demo Site Logo" width="200" />
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

このリポジトリは、**検証済みのアクセシビリティパイプライン**のデモンストレーションです。 `a11y-evidence-engine`を使用して問題点を検出し、`a11y-assist`を使用して、それらの問題を収集、検証し、レポートを作成する方法を示しています。

**主な機能:**

*   **エビデンス生成**: HTMLをスキャンして、アクセシビリティに関する問題を検出します。
*   **暗号学的トレーサビリティ**: エビデンスバンドルに署名することで、改ざんされていないことを保証します。
*   **自動アドバイザリ**: 検出結果を、修正に役立つガイダンスに変換します。
*   **CI/CD統合**: ビルドをリグレッション（または検出された問題）でブロックする方法（または警告する方法）を示します。

## クイックスタート

### 前提条件

*   Node.js 20以上
*   Python 3.10以上
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### ローカルでの実行

```bash
./scripts/a11y.sh
```

これにより、以下の処理が行われます。
1.  `html/`ディレクトリをスキャンします。
2.  `results/`ディレクトリに検出結果を生成します。
3.  検出結果を収集し、トレーサビリティを検証します。
4.  コンソールに概要を出力します。

## プロジェクトの構成

*   `html/`: スキャン対象のWebコンテンツ（意図的にアクセシビリティの問題を含む）。
*   `scripts/`: パイプラインを実行するための自動化スクリプト。
*   `.github/workflows`: CIの設定ファイル。

## ライセンス

MIT


---

## GitHub Actions（成果物）での結果の確認

このリポジトリのCIは、`results/`ディレクトリ全体を、GitHub Actionsの成果物として、実行ごとにアップロードします（HTMLが意図的に破損している場合でも、ジョブが失敗した場合でも）。

### 成果物をダウンロードする場所

1.  GitHubで**Actions**タブに移動します。
2.  最新のワークフロー実行をクリックします。
-   **"A11y (upload results)"**（確認用として推奨）
3.  実行ページの最下部までスクロールします。
4.  **Artifacts**の下で、以下のファイルをダウンロードします。
-   **`a11y-results`**

ローカルで解凍します。 以下のファイルが表示されます。

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

### 最初に開くファイル（推奨順序）

1.  **`results/a11y-assist/ingest-summary.json`**
件数、上位ルール、上位ファイルなどの概要。

2.  **`results/a11y-assist/advisories.json`**
修正に役立つタスクリスト。 各アドバイザリには、`instances[]`があり、`evidence_ref`へのリンクが含まれています。

3.  **`results/provenance/finding-*/digest.json`**
保存された`integrity.digest.sha256`レコード。

4.  **`results/provenance/finding-*/record.json`**
エビデンスレコード（`engine.extract.evidence.json_pointer`）で、何が収集されたかを示します。

### "Provenance: VERIFIED"の意味

`a11y-assist ingest --verify-provenance`を実行すると、正規化されたエビデンスからSHA-256ダイジェストを再計算し、保存されたダイジェストと比較します。

一致する場合、CIは以下を出力します。

```
Provenance: VERIFIED
```

これにより、スキャンによって生成されたエビデンスが、その後の改ざんされていないことが証明されます（**完全性**）。
ただし、これだけでは、元のスキャン環境が信頼できることが証明されるわけではありません。

---

## デモ用の意図的なバグ

**html/index.html:**
-   `<html>`要素に`lang`属性がありません。
-   `<img>`要素に`alt`属性がありません。
-   `<button>`要素にアクセシブルな名前がありません。
-   `<a>`要素（空のリンク）にアクセシブルな名前がありません。

**html/contact.html:**
-   `<html lang="">`（空のlang属性）
-   `<input>`要素に関連付けられたラベルがありません。

---

## デモの修正（オプション）

CIを成功させるには、HTMLを修正します。

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

## 関連リポジトリ

| Repo | 説明 |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | 正式なトレーサビリティ仕様 |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | トレーサビリティ機能を持つアクセシビリティスキャナ |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | トレーサビリティ検証機能を持つ修正アドバイザ |

---

## ライセンス

MIT
