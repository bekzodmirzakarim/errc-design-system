/* ЕРРЦ monitoring board — patient cards, columns, detail drawer */

/* ============ PATIENT CARD ============ */
function PatientCard({ p, onOpen, active }) {
  useTick();
  const meta = STATUS_META[p.status];
  const elapsed = elapsedSec(p.since);
  const windowSec = p.window * 60 - Math.floor((Date.now() - MOUNT) / 1000);
  const outOfWindow = p.window === 0;
  const windowLow = !outOfWindow && windowSec < 20 * 60;
  return (
    <article className={'errc-card' + (active ? ' is-active' : '')} onClick={() => onOpen(p)}
      style={{ '--accent': meta.solid }}>
      <div className="errc-card-accent"></div>
      <div className="errc-card-top">
        <div>
          <div className="errc-card-name">{p.name}</div>
          <div className="errc-card-id">{p.id} · {p.sex}, {p.age}</div>
        </div>
        <span className="errc-chip" style={{ background: meta.bg, color: meta.tx }}>
          {p.status === 'critical' && <span className="errc-chip-pulse" style={{ background: meta.solid }}></span>}
          {meta.label}
        </span>
      </div>
      <div className="errc-card-mid">
        <div className="errc-card-timer">
          <span className="errc-card-timer-label">от двери</span>
          <span className={'errc-card-timer-val' + (p.status === 'critical' ? ' is-crit' : '')}>{fmtHMS(elapsed)}</span>
        </div>
        <div className="errc-card-badges">
          <span className="errc-data-badge">{p.modality}</span>
          <span className={'errc-data-badge' + (p.nihss >= 12 ? ' is-high' : '')}>NIHSS {p.nihss}</span>
        </div>
      </div>
      <div className="errc-card-foot">
        <span className="errc-card-dept">{p.dept}</span>
        {outOfWindow
          ? <span className="errc-window errc-window-done">Окно закрыто</span>
          : <span className={'errc-window' + (windowLow ? ' is-low' : '')}>Окно {fmtMS(Math.max(windowSec,0))}</span>}
      </div>
    </article>
  );
}

/* ============ STATUS COLUMN ============ */
function StatusColumn({ statusKey, patients, onOpen, activeId }) {
  const meta = STATUS_META[statusKey];
  // critical patients fold into their workflow column but keep critical styling on the card
  const list = patients.filter(p => p.columnStatus === statusKey);
  return (
    <section className="errc-col">
      <header className="errc-col-head">
        <span className="errc-col-dot" style={{ background: meta.solid }}></span>
        <span className="errc-col-title">{meta.label}</span>
        <span className="errc-col-count">{list.length}</span>
      </header>
      <div className="errc-col-body">
        {list.map(p => <PatientCard key={p.id} p={p} onOpen={onOpen} active={activeId === p.id} />)}
        {list.length === 0 && <div className="errc-col-empty">Нет пациентов</div>}
      </div>
    </section>
  );
}

/* ============ DETAIL DRAWER ============ */
function Vital({ icon, label, value, unit, alert }) {
  return (
    <div className={'errc-vital' + (alert ? ' is-alert' : '')}>
      <Icon name={icon} size={16} color={alert ? 'var(--danger)' : 'var(--brand-500)'} />
      <div><div className="errc-vital-val">{value}<span className="errc-vital-unit">{unit}</span></div>
      <div className="errc-vital-label">{label}</div></div>
    </div>
  );
}
function PatientDetail({ p, onClose }) {
  useTick();
  if (!p) return null;
  const meta = STATUS_META[p.status];
  const elapsed = elapsedSec(p.since);
  const timeline = [
    { t:'Поступление в СтОСМП', done:true, time:fmtHMS(elapsed) },
    { t:'Осмотр невролога, NIHSS', done:true },
    { t:'Нейровизуализация — ' + p.modality, done:p.status!=='waiting' },
    { t:'Описание нейрорадиологом', done:p.status==='ready'||p.status==='inwork' },
    { t:'Заключение передано', done:p.status==='ready' },
  ];
  return (
    <>
      <div className="errc-scrim" onClick={onClose}></div>
      <aside className="errc-drawer" style={{ '--accent': meta.solid }}>
        <div className="errc-drawer-accent"></div>
        <header className="errc-drawer-head">
          <div>
            <span className="errc-chip" style={{ background: meta.bg, color: meta.tx }}>
              {p.status === 'critical' && <span className="errc-chip-pulse" style={{ background: meta.solid }}></span>}{meta.label}</span>
            <h2 className="errc-drawer-name">{p.name}</h2>
            <div className="errc-drawer-id">{p.id} · {p.sex}, {p.age} лет · {p.dept}</div>
          </div>
          <button className="errc-close" onClick={onClose}><Icon name="x" size={18} color="var(--ink-500)" /></button>
        </header>

        <div className="errc-drawer-timer">
          <div><div className="errc-dt-label">Door-to-needle</div>
            <div className={'errc-dt-val' + (p.status==='critical'?' is-crit':'')}>{fmtHMS(elapsed)}</div></div>
          <div className="errc-dt-sep"></div>
          <div><div className="errc-dt-label">Терапевт. окно</div>
            <div className="errc-dt-val">{p.window === 0 ? 'Закрыто' : fmtMS(Math.max(p.window*60 - Math.floor((Date.now()-MOUNT)/1000),0))}</div></div>
        </div>

        <div className="errc-section-label">Витальные показатели</div>
        <div className="errc-vitals">
          <Vital icon="heart" label="АД, мм рт.ст." value={p.bp} alert={parseInt(p.bp) > 180} />
          <Vital icon="activity" label="ЧСС, уд/мин" value={p.hr} alert={p.hr > 100} />
          <Vital icon="droplet" label="SpO₂" value={p.spo2} unit="%" alert={p.spo2 < 95} />
          <Vital icon="gauge" label="NIHSS" value={p.nihss} alert={p.nihss >= 12} />
        </div>

        <div className="errc-section-label">Клиническая картина</div>
        <p className="errc-complaint">{p.complaint}</p>

        <div className="errc-section-label">Исследование</div>
        <div className="errc-scan-row">
          <div className="errc-scan-thumb"><Icon name="scan" size={26} color="var(--ink-400)" /><span>{p.modality}</span></div>
          <div className="errc-scan-thumb"><Icon name="scan" size={26} color="var(--ink-400)" /><span>Серия 2</span></div>
          <div className="errc-scan-meta">
            <div className="errc-radiologist"><span className="errc-section-label" style={{margin:0}}>Радиолог</span>{p.radiologist}</div>
          </div>
        </div>

        <div className="errc-section-label">Маршрут пациента</div>
        <ol className="errc-timeline">
          {timeline.map((s, i) => (
            <li key={i} className={'errc-tl-item' + (s.done ? ' is-done' : '')}>
              <span className="errc-tl-marker"></span>
              <span className="errc-tl-text">{s.t}</span>
              {s.time && <span className="errc-tl-time">{s.time}</span>}
            </li>
          ))}
        </ol>

        <div className="errc-drawer-actions">
          <button className="errc-btn errc-btn-primary"><Icon name="stethoscope" size={15} color="#fff" />Принять в работу</button>
          <button className="errc-btn errc-btn-secondary">Передать коллеге</button>
          <button className="errc-btn errc-btn-danger"><Icon name="alert" size={15} color="#fff" />Эскалация</button>
        </div>
      </aside>
    </>
  );
}

window.PatientCard = PatientCard;
window.StatusColumn = StatusColumn;
window.PatientDetail = PatientDetail;
