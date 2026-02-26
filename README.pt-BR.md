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

Este repositório demonstra um **pipeline de acessibilidade verificado**. Ele mostra como usar `a11y-evidence-engine` para identificar problemas e `a11y-assist` para coletar, verificar e gerar relatórios sobre eles.

**Principais Características:**

*   **Geração de Evidências**: Analisa o código HTML em busca de violações de acessibilidade.
*   **Rastreabilidade Criptográfica**: Assina os pacotes de evidências para garantir que não foram alterados.
*   **Alertas Automatizados**: Converte as descobertas em orientações práticas para correção.
*   **Integração com CI/CD**: Demonstra como bloquear compilações em caso de regressões (ou gerar alertas sobre as descobertas).

## Início Rápido

### Pré-requisitos

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### Execução Local

```bash
./scripts/a11y.sh
```

Isso fará o seguinte:
1.  Analisará o diretório `html/`.
2.  Gerará os resultados em `results/`.
3.  Coletará os resultados e verificará a rastreabilidade.
4.  Exibirá um resumo no console.

## Estrutura do Projeto

*   `html/`: O conteúdo da web que está sendo analisado (contém erros de acessibilidade intencionais).
*   `scripts/`: Scripts de automação para executar o pipeline.
*   `.github/workflows`: Configurações de CI.

## Licença

MIT


---

## Analisando os resultados no GitHub Actions (artefatos)

Este repositório envia o diretório completo `results/` como um artefato do GitHub Actions em cada execução (mesmo quando a tarefa falha porque o HTML está intencionalmente corrompido).

### Onde baixar o artefato

1.  Vá para a aba **Actions** no GitHub.
2.  Clique na execução mais recente do fluxo de trabalho:
*   **"A11y (upload results)"** (recomendado para análise)
3.  Role para a parte inferior da página de execução.
4.  Em **Artifacts**, baixe:
*   **`a11y-results`**

Descompacte-o localmente. Você verá:

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

### O que abrir primeiro (ordem recomendada)

1.  **`results/a11y-assist/ingest-summary.json`**
Visão geral rápida de contagens, regras mais comuns e arquivos mais problemáticos.

2.  **`results/a11y-assist/advisories.json`**
A lista de tarefas orientada à correção. Cada "advisory" inclui `instances[]` com links para as evidências.

3.  **`results/provenance/finding-*/digest.json`**
O registro de integridade (`integrity.digest.sha256`) armazenado.

4.  **`results/provenance/finding-*/record.json`**
O registro de evidência (`engine.extract.evidence.json_pointer`) mostrando o que foi capturado.

### O que significa "Provenance: VERIFIED"

Quando `a11y-assist ingest --verify-provenance` é executado, ele recalcula o digest SHA-256 a partir das evidências e compara com o digest armazenado.

Se eles corresponderem, o CI imprime:

```
Provenance: VERIFIED
```

Isso prova que as evidências coletadas não foram alteradas desde que foram produzidas pela análise (integridade).
No entanto, por si só, não prova que o ambiente de análise original era confiável.

---

## Os erros intencionais (para fins de demonstração)

**html/index.html:**
*   `<html>` sem o atributo `lang`
*   `<img>` sem o atributo `alt`
*   `<button>` sem um nome acessível
*   `<a>` (link vazio) sem um nome acessível

**html/contact.html:**
*   `<html lang="">` (lang vazio)
*   `<input>` sem o rótulo associado

---

## Corrigindo a demonstração (opcional)

Para que o CI seja aprovado, corrija o código HTML:

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

## Repositórios relacionados

| Repo | Descrição |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | Especificação formal de rastreabilidade |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | Scanner de acessibilidade com rastreabilidade |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | Consultor de correção com verificação de rastreabilidade |

---

## Licença

MIT
