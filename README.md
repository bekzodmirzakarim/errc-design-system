# ЕРРЦ — Design System
### Единый Республиканский Ридинг-Центр · Unified Republican Reading Center

A medical information system for **neuroradiologists**: real-time monitoring of
**stroke (ОНМК)** patients across a region's hospitals, surfaced on large
reading-room displays. The aesthetic is **corporate-blue, clinical, dense, and
strictly minimal** — built for fast triage under time pressure ("time is brain").

> **Source note:** This system was created from a written brief, not an existing
> codebase or Figma file. No external links were provided. All tokens, components,
> and the UI kit below are original work matching the brief: navy `#0A2D5E`
> primary, white surfaces, `#1D6FD8` accent, Inter + JetBrains Mono, status-coded
> patient cards, dense 1920×1080 layout.

---

## Product context
ЕРРЦ ("ридинг-центр" = radiology *reading* center) consolidates neuro-imaging from
many sites so on-call neuroradiologists can read scans and clear stroke cases
remotely. The one product surface defined so far is the **real-time monitoring
board** (`ui_kits/monitoring-board/`) — a wall display tracking every active patient
through the stroke pathway: arrival → scan → read → report, with door-to-needle and
therapeutic-window clocks running live.

The five clinical states drive the entire visual language:

| State | Russian | Color | Meaning |
|---|---|---|---|
| Critical | Критический | **Purple** `#7C3AED` | Out of / near end of treatment window; highest urgency |
| Waiting | Ожидание | **Yellow** `#E0A008` | Arrived, awaiting imaging |
| Scanning | Сканирование | **Blue** `#1D6FD8` | Imaging in progress |
| In work | В работе | **Gray** `#64748B` | Radiologist reading / reporting |
| Ready | Готово | **Green** `#16A34A` | Report finalized & handed off |

---

## CONTENT FUNDAMENTALS
- **Language:** Russian, clinical register. Medical abbreviations are used freely and
  expected to be understood: ОНМК (stroke), КТ / КТ-АГ / КТ-перф (CT / CT-angio /
  CT-perfusion), МРТ / DWI, NIHSS, СтОСМП, РСЦ, СМП, АД, SpO₂, ЧСС.
- **Tone:** terse, factual, neutral. No marketing voice, no encouragement, no
  exclamation. Labels are nouns or noun phrases ("В работе", "Терапевт. окно"),
  actions are imperative verbs ("Принять в работу", "Передать коллеге", "Эскалация").
- **Casing:** Sentence case for names and prose. **UPPERCASE micro-labels** (letter-
  spaced) for field labels and column headers ("ОТ ДВЕРИ", "ВИТАЛЬНЫЕ ПОКАЗАТЕЛИ").
- **Person:** impersonal / third-person. The UI never says "you" — it states facts
  about the patient and the system ("автообновление включено", "Окно закрыто").
- **Names:** Russian convention — surname + initials ("Смирнов А. В."). Patient IDs
  are mono, structured (`PT-2024-0917`).
- **Numbers & time:** everything quantitative is monospaced and tabular —
  `00:42:18`, `168/94`, `NIHSS 14`, `97%`. Timers read HH:MM:SS; countdowns MM:SS.
- **Emoji:** **never.** No decorative icons in copy. Status is conveyed by color +
  a small dot/chip, not pictographs in text.
- **Vibe:** a calm instrument panel. Information density is a feature; every glyph
  earns its place.

---

## VISUAL FOUNDATIONS
**Color.** Two-temperature system: a **navy spine** (`#06203F` → `#14529E`) for
chrome (header, footer, deep wells) and a **clean white/cool-slate field** for the
working surface. One **accent blue** `#1D6FD8` carries all interactivity (focus,
links, selected, primary action). Status hues are reserved *exclusively* for
clinical state — never decorative. Backgrounds are flat: `--surface-1 #F6F9FC` app
field, `#FFFFFF` cards, `#EEF3F9` sunken wells. **No gradients, no imagery, no
texture** anywhere in the chrome — clinical flatness is the point.

**Typography.** **Inter** for all UI text; **JetBrains Mono** for every numeric /
temporal / identifier value (timers, vitals, IDs, counts, hex). Tabular numerals are
mandatory on mono so digits don't jitter as timers tick. Display weight 700 with
slight negative tracking; micro-labels 600 uppercase at `0.06em`. See
`colors_and_type.css` for the full scale (display 40 → caption 11).

**Spacing & density.** 4px base grid. The board runs *dense* — 11–13px card padding,
12–16px gaps — because the target is a glanceable wall display, not a touch app.

**Radii.** Square-leaning and restrained: 3 / 5 / 7 / 10px, plus pills for chips and
counters. Nothing is heavily rounded; the feel is instrument-grade, not consumer-soft.

**Elevation.** Three low-drama navy-tinted shadows (`--sh-1/2/3`). Cards sit on
`--sh-1`; hover lifts to `--sh-2` with a 1px `translateY`; the drawer/popovers use
`--sh-3`. Focus is a 3px `rgba(29,111,216,.30)` ring. Borders do most of the
separating work — hairlines `#EEF2F7`, default `#DDE5EE`, strong `#C9D4E0`.

**Cards.** White, 1px `--line-200` border, `--r-md` radius, `--sh-1`, and a **4px
status accent bar down the left edge** in the patient's state color. A status chip
sits top-right. This left-accent-bar + chip pairing is the signature component.

**Borders vs. fills.** State is shown two ways at once for redundancy: a solid
accent (bar/dot) *and* a tinted chip (`*-bg` wash + `*-tx` text). This keeps the
board readable at a distance and for color-vision-deficient readers.

**Animation.** Minimal and functional. A live "online" dot and the critical-status
dot **pulse** (expanding ring, ~1.5–2s) to signal real-time/urgency — the only
looping motion allowed. Drawer enters with a 200ms `translateX` ease
(`cubic-bezier(.22,1,.36,1)`); scrim fades in 150ms. Hover/press transitions are
≤120ms. **No bounces, no decorative motion.** (Note: entrance animations must never
animate opacity to 0 as a base state on continuously re-rendering components — pin
`opacity:1` and animate transform only, or live timers can strand a panel invisible.)

**Hover / press.** Hover = subtle surface darken (`--surface-1` → `--surface-2`) or a
shadow lift; navy chrome buttons lighten via `rgba(255,255,255,.07→.14)`. Primary
button darkens navy on hover (`--brand-500` → `--brand-600`). Active/selected =
accent border + ring. No scale-down press effect (clinical, not playful).

**Transparency / blur.** Used sparingly: the drawer scrim is `rgba(10,27,45,.28)`;
chrome button fills are low-alpha white over navy. No backdrop-blur, no glass.

**Imagery.** None in chrome. The only "images" are scan thumbnails inside the detail
drawer, shown as neutral placeholders with a scan icon (real DICOM previews would
slot here). Color vibe is cool and neutral throughout — no warm tones, no grain.

**Layout rules.** Fixed full-height shell: 60px navy header (fixed) / KPI strip /
flexible 4-column board (each column scrolls independently) / 32px navy footer
(fixed). Drawer is a right-pinned overlay. `min-width: 1280px`, optimized for 1920.

---

## ICONOGRAPHY
- **System: [Lucide](https://lucide.dev) (open-source, ISC license).** Chosen for its
  thin, even 1.75px stroke and rounded caps — a clean clinical match. Icon *paths are
  embedded verbatim* in `ui_kits/monitoring-board/Icons.jsx` (not invented), exposed
  as `<Icon name size color strokeWidth />`. Icons in active use: `activity, clock,
  bell, user, heart, droplet, gauge, scan, alert, stethoscope, x, chevron, search,
  refresh, filter`.
- **Style:** outline only, never filled, never two-tone. Default `currentColor`;
  alert variants switch to `--danger`, interactive to `--brand-500`. Sizes 14–17px in
  chrome, 16px in vitals, ~26px for scan placeholders.
- **Brand mark:** a navy rounded tile containing an **accent ECG/pulse line** — the
  "time-is-brain" monitoring motif. See `assets/logo.svg` (full lockup) and
  `assets/logo-mark.svg` (tile only). On navy, the tile inverts to accent-blue with a
  white pulse (see `preview/brand-logo.html`).
- **No emoji. No unicode pictographs** as icons. The only non-Latin glyphs in data are
  scientific (`SpO₂`, `мм рт.ст.`).
- **No PNG icon assets** — everything is vector (Lucide SVG paths + the SVG logo).
  To extend, pull additional icons from Lucide at the same stroke weight.

---

## Index / manifest
**Root**
- `README.md` — this file.
- `SKILL.md` — Agent-Skill manifest for using this system in Claude Code.
- `colors_and_type.css` — all design tokens (color, type, spacing, radii, elevation)
  as CSS variables + semantic `.ds-*` helper classes. **Import this first** in any
  artifact.

**assets/**
- `logo.svg` — full ЕРРЦ wordmark lockup (mark + "РИДИНГ-ЦЕНТР").
- `logo-mark.svg` — square mark only (favicon / collapsed nav).

**preview/** — Design System tab cards (each a standalone HTML specimen):
colors (brand / accent / neutral / status), type (headings / body / mono), spacing
(scale / radii / elevation), components (buttons / chips / patient cards / inputs),
brand (logo).

**ui_kits/**
- `monitoring-board/` — interactive stroke monitoring board (reading-room triage
  surface). See its own `README.md`.
- `big-screen/` — 1920×1080 **operational wall display**: Republic-wide map of 14
  regions, KPI strip, live patient feed, experts panel, and AI Stroke queue, with
  5-second auto-refresh and critical-alert banner. See its own `README.md`.

---

## Using the system
1. Link `colors_and_type.css` and build with the `--brand-*`, `--st-*`, `--ink-*`,
   `--surface-*`, spacing, radii and shadow tokens — don't hardcode hexes.
2. Mono everything numeric/temporal; reserve status colors for clinical state only.
3. For board-like surfaces, lift components from `ui_kits/monitoring-board/`.
4. Keep it flat, dense, terse, and bilingual-clinical (Russian medical register).
