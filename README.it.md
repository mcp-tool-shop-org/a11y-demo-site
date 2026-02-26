<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="assets/logo.png" alt="A11y Demo Site Logo" width="200" />
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

Questo repository dimostra una **pipeline di accessibilità verificata**. Mostra come utilizzare `a11y-evidence-engine` per rilevare problemi e `a11y-assist` per acquisire, verificare e segnalare tali problemi.

**Caratteristiche principali:**

*   **Generazione di prove:** Scansiona l'HTML alla ricerca di violazioni dell'accessibilità.
*   **Provenienza crittografica:** Firma i pacchetti di prove per garantire che non siano stati alterati.
*   **Avvisi automatizzati:** Converte i risultati in suggerimenti orientati alla correzione.
*   **Integrazione CI/CD:** Dimostra come bloccare le build in caso di regressioni (o avvisare in caso di rilevamenti).

## Guida rapida

### Prerequisiti

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### Esecuzione locale

```bash
./scripts/a11y.sh
```

Questo comando:
1.  Scansiona la directory `html/`.
2.  Genera i risultati in `results/`.
3.  Acquisisce i risultati e ne verifica la provenienza.
4.  Visualizza un riepilogo nella console.

## Struttura del progetto

*   `html/`: Il contenuto web da scansionare (contiene errori di accessibilità intenzionali).
*   `scripts/`: Script di automazione per l'esecuzione della pipeline.
*   `.github/workflows`: Configurazioni CI.

## Licenza

MIT


---

## Esame dei risultati in GitHub Actions (artefatti)

La CI di questo repository carica l'intera directory `results/` come artefatto di GitHub Actions ad ogni esecuzione (anche quando il processo fallisce perché l'HTML è intenzionalmente corrotto).

### Dove scaricare l'artefatto

1.  Vai alla scheda **Actions** in GitHub.
2.  Clicca sull'esecuzione del workflow più recente:
- **"A11y (upload results)"** (consigliato per l'esame)
3.  Scorri fino alla fine della pagina dell'esecuzione.
4.  Sotto **Artifacts**, scarica:
- **`a11y-results`**

Decomprimi il file localmente. Vedrai:

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

### Cosa aprire per prima (ordine consigliato)

1.  **`results/a11y-assist/ingest-summary.json`**
Panoramica rapida dei conteggi, delle regole principali e dei file principali.

2.  **`results/a11y-assist/advisories.json`**
L'elenco di attività orientato alla correzione. Ogni "advisory" include `instances[]` con collegamenti a `evidence_ref`.

3.  **`results/provenance/finding-*/digest.json`**
Il record memorizzato di `integrity.digest.sha256`.

4.  **`results/provenance/finding-*/record.json`**
Il record delle prove (`engine.extract.evidence.json_pointer`) che mostra ciò che è stato acquisito.

### Cosa significa "Provenienza: VERIFICATA"

Quando viene eseguito `a11y-assist ingest --verify-provenance`, viene ricalcolato l'hash SHA-256 dalle prove normalizzate e confrontato con l'hash memorizzato.

Se corrispondono, la CI stampa:

```
Provenance: VERIFIED
```

Questo dimostra che le prove acquisite non sono state alterate dalla loro creazione durante la scansione (integrità).
Tuttavia, non dimostra di per sé che l'ambiente di scansione originale fosse affidabile.

---

## Gli errori intenzionali (a scopo dimostrativo)

**html/index.html:**
- `<html>` privo dell'attributo `lang`
- `<img>` privo dell'attributo `alt`
- `<button>` privo di un nome accessibile
- `<a>` (link vuoto) privo di un nome accessibile

**html/contact.html:**
- `<html lang="">` (lang vuoto)
- `<input>` privo dell'etichetta associata

---

## Correzione della demo (opzionale)

Per far superare la CI, correggere l'HTML:

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

## Repository correlati

| Repo | Descrizione |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | Specifiche formali della provenienza |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | Scanner di accessibilità con provenienza |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | Consulente di correzione con verifica della provenienza |

---

## Licenza

MIT
