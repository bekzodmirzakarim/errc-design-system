/* ЕРРЦ Big Screen — Blocks 1,2,4,5,6 */
const { useState: useP, useEffect: usePE } = React;

function useTick(ms=1000){ const [,s]=useP(0); usePE(()=>{const t=setInterval(()=>s(n=>n+1),ms);return()=>clearInterval(t);},[]); }
function pad(n){ return String(n).padStart(2,'0'); }
function nowClock(){ const d=new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; }
const DOW=['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
const MON=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
function nowDate(){ const d=new Date(); return `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()} · ${DOW[d.getDay()]}`; }

/* base epoch for live timers */
const BS_MOUNT = Date.now();
function liveMin(minAgo){ return minAgo*60 + (Date.now()-BS_MOUNT)/1000; }
function fmtTimer(sec){ const m=Math.floor(sec/60), s=Math.floor(sec%60); return `${pad(m)}:${pad(s)}`; }
function timerClass(sec){ const m=sec/60; if(m<5) return 'ok'; if(m<10) return 'warn'; return 'crit'; }

/* ===== BLOCK 1 — TOPBAR ===== */
function TopBar({ engineOnline }) {
  useTick();
  return (
    <header className="bs-topbar">
      <div className="bs-tb-left">
        <svg width="38" height="38" viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="11" fill="#1d6fd8"/>
          <path d="M9 32 H20 L25 18 L32 42 L37 28 H47" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="47" cy="28" r="3.4" fill="#bcd6f7"/>
        </svg>
        <div>
          <div className="bs-tb-brand">ЕРРЦ · Республиканский ридинг-центр</div>
          <div className="bs-tb-sub">Единая система мониторинга ОНМК · AI Stroke</div>
        </div>
      </div>
      <div className="bs-tb-right">
        <div className={'bs-engine' + (engineOnline ? '' : ' is-off')}>
          <span className="bs-engine-dot"></span>AI Stroke · {engineOnline ? 'Online' : 'Offline'}
        </div>
        <div className="bs-tb-coord">
          <span className="bs-tb-coord-label">Координатор смены</span>
          <span className="bs-tb-coord-name">Волкова Е. Н.</span>
        </div>
        <div className="bs-tb-divider"></div>
        <div className="bs-tb-time">
          <div className="bs-tb-clock">{nowClock()}</div>
          <div className="bs-tb-date">{nowDate()}</div>
        </div>
      </div>
    </header>
  );
}

/* ===== BLOCK 2 — KPI ===== */
function Kpi({ label, value, unit, accent, sub }) {
  return (
    <div className="bs-kpi" style={{ '--kpi': accent || '#1d6fd8' }}>
      <span className="bs-kpi-bar"></span>
      <div className="bs-kpi-label">{label}</div>
      <div className="bs-kpi-value">{value}<span className="bs-kpi-unit">{unit}</span></div>
      {sub && <div className="bs-kpi-sub">{sub}</div>}
    </div>
  );
}
function KpiRow({ patients, regions, doneToday, avgD2P }) {
  const active = patients.length;
  const critical = patients.filter(p=>p.status==='critical').length;
  return (
    <div className="bs-kpi-row">
      <Kpi label="Активных пациентов" value={active} sub="в работе сейчас" accent="#1d6fd8" />
      <Kpi label="Готово протоколов" value={doneToday} sub="за сегодня" accent="#16a34a" />
      <Kpi label="Ср. door-to-protocol" value={avgD2P} unit=" мин" sub="цель ≤ 30 мин" accent="#0a2d5e" />
      <Kpi label="Критических" value={critical} sub="фиолетовый статус" accent="#7c3aed" />
    </div>
  );
}

/* ===== BLOCK 4 — PATIENT FEED ===== */
function FeedRow({ p }) {
  useTick();
  const meta = STATUS_META[p.status];
  const sec = liveMin(p.minAgo);
  const tc = timerClass(sec);
  return (
    <div className="bs-feed-row" style={{ '--row': meta.solid }}>
      <span className="bs-feed-accent"></span>
      <span className="bs-feed-id bs-mono">{p.id}</span>
      <span className="bs-feed-fio">{p.fio}<span className="bs-feed-region">{p.region}</span></span>
      <span className="bs-chip" style={{ background:meta.bg, color:meta.tx }}>
        {p.status==='critical' && <span className="bs-chip-pulse" style={{background:meta.solid}}></span>}{meta.label}
      </span>
      <span className="bs-feed-study"><span className="bs-data-badge">{p.study}</span>{p.aspects!=null && <span className="bs-data-badge bs-aspects">ASPECTS {p.aspects}</span>}</span>
      <span className="bs-feed-expert">{p.expert}</span>
      <span className={'bs-feed-timer bs-mono is-'+tc}>{fmtTimer(sec)}</span>
    </div>
  );
}
function PatientFeed({ patients }) {
  const sorted = [...patients].sort((a,b)=> STATUS_META[a.status].rank - STATUS_META[b.status].rank || b.minAgo - a.minAgo);
  return (
    <section className="bs-panel bs-feed">
      <header className="bs-panel-head">
        <h2 className="bs-panel-title"><Icon name="user" size={15} color="#1d6fd8" />Активная лента пациентов</h2>
        <span className="bs-count-pill bs-mono">{patients.length}</span>
      </header>
      <div className="bs-feed-cols">
        <span>ID</span><span>Пациент / регион</span><span>Статус</span><span>Исследование</span><span>Эксперт</span><span className="bs-r">Таймер</span>
      </div>
      <div className="bs-feed-body">
        {sorted.map(p => <FeedRow key={p.id} p={p} />)}
      </div>
    </section>
  );
}

/* ===== BLOCK 5 — EXPERTS ===== */
function ExpertCard({ e }) {
  const st = EXPERT_STATE[e.state];
  return (
    <div className="bs-expert" style={{ '--ex': st.solid }}>
      <div className="bs-expert-top">
        <span className="bs-expert-avatar">{e.name.split(' ')[0].slice(0,1)}{e.name.split(' ')[1]?.slice(0,1)||''}</span>
        <span className="bs-expert-num bs-mono">{e.num}</span>
        <span className="bs-expert-state" style={{ background:st.bg, color:st.tx }}><span className="bs-expert-state-dot" style={{background:st.solid}}></span>{st.label}</span>
      </div>
      <div className="bs-expert-name">{e.name}</div>
      <div className="bs-expert-patient">{e.patient ? <>Пациент <b className="bs-mono">{e.patient}</b></> : <span className="bs-muted">Ожидает назначения</span>}</div>
    </div>
  );
}
function ExpertsPanel({ experts }) {
  const free = experts.filter(e=>e.state==='free').length;
  return (
    <section className="bs-panel bs-experts">
      <header className="bs-panel-head">
        <h2 className="bs-panel-title"><Icon name="stethoscope" size={15} color="#1d6fd8" />Эксперты-нейрорадиологи</h2>
        <span className="bs-count-pill"><b className="bs-mono" style={{color:'#16a34a'}}>{free}</b> свободно</span>
      </header>
      <div className="bs-experts-grid">
        {experts.map(e => <ExpertCard key={e.num} e={e} />)}
      </div>
    </section>
  );
}

/* ===== BLOCK 6 — AI QUEUE ===== */
function AiQueue({ queue, engineOnline, avgProc }) {
  return (
    <section className="bs-panel bs-ai">
      <header className="bs-panel-head">
        <h2 className="bs-panel-title"><Icon name="scan" size={15} color="#1d6fd8" />Очередь AI Stroke</h2>
        <span className={'bs-ai-engine' + (engineOnline?'':' is-off')}><span className="bs-engine-dot"></span>{engineOnline?'Online':'Offline'}</span>
      </header>
      <div className="bs-ai-body">
        <div className="bs-ai-queue">
          <div className="bs-ai-queue-num bs-mono">{queue}</div>
          <div className="bs-ai-queue-label">исследований<br/>в очереди</div>
        </div>
        <div className="bs-ai-metrics">
          <div className="bs-ai-metric"><span className="bs-ai-metric-label">Ср. время обработки</span><span className="bs-ai-metric-val bs-mono">{avgProc} c</span></div>
          <div className="bs-ai-metric"><span className="bs-ai-metric-label">Движок</span><span className="bs-ai-metric-val" style={{color: engineOnline?'#16a34a':'#dc2626'}}>{engineOnline?'Активен':'Ошибка'}</span></div>
          <div className="bs-ai-bar"><div className="bs-ai-bar-fill" style={{width: Math.min(queue/12*100,100)+'%'}}></div></div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TopBar, KpiRow, PatientFeed, ExpertsPanel, AiQueue, useTick });
