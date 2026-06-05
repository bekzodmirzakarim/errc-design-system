# UI Kit — Big Screen (операционный монитор)

Single-screen **1920×1080 wall display** for the ЕРРЦ reading-room: a live
operational view of stroke (ОНМК) care across all 14 regions of Uzbekistan,
driven by the AI Stroke engine. Fits one screen, no scroll, auto-refreshes.

## Run it
Open `index.html`. The fixed 1920×1080 canvas is scaled with JS to letterbox onto
any viewport. Timers tick every second; data auto-refreshes every 5 seconds.

## The six blocks
1. **Topbar** — logo + system name, AI Stroke Online/Offline, shift coordinator,
   live clock + date/day-of-week (Russian).
2. **KPI row** — active patients now · protocols done today · avg door-to-protocol ·
   critical count (purple).
3. **Map of Uzbekistan** — schematic silhouette + 14 region markers placed at true
   projected lon/lat. Marker color = patient status (5-color model). Active markers
   pulse; critical markers ring. Hover → tooltip (region · status · ПИНФЛ · time).
   A purple **alert banner** (7 s) fires when a region escalates to critical.
4. **Active patient feed** — sorted by criticality (Фиолетовый → Жёлтый → Синий →
   Серый → Зелёный). Per row: ID, ФИО, region, status tag, study + ASPECTS, assigned
   expert, and a **timer from activation that changes color**: green <5 min →
   yellow 5–10 → red >10.
5. **Experts panel** — 6 neuroradiologist cards: Свободен / Занят / Читает, number,
   name, current patient.
6. **AI Stroke queue** — studies-in-queue counter, engine status, avg processing time.

## Files
| File | Role |
|---|---|
| `index.html` | Entry + 1920×1080 scaling stage |
| `bigscreen.css` | All `.bs-*` layout/component styles |
| `bigscreen-data.jsx` | Regions (with geo coords), patients, experts, status model |
| `Icons.jsx` | Lucide `<Icon>` (shared with monitoring-board) |
| `BigMap.jsx` | Block 3 — `RegionMap`, markers, tooltip, silhouette |
| `BigPanels.jsx` | Blocks 1,2,4,5,6 — topbar, KPI, feed, experts, AI queue |
| `bigscreen-app.jsx` | Shell + 5 s refresh simulation + critical-alert banner |

## Map note
The map uses the **real provincial geometry of Uzbekistan** (14 regions, viewBox
`0 0 600 340`), supplied as `uploads/img.svg` and extracted verbatim into
`uz-geometry.jsx`. Regions are **filled live by patient status** (the 5-color model),
with a count badge at each region's centroid and a hover tooltip (region · status ·
count · ПИНФЛ · time). Index→region names were assigned by geography in `uz-geometry`.
To swap the map, replace `uz-geometry.jsx` (same `{code,name,cx,cy,d}` shape).

## Notes
- Cosmetic recreation: simulated data only, no real PACS/HIS/AI integration.
- ПИНФЛ values are randomly generated placeholders, not real personal IDs.
