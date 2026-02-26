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

यह रिपॉजिटरी एक **सत्यापित पहुंच क्षमता (accessibility) पाइपलाइन** का प्रदर्शन करती है। यह दिखाता है कि `a11y-evidence-engine` का उपयोग करके समस्याओं की जांच कैसे करें और `a11y-assist` का उपयोग करके उन्हें कैसे संसाधित, सत्यापित और रिपोर्ट किया जाए।

**मुख्य विशेषताएं:**

*   **सबूत (evidence) निर्माण**: एचटीएमएल में पहुंच क्षमता के उल्लंघनों की जांच करता है।
*   **क्रिप्टोग्राफिक प्रमाण**: यह सुनिश्चित करने के लिए कि वे छेड़छाड़ नहीं किए गए हैं, सबूतों के बंडलों पर हस्ताक्षर करता है।
*   **स्वचालित सलाह**: निष्कर्षों को समाधान-उन्मुख मार्गदर्शन में परिवर्तित करता है।
*   **CI/CD एकीकरण**: यह दर्शाता है कि प्रतिगमन (regressions) होने पर बिल्ड को कैसे रोका जाए (या निष्कर्षों पर चेतावनी जारी की जाए)।

## त्वरित शुरुआत

### आवश्यकताएं

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### स्थानीय रूप से चलाएं

```bash
./scripts/a11y.sh
```

यह निम्नलिखित कार्य करेगा:
1.  `html/` निर्देशिका को स्कैन करेगा।
2.  `results/` में निष्कर्ष उत्पन्न करेगा।
3.  निष्कर्षों को संसाधित करेगा और प्रमाण की जांच करेगा।
4.  कंसोल पर एक सारांश प्रदर्शित करेगा।

## परियोजना संरचना

*   `html/`: स्कैन की जा रही वेब सामग्री (इसमें जानबूझकर पहुंच क्षमता त्रुटियां हैं)।
*   `scripts/`: पाइपलाइन चलाने के लिए ऑटोमेशन स्क्रिप्ट।
*   `.github/workflows`: CI कॉन्फ़िगरेशन।

## लाइसेंस

MIT


---

## GitHub Actions (आर्टिफैक्ट्स) में परिणामों की जांच

इस रिपॉजिटरी का CI, प्रत्येक रन पर (भले ही नौकरी विफल हो जाए क्योंकि एचटीएमएल जानबूझकर खराब है) `results/` निर्देशिका को एक GitHub Actions आर्टिफैक्ट के रूप में अपलोड करता है।

### आर्टिफैक्ट को कहां से डाउनलोड करें

1. GitHub में **Actions** टैब पर जाएं।
2. सबसे हालिया वर्कफ़्लो रन पर क्लिक करें:
- **"A11y (results अपलोड करें)"** (निरीक्षण के लिए अनुशंसित)
3. रन पेज के निचले भाग तक स्क्रॉल करें।
4. **Artifacts** के अंतर्गत, निम्नलिखित डाउनलोड करें:
- **`a11y-results`**

इसे स्थानीय रूप से अनज़िप करें। आपको निम्नलिखित दिखाई देंगे:

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

### सबसे पहले क्या खोलें (अनुशंसित क्रम)

1. **`results/a11y-assist/ingest-summary.json`**
गिनतियों, शीर्ष नियमों और शीर्ष फ़ाइलों का त्वरित अवलोकन।

2. **`results/a11y-assist/advisories.json`**
समाधान-उन्मुख कार्य सूची। प्रत्येक सलाह में `instances[]` शामिल हैं, जिनमें `evidence_ref` लिंक हैं।

3. **`results/provenance/finding-*/digest.json`**
संग्रहित `integrity.digest.sha256` रिकॉर्ड।

4. **`results/provenance/finding-*/record.json`**
सबूत रिकॉर्ड (`engine.extract.evidence.json_pointer`) जो दिखाता है कि क्या कैप्चर किया गया था।

### "Provenance: VERIFIED" का क्या अर्थ है

जब `a11y-assist ingest --verify-provenance` चलता है, तो यह मानकीकृत सबूत से SHA-256 डाइजेस्ट की पुनर्गणना करता है और इसकी तुलना संग्रहीत डाइजेस्ट से करता है।

यदि वे मेल खाते हैं, तो CI प्रिंट करता है:

```
Provenance: VERIFIED
```

यह साबित करता है कि कैप्चर किया गया सबूत स्कैन द्वारा उत्पन्न होने के बाद से छेड़छाड़ नहीं किया गया है (**अखंडता**)।
हालांकि, यह अपने आप में यह साबित नहीं करता है कि मूल स्कैन वातावरण विश्वसनीय था।

---

## जानबूझकर की गई त्रुटियां (प्रदर्शन उद्देश्यों के लिए)

**html/index.html:**
- `<html>` में `lang` विशेषता गायब है
- `<img>` में `alt` विशेषता गायब है
- `<button>` में पहुंच योग्य नाम गायब है
- `<a>` (खाली लिंक) में पहुंच योग्य नाम गायब है

**html/contact.html:**
- `<html lang="">` (खाली lang)
- `<input>` में संबंधित लेबल गायब है

---

## डेमो को ठीक करना (वैकल्पिक)

CI को पास करने के लिए, एचटीएमएल को ठीक करें:

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

## संबंधित रिपॉजिटरी

| Repo | विवरण |
| ------ | ------------- |
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | औपचारिक प्रमाण विनिर्देश |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | प्रमाण के साथ पहुंच स्कैनर |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | प्रमाण सत्यापन के साथ फिक्स सलाहकार |

---

## लाइसेंस

MIT
