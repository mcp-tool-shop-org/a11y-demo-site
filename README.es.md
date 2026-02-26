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

Este repositorio demuestra una **canalización de accesibilidad verificada**. Muestra cómo usar `a11y-evidence-engine` para buscar problemas y `a11y-assist` para procesarlos, verificarlos e informar sobre ellos.

**Características principales:**

*   **Generación de evidencia:** Analiza el código HTML en busca de violaciones de accesibilidad.
*   **Origen criptográfico:** Firma los paquetes de evidencia para garantizar que no se hayan modificado.
*   **Alertas automatizadas:** Convierte los hallazgos en recomendaciones orientadas a la corrección.
*   **Integración con CI/CD:** Demuestra cómo bloquear compilaciones en caso de regresiones (o generar advertencias en caso de hallazgos).

## Inicio rápido

### Requisitos previos

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### Ejecución local

```bash
./scripts/a11y.sh
```

Esto hará lo siguiente:
1.  Analizará el directorio `html/`.
2.  Generará los resultados en `results/`.
3.  Procesará los resultados y verificará el origen.
4.  Mostrará un resumen en la consola.

## Estructura del proyecto

*   `html/`: Contenido web que se está analizando (contiene errores de accesibilidad intencionales).
*   `scripts/`: Scripts de automatización para ejecutar la canalización.
*   `.github/workflows`: Configuraciones de CI.

## Licencia

MIT


---

## Inspección de los resultados en GitHub Actions (artefactos)

La CI de este repositorio sube todo el directorio `results/` como un artefacto de GitHub Actions en cada ejecución (incluso cuando el trabajo falla porque el HTML está intencionalmente dañado).

### Dónde descargar el artefacto

1.  Vaya a la pestaña **Actions** en GitHub.
2.  Haga clic en la ejecución de flujo de trabajo más reciente:
- **"A11y (upload results)"** (recomendado para la inspección)
3.  Desplácese hasta la parte inferior de la página de la ejecución.
4.  En **Artifacts**, descargue:
- **`a11y-results`**

Descomprima el archivo localmente. Verá:

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

### Qué archivos abrir primero (orden recomendado)

1.  **`results/a11y-assist/ingest-summary.json`**
Una descripción general rápida de las cantidades, las reglas principales y los archivos principales.

2.  **`results/a11y-assist/advisories.json`**
La lista de tareas orientada a la corrección. Cada elemento incluye `instances[]` con enlaces `evidence_ref`.

3.  **`results/provenance/finding-*/digest.json`**
El registro almacenado de `integrity.digest.sha256`.

4.  **`results/provenance/finding-*/record.json`**
El registro de evidencia (`engine.extract.evidence.json_pointer`) que muestra lo que se capturó.

### Qué significa "Origen: VERIFICADO"

Cuando se ejecuta `a11y-assist ingest --verify-provenance`, se vuelve a calcular el digest SHA-256 a partir de la evidencia normalizada y se compara con el digest almacenado.

Si coinciden, la CI imprime:

```
Provenance: VERIFIED
```

Esto demuestra que la evidencia capturada no se ha modificado desde que se generó durante el análisis (integridad).
Sin embargo, por sí solo, no demuestra que el entorno de análisis original fuera confiable.

---

## Los errores intencionales (para fines de demostración)

**html/index.html:**
- El atributo `lang` falta en la etiqueta `<html>`.
- El atributo `alt` falta en la etiqueta `<img>`.
- El botón `<button>` no tiene un nombre accesible.
- El enlace `<a>` (enlace vacío) no tiene un nombre accesible.

**html/contact.html:**
- `<html lang="">` (lang vacío)
- La etiqueta `<input>` no tiene una etiqueta asociada.

---

## Corrección de la demostración (opcional)

Para que la CI pase, corrija el código HTML:

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

## Repositorios relacionados

| Repo | Descripción |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | Especificación formal de origen |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | Escáner de accesibilidad con origen |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | Asesor de corrección con verificación de origen |

---

## Licencia

MIT
