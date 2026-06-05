/* ЕРРЦ Big Screen — Block 3: карта Республики Узбекистан
   Renders the REAL provincial geometry (uploads/img.svg → uz-geometry.jsx),
   filled by patient status, with count badges at each region centroid and a
   hover tooltip. viewBox 0 0 600 340. */
const { useState: useMapS } = React;

function statusOf(code) {
  const r = REGIONS.find(x => x.code === code);
  return r ? r.status : 'idle';
}

function RegionShapes({ alertCode, onHover, onLeave }) {
  return (
    <g>
      {UZ_REGION_PATHS.map(rg => {
        const st = statusOf(rg.code);
        const meta = STATUS_META[st];
        const active = st !== 'idle';
        return (
          <path key={rg.code} d={rg.d}
            fill={active ? meta.solid : '#e8eef5'}
            fillOpacity={active ? 0.9 : 1}
            stroke="#fff" strokeWidth="0.8"
            className={'bs-region' + (alertCode === rg.code ? ' is-alert' : '')}
            onMouseEnter={() => onHover(rg)} onMouseLeave={onLeave} />
        );
      })}
    </g>
  );
}

function RegionBadges({ counts }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      {UZ_REGION_PATHS.map(rg => {
        const st = statusOf(rg.code);
        const meta = STATUS_META[st];
        const n = counts[rg.name] || 0;
        if (!n) return null;
        return (
          <g key={rg.code} transform={`translate(${rg.cx},${rg.cy})`}>
            {st === 'critical' && <circle r="7.5" fill="none" stroke="#fff" strokeWidth="1" className="bs-badge-pulse" />}
            <circle r="6.5" fill="#fff" stroke={meta.solid} strokeWidth="1.6" />
            <text x="0" y="0.3" textAnchor="middle" dominantBaseline="central"
              fontFamily="var(--font-mono)" fontSize="7" fontWeight="700" fill={meta.tx}>{n}</text>
          </g>
        );
      })}
    </g>
  );
}

function RegionMap({ regions, alertCode }) {
  const [tip, setTip] = useMapS(null);
  const countFor = name => PATIENTS.filter(p => p.region === name).length;
  const counts = {};
  UZ_REGION_PATHS.forEach(rg => counts[rg.name] = countFor(rg.name));

  const onHover = (rg) => {
    const st = statusOf(rg.code);
    const meta = STATUS_META[st];
    const patient = PATIENTS.find(p => p.region === rg.name);
    setTip({
      cx: rg.cx, cy: rg.cy, name: rg.name, label: meta.label, solid: meta.solid,
      count: counts[rg.name], pinfl: patient ? patient.pinfl : '—',
      time: patient ? patient.minAgo : null, idle: st === 'idle',
    });
  };

  const critCount = regions.filter(r => r.status === 'critical').length;
  const activeCount = regions.filter(r => r.status !== 'idle').length;

  return (
    <section className="bs-panel bs-map-panel">
      <header className="bs-panel-head">
        <h2 className="bs-panel-title"><Icon name="activity" size={15} color="#1d6fd8" />Карта Республики · регионы</h2>
        <div className="bs-map-legend">
          {['critical','waiting','scanning','inwork','ready'].map(k => (
            <span key={k} className="bs-leg"><span className="bs-leg-dot" style={{background:STATUS_META[k].solid}}></span>{STATUS_META[k].label}</span>
          ))}
        </div>
      </header>
      <div className="bs-map-stage">
        <svg viewBox={UZ_VIEWBOX} className="bs-map-svg" preserveAspectRatio="xMidYMid meet">
          <RegionShapes alertCode={alertCode} onHover={onHover} onLeave={() => setTip(null)} />
          <RegionBadges counts={counts} />
        </svg>
        {tip && (
          <div className="bs-tip" style={{ left: `${tip.cx/600*100}%`, top: `${tip.cy/340*100}%` }}>
            <div className="bs-tip-head"><span className="bs-tip-dot" style={{background:tip.solid}}></span>{tip.name}</div>
            <div className="bs-tip-row"><span>Статус</span><b style={{color:tip.solid}}>{tip.label}</b></div>
            <div className="bs-tip-row"><span>Пациентов</span><b className="bs-mono">{tip.count}</b></div>
            {!tip.idle && <div className="bs-tip-row"><span>ПИНФЛ</span><b className="bs-mono">{tip.pinfl}</b></div>}
            {!tip.idle && tip.time!=null && <div className="bs-tip-row"><span>Время</span><b className="bs-mono">{Math.floor(tip.time)}:{String(Math.floor((tip.time%1)*60)).padStart(2,'0')}</b></div>}
          </div>
        )}
      </div>
      <footer className="bs-map-foot">
        <span className="bs-map-foot-item"><b className="bs-mono">{activeCount}</b> активных регионов</span>
        <span className="bs-map-foot-item bs-crit"><span className="bs-leg-dot" style={{background:'#7c3aed'}}></span><b className="bs-mono">{critCount}</b> критических</span>
        <span className="bs-map-foot-item bs-muted">Карта Республики Узбекистан · 14 регионов</span>
      </footer>
    </section>
  );
}
window.RegionMap = RegionMap;
