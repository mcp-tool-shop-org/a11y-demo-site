import type { SiteConfig } from '@mcptoolshop/site-theme';

export const config: SiteConfig = {
  title: 'A11y Demo Site',
  description: 'End-to-end demo: a11y-evidence-engine + a11y-assist with provenance verification.',
  logoBadge: 'A1',
  brandName: 'A11y Demo Site',
  repoUrl: 'https://github.com/mcp-tool-shop-org/a11y-demo-site',
  footerText: 'MIT Licensed — built by <a href="https://github.com/mcp-tool-shop-org" style="color:var(--color-muted);text-decoration:underline">mcp-tool-shop-org</a>',

  hero: {
    badge: 'Open source',
    headline: 'A11y Demo Site',
    headlineAccent: 'Verified accessibility pipeline.',
    description: 'See how a11y-evidence-engine and a11y-assist work together — scan HTML for violations, sign evidence with cryptographic provenance, and generate fix-oriented advisories.',
    primaryCta: { href: '#quick-start', label: 'Get started' },
    secondaryCta: { href: '#pipeline', label: 'How it works' },
    previews: [
      { label: 'Scan', code: './scripts/a11y.sh' },
      { label: 'Verify', code: 'a11y-assist ingest --verify-provenance' },
      { label: 'Result', code: 'Provenance: VERIFIED' },
    ],
  },

  sections: [
    {
      kind: 'features',
      id: 'features',
      title: 'Features',
      subtitle: 'What this demo shows.',
      features: [
        { title: 'Evidence Generation', desc: 'Scans HTML for WCAG violations and outputs structured findings with JSON Pointers to the offending elements.' },
        { title: 'Cryptographic Provenance', desc: 'Every finding is signed with a SHA-256 digest. Verification proves evidence has not been tampered with since scan time.' },
        { title: 'Fix-Oriented Advisories', desc: 'a11y-assist converts raw findings into actionable tasks with code examples showing exactly how to fix each issue.' },
        { title: 'CI/CD Integration', desc: 'GitHub Actions workflows demonstrate blocking builds on regressions and uploading results as downloadable artifacts.' },
        { title: 'Intentional Bugs', desc: 'The demo HTML contains real WCAG violations (missing lang, alt, labels) so you can see the full pipeline in action.' },
        { title: 'Artifact Inspection', desc: 'Download CI artifacts to inspect findings, provenance records, digest chains, and advisory outputs locally.' },
      ],
    },
    {
      kind: 'code-cards',
      id: 'quick-start',
      title: 'Quick Start',
      cards: [
        {
          title: 'Prerequisites',
          code: '# Node.js 20+ and Python 3.10+\nnpm install -g a11y-evidence-engine\npip install a11y-assist',
        },
        {
          title: 'Run locally',
          code: '# Clone and run the pipeline\ngit clone https://github.com/mcp-tool-shop-org/a11y-demo-site\ncd a11y-demo-site\n./scripts/a11y.sh',
        },
        {
          title: 'What happens',
          code: '# 1. Scans html/ directory\n# 2. Generates findings in results/\n# 3. Ingests + verifies provenance\n# 4. Outputs summary to console',
        },
        {
          title: 'Inspect results',
          code: '# Start with the summary\ncat results/a11y-assist/ingest-summary.json\n\n# Then the advisories\ncat results/a11y-assist/advisories.json',
        },
      ],
    },
    {
      kind: 'features',
      id: 'pipeline',
      title: 'Pipeline',
      subtitle: 'Scan \u2192 Sign \u2192 Verify \u2192 Advise.',
      features: [
        { title: '1. Scan', desc: 'a11y-evidence-engine scans HTML files and emits structured findings with element selectors and rule references.' },
        { title: '2. Sign', desc: 'Each finding gets a provenance envelope: a canonical JSON representation hashed with SHA-256 and stored alongside the evidence.' },
        { title: '3. Verify', desc: 'a11y-assist recomputes the digest from the evidence and compares it to the stored hash. Match = VERIFIED.' },
        { title: '4. Advise', desc: 'Verified findings are converted into fix-oriented advisories with code snippets, grouped by rule and severity.' },
      ],
    },
    {
      kind: 'data-table',
      id: 'demo-bugs',
      title: 'Intentional Bugs',
      subtitle: 'The demo HTML contains these WCAG violations on purpose.',
      columns: ['File', 'Violation', 'WCAG Rule'],
      rows: [
        ['index.html', '<html> missing lang attribute', 'html-has-lang'],
        ['index.html', '<img> missing alt attribute', 'image-alt'],
        ['index.html', '<button> missing accessible name', 'button-name'],
        ['index.html', '<a> (empty link) missing name', 'link-name'],
        ['contact.html', '<html lang=""> (empty lang)', 'html-lang-valid'],
        ['contact.html', '<input> missing associated label', 'label'],
      ],
    },
    {
      kind: 'data-table',
      id: 'related',
      title: 'Related Repos',
      subtitle: 'The tools that power this demo.',
      columns: ['Repo', 'Description'],
      rows: [
        ['prov-spec', 'Formal provenance specification'],
        ['a11y-evidence-engine', 'Accessibility scanner with provenance'],
        ['a11y-assist', 'Fix advisor with provenance verification'],
      ],
    },
  ],
};
