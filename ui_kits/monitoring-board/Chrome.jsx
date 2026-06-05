/* ЕРРЦ monitoring board — components */
const { useState, useEffect, useRef } = React;

/* ---- live ticking helpers ---- */
const MOUNT = Date.now();
function useTick(ms = 1000) {
  const [, set] = useState(0);
  useEffect(() => { const t = setInterval(() => set(n => n + 1), ms); return () => clearInterval(t); }, []);
}
function elapsedSec(sinceMin) { return sinceMin * 60 + Math.floor((Date.now() - MOUNT) / 1000); }
function fmtHMS(totalSec) {
  const h = Math.floor(totalSec / 3600), m = Math.floor((totalSec % 3600) / 60), s = totalSec % 60;
  const p = n => String(n).padStart(2, '0');
  return `${p(h)}:${p(m)}:${p(s)}`;
}
function fmtMS(totalSec) {
  const m = Math.floor(totalSec / 60), s = totalSec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function clock() { const d = new Date(); const p = n => String(n).padStart(2,'0'); return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; }

/* ============ HEADER ============ */
function Header() {
  useTick();
  return (
    <header className="errc-header">
      <div className="errc-brand">
        <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
          <rect x="0" y="0" width="56" height="56" rx="11" fill="#1d6fd8"/>
          <path d="M9 32 H20 L25 18 L32 42 L37 28 H47" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="47" cy="28" r="3.4" fill="#bcd6f7"/>
        </svg>
        <div>
          <div className="errc-brand-name">ЕРРЦ</div>
          <div className="errc-brand-sub">Республиканский ридинг-центр</div>
        </div>
        <div className="errc-divider"></div>
        <div className="errc-context">
          <Icon name="activity" size={15} color="#9bb6d8" />
          <span>Мониторинг ОНМК · реальное время</span>
        </div>
      </div>
      <div className="errc-header-right">
        <div className="errc-live"><span className="errc-live-dot"></span>Онлайн · автообновление</div>
        <div className="errc-clock"><Icon name="clock" size={14} color="#9bb6d8" /><span>{clock()}</span></div>
        <button className="errc-icon-btn"><Icon name="bell" size={17} color="#cdddf2" /><span className="errc-badge-num">3</span></button>
        <div className="errc-user">
          <div className="errc-avatar">ВЕ</div>
          <div><div className="errc-user-name">Волкова Е. Н.</div><div className="errc-user-role">Нейрорадиолог</div></div>
        </div>
      </div>
    </header>
  );
}

/* ============ KPI STRIP ============ */
function StatsBar({ patients, filter, setFilter }) {
  useTick();
  const counts = {};
  Object.keys(STATUS_META).forEach(k => counts[k] = patients.filter(p => p.status === k).length);
  const critical = counts.critical;
  const stats = [
    { key:'critical', label:'Критические', value:critical, meta:STATUS_META.critical },
    { key:'waiting',  label:'Ожидание',    value:counts.waiting,  meta:STATUS_META.waiting },
    { key:'scanning', label:'Сканирование',value:counts.scanning, meta:STATUS_META.scanning },
    { key:'inwork',   label:'В работе',    value:counts.inwork,   meta:STATUS_META.inwork },
    { key:'ready',    label:'Готово',      value:counts.ready,    meta:STATUS_META.ready },
  ];
  return (
    <div className="errc-stats">
      <div className="errc-stats-group">
        {stats.map(s => (
          <button key={s.key} className={'errc-stat' + (filter === s.key ? ' is-active' : '')}
            onClick={() => setFilter(filter === s.key ? null : s.key)}
            style={{ '--stat-color': s.meta.solid }}>
            <span className="errc-stat-bar"></span>
            <span className="errc-stat-val">{s.value}</span>
            <span className="errc-stat-label">{s.label}</span>
          </button>
        ))}
      </div>
      <div className="errc-stats-meta">
        <div className="errc-metric"><span className="errc-metric-label">Ср. door-to-needle</span><span className="errc-metric-val">38:24</span></div>
        <div className="errc-metric"><span className="errc-metric-label">Всего активных</span><span className="errc-metric-val">{patients.length}</span></div>
        <div className="errc-metric errc-metric-alert"><Icon name="alert" size={15} color="var(--danger)" /><span className="errc-metric-val" style={{color:'var(--danger)'}}>{critical} вне окна</span></div>
      </div>
    </div>
  );
}

window.Header = Header;
window.StatsBar = StatsBar;
window.useTick = useTick;
window.elapsedSec = elapsedSec;
window.fmtHMS = fmtHMS;
window.fmtMS = fmtMS;
