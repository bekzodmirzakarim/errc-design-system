/* ЕРРЦ monitoring board — app shell */
const { useState: useS } = React;

// critical patients still sit in their real workflow column
const COLUMN_OVERRIDE = { 'PT-2024-0917':'inwork', 'PT-2024-0922':'scanning' };
function withColumns(list) {
  return list.map(p => ({ ...p, columnStatus: COLUMN_OVERRIDE[p.id] || (p.status === 'critical' ? 'waiting' : p.status) }));
}

function App() {
  const [filter, setFilter] = useS(null);
  const [activeId, setActiveId] = useS(null);
  const all = withColumns(PATIENTS);
  const visible = filter ? all.filter(p => p.status === filter) : all;
  const active = all.find(p => p.id === activeId) || null;

  return (
    <div className="errc-app">
      <Header />
      <StatsBar patients={all} filter={filter} setFilter={setFilter} />
      <main className="errc-board">
        {COLUMN_ORDER.map(col => (
          <StatusColumn key={col} statusKey={col} patients={visible}
            onOpen={p => setActiveId(p.id)} activeId={activeId} />
        ))}
      </main>
      <PatientDetail p={active} onClose={() => setActiveId(null)} />
      <footer className="errc-footer">
        <span>ЕРРЦ · Единый республиканский ридинг-центр</span>
        <span className="errc-footer-mid">Смена: 08:00–20:00 · Дежурный радиолог: Волкова Е. Н.</span>
        <span>v2.4 · защищённый канал</span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
