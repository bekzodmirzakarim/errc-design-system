# UI Kit — Мониторинг ОНМК (Stroke Monitoring Board)

A high-fidelity, interactive recreation of ЕРРЦ's flagship surface: a real-time
monitoring board for stroke (ОНМК) patients, built for a wall-mounted 1920×1080
reading-room display.

## Run it
Open `index.html`. It mounts a live React prototype (Babel in-browser). All timers
tick in real time from page load.

## What's interactive
- **Status filter** — click any KPI tile in the strip to filter the board to that
  clinical state; click again to clear.
- **Patient cards** — click a card to open the **detail drawer** (vitals, clinical
  picture, study, patient pathway timeline, actions). Click the scrim or ✕ to close.
- **Live timers** — door-to-needle clocks and therapeutic-window countdowns update
  every second (JetBrains Mono, tabular numerals).

## Files
| File | Role |
|---|---|
| `index.html` | Entry point — loads tokens, styles, React, and all scripts in order |
| `board.css` | All layout + component styles (`.errc-*`) |
| `data.jsx` | Mock patient roster + `STATUS_META` / `COLUMN_ORDER` |
| `Icons.jsx` | `<Icon>` — Lucide paths (ISC), stroke 1.75 |
| `Chrome.jsx` | `Header`, `StatsBar`, time helpers (`useTick`, `fmtHMS`, `fmtMS`) |
| `Board.jsx` | `PatientCard`, `StatusColumn`, `PatientDetail` (drawer) |
| `app.jsx` | `App` shell — composes header, KPI strip, 4-column board, drawer, footer |

Components export to `window` so each Babel script can see the others.

## Layout anatomy
1. **Header** (navy `--brand-800`) — logo + context, live status, clock, alerts, user.
2. **KPI strip** — five status counters (clickable filters) + aggregate metrics.
3. **Board** — four workflow columns: Ожидание → Сканирование → В работе → Готово.
   Critical patients keep their workflow column but render with the purple critical
   accent + pulsing dot.
4. **Detail drawer** — right-pinned panel; on a 1920 monitor it sits flush to the
   right edge over a dim scrim.
5. **Footer** (deepest navy) — shift + on-call radiologist + build.

## Notes
- The board sets `min-width: 1280px`; on narrower preview panes the right-pinned
  drawer extends past the visible area — this is correct for the 1920 target.
- This is a cosmetic recreation: no real PACS/HIS integration, auth, or persistence.
