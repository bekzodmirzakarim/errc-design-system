/* ЕРРЦ Big Screen — app shell + 5s refresh simulation */
const { useState: useA, useEffect: useAE, useRef: useAR } = React;

function BigScreen() {
  const [regions, setRegions] = useA(REGIONS);
  const [patients] = useA(PATIENTS);
  const [engineOnline] = useA(true);
  const [queue, setQueue] = useA(7);
  const [avgProc, setAvgProc] = useA(42);
  const [doneToday, setDoneToday] = useA(118);
  const [avgD2P, setAvgD2P] = useA(27);
  const [alert, setAlert] = useA(null);          // {code, name}
  const alertTimer = useAR(null);
  const appRef = useAR(null);

  // Scale the fixed 1920×1080 canvas to fit the viewport — runs AFTER mount,
  // so timing is reliable regardless of when Babel/React finish.
  useAE(() => {
    function scale() {
      const app = appRef.current;
      if (!app) return;
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      app.style.transform = 'scale(' + s + ')';
    }
    scale();
    window.addEventListener('resize', scale);
    const id = setInterval(scale, 500); // catch late layout / zoom changes
    return () => { window.removeEventListener('resize', scale); clearInterval(id); };
  }, []);

  // Block: автообновление данных каждые 5 секунд (имитация)
  useAE(() => {
    const id = setInterval(() => {
      // queue drift
      setQueue(q => Math.max(2, Math.min(14, q + (Math.random()<0.5?-1:1)*Math.ceil(Math.random()*2))));
      setAvgProc(a => Math.max(31, Math.min(58, a + Math.round((Math.random()-0.5)*6))));
      setDoneToday(d => d + (Math.random()<0.35 ? 1 : 0));
      setAvgD2P(v => Math.max(22, Math.min(34, v + Math.round((Math.random()-0.5)*2))));

      // occasionally a region escalates to critical -> alert banner (7s)
      if (Math.random() < 0.28) {
        setRegions(prev => {
          const candidates = prev.filter(r => r.status!=='critical' && r.status!=='idle');
          if (!candidates.length) return prev;
          const pick = candidates[Math.floor(Math.random()*candidates.length)];
          fireAlert(pick);
          return prev.map(r => r.code===pick.code ? { ...r, status:'critical' } : r);
        });
      }
    }, 5000);
    return () => clearInterval(id);
  }, []);

  function fireAlert(region) {
    setAlert({ code: region.code, name: region.name });
    clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setAlert(null), 7000);
  }

  return (
    <div className="bs-app" ref={appRef}>
      <TopBar engineOnline={engineOnline} />
      <KpiRow patients={patients} regions={regions} doneToday={doneToday} avgD2P={avgD2P} />
      <main className="bs-grid">
        <div className="bs-col-left">
          <RegionMap regions={regions} alertCode={alert?.code} />
          <ExpertsPanel experts={EXPERTS} />
        </div>
        <div className="bs-col-right">
          <PatientFeed patients={patients} />
          <AiQueue queue={queue} engineOnline={engineOnline} avgProc={avgProc} />
        </div>
      </main>

      {alert && (
        <div className="bs-alert-banner" key={alert.code+Date.now()}>
          <Icon name="alert" size={22} color="#fff" />
          <div className="bs-alert-text">
            <b>Критический пациент</b>
            <span>Регион: {alert.name} · требуется немедленное распределение эксперту</span>
          </div>
          <span className="bs-alert-pulse"></span>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BigScreen />);
