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

Ce dépôt illustre une **pipeline d'accessibilité vérifiée**. Il montre comment utiliser `a11y-evidence-engine` pour détecter les problèmes et `a11y-assist` pour les ingérer, les vérifier et générer des rapports.

**Fonctionnalités principales :**

*   **Génération de preuves :** Analyse le code HTML pour détecter les violations des normes d'accessibilité.
*   **Traçabilité cryptographique :** Signe les ensembles de preuves pour garantir qu'ils n'ont pas été modifiés.
*   **Alertes automatisées :** Convertit les résultats en recommandations pour la correction des problèmes.
*   **Intégration CI/CD :** Démontre comment bloquer les builds en cas de régressions (ou afficher des avertissements en cas de problèmes).

## Démarrage rapide

### Prérequis

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### Exécution locale

```bash
./scripts/a11y.sh
```

Cela va :
1.  Analyser le répertoire `html/`.
2.  Générer les résultats dans `results/`.
3.  Ingérer les résultats et vérifier la traçabilité.
4.  Afficher un résumé dans la console.

## Structure du projet

*   `html/`: Le contenu web analysé (contient des erreurs d'accessibilité intentionnelles).
*   `scripts/`: Scripts d'automatisation pour exécuter la pipeline.
*   `.github/workflows`: Configurations CI.

## Licence

MIT


---

## Consultation des résultats dans GitHub Actions (artefacts)

La CI de ce dépôt télécharge l'intégralité du répertoire `results/` en tant qu'artefact GitHub Actions à chaque exécution (même lorsque le travail échoue car le code HTML est intentionnellement corrompu).

### Où télécharger l'artefact

1.  Allez à l'onglet **Actions** dans GitHub.
2.  Cliquez sur l'exécution du workflow la plus récente :
- **"A11y (upload results)"** (recommandé pour l'inspection)
3.  Faites défiler la page d'exécution jusqu'en bas.
4.  Sous **Artifacts**, téléchargez :
- **`a11y-results`**

Décompressez-le localement. Vous verrez :

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

### Ce qu'il faut ouvrir en premier (ordre recommandé)

1.  **`results/a11y-assist/ingest-summary.json`**
Aperçu rapide des nombres, des règles principales et des fichiers principaux.

2.  **`results/a11y-assist/advisories.json`**
La liste des tâches axée sur la correction. Chaque conseil comprend `instances[]` avec des liens `evidence_ref`.

3.  **`results/provenance/finding-*/digest.json`**
L'enregistrement de l'intégrité `integrity.digest.sha256` stocké.

4.  **`results/provenance/finding-*/record.json`**
L'enregistrement des preuves (`engine.extract.evidence.json_pointer`) montrant ce qui a été capturé.

### Ce que signifie "Provenance : VÉRIFIÉE"

Lorsque `a11y-assist ingest --verify-provenance` est exécuté, il recalcule le digest SHA-256 à partir des preuves normalisées et le compare au digest stocké.

S'ils correspondent, la CI affiche :

```
Provenance: VERIFIED
```

Cela prouve que les preuves capturées n'ont pas été modifiées depuis leur création lors de l'analyse (**intégrité**).
Cependant, cela ne prouve pas, en soi, que l'environnement d'analyse initial était fiable.

---

## Les bogues intentionnels (à des fins de démonstration)

**html/index.html :**
- L'attribut `lang` est manquant dans `<html >`.
- L'attribut `alt` est manquant dans `<img >`.
- Le nom accessible est manquant dans `<button >`.
- Le nom accessible est manquant dans `<a >` (lien vide).

**html/contact.html :**
- `<html lang="">` (lang vide)
- L'étiquette associée est manquante dans `<input >`.

---

## Correction de la démonstration (facultatif)

Pour que la CI réussisse, corrigez le code HTML :

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

## Dépôts associés

| Repo | Description |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | Spécification formelle de la traçabilité |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | Scanner d'accessibilité avec traçabilité |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | Conseils de correction avec vérification de la traçabilité |

---

## Licence

MIT
