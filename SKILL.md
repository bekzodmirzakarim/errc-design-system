---
name: errc-design
description: Use this skill to generate well-branded interfaces and assets for ЕРРЦ (Единый Республиканский Ридинг-Центр) — a corporate-blue medical monitoring system for neuroradiologists tracking stroke (ОНМК) patients in real time. Contains design guidelines, color & type tokens, fonts, the logo, iconography, and an interactive monitoring-board UI kit, for production work or throwaway prototypes/mocks.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files
(`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/monitoring-board/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets
out and create static HTML files for the user to view — always link
`colors_and_type.css` first and build with its tokens (`--brand-*`, `--st-*`,
`--ink-*`, `--surface-*`, spacing/radii/shadow vars) rather than hardcoded hexes.
For board-like surfaces, lift components from `ui_kits/monitoring-board/`. If working
on production code, copy the assets and read the rules here to become an expert in
designing with this brand.

Core rules to honor: corporate navy `#0A2D5E` chrome on a white/cool-slate field; one
accent blue `#1D6FD8` for all interactivity; the five patient-status colors
(purple=critical, yellow=waiting, blue=scanning, gray=in work, green=ready) reserved
*only* for clinical state; Inter for text and JetBrains Mono (tabular) for every
timer/number/ID; flat — no gradients, no imagery, no emoji; dense, terse, Russian
clinical register; Lucide outline icons at 1.75px stroke.

If the user invokes this skill without other guidance, ask them what they want to
build or design, ask a few focused questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.
