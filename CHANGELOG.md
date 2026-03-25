# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.1] - 2026-03-25

### Added

- Demo integrity check script (`scripts/check-demo-integrity.sh`) — verifies intentional a11y bugs are still present
- Integrity check runs in CI before the a11y pipeline

### Changed

- Consolidated duplicate a11y workflows (a11y.yml + a11y-artifacts.yml) into single ci.yml

## [1.0.0] - 2026-02-27

### Added

- SECURITY.md with scope and response timeline
- SHIP_GATE.md and SCORECARD.md for product audit trail
- Security & Data Scope section in README

### Changed

- Promoted to v1.0.0 stable release
- Demonstrates verified accessibility pipeline with cryptographic provenance
