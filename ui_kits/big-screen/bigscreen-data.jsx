/* ЕРРЦ Big Screen — data layer
   Республика Узбекистан · 14 регионов · мониторинг ОНМК (AI Stroke)
   Region marker positions use a linear projection of real lon/lat onto a
   1000×620 viewBox, so the constellation is geographically faithful:
     x = (lon - 55.9) / 17.3 * 1000 ;  y = (45.6 - lat) / 8.5 * 620
   The country silhouette behind them is a stylised schematic (see BigMap.jsx). */

window.STATUS_META = {
  critical:  { key:'critical',  label:'Критический',   solid:'#7c3aed', bg:'#f1ebfe', tx:'#5b21b6', rank:0 },
  waiting:   { key:'waiting',   label:'Ожидание',      solid:'#e0a008', bg:'#fdf4dc', tx:'#8a5d00', rank:1 },
  scanning:  { key:'scanning',  label:'Сканирование',  solid:'#1d6fd8', bg:'#e3eefc', tx:'#14529e', rank:2 },
  inwork:    { key:'inwork',    label:'В работе',      solid:'#64748b', bg:'#eef1f5', tx:'#455161', rank:3 },
  ready:     { key:'ready',     label:'Готово',        solid:'#16a34a', bg:'#e2f5e9', tx:'#11703a', rank:4 },
  idle:      { key:'idle',      label:'Нет активных',  solid:'#c9d4e0', bg:'#eef3f9', tx:'#5a6b80', rank:9 },
};

/* 14 регионов — name, short code, marker x/y (in the 1480×815 map space,
   positions matched to the real geography / reference layout), status */
window.REGIONS = [
  { code:'QR', name:'Каракалпакстан',  x:255, y:215, status:'waiting'  },
  { code:'XO', name:'Хорезм',          x:418, y:398, status:'scanning' },
  { code:'NW', name:'Навои',           x:705, y:315, status:'ready'    },
  { code:'BU', name:'Бухара',          x:700, y:520, status:'inwork'   },
  { code:'SA', name:'Самарканд',       x:905, y:560, status:'critical' },
  { code:'QA', name:'Кашкадарья',      x:905, y:648, status:'inwork'   },
  { code:'SU', name:'Сурхандарья',     x:965, y:712, status:'critical' },
  { code:'JI', name:'Джизак',          x:1025, y:522, status:'scanning' },
  { code:'SI', name:'Сырдарья',        x:1088, y:500, status:'idle'     },
  { code:'TO', name:'Ташкентская обл.',x:1132, y:436, status:'ready'    },
  { code:'TK', name:'г. Ташкент',      x:1180, y:452, status:'scanning' },
  { code:'NG', name:'Наманган',        x:1305, y:446, status:'ready'    },
  { code:'AN', name:'Андижан',         x:1388, y:462, status:'waiting'  },
  { code:'FA', name:'Фергана',         x:1308, y:514, status:'scanning' },
];

/* helper: random 14-digit ПИНФЛ-like id, masked for display */
function pinfl(seed) {
  let s = '' + (30000000000000 + seed * 7777271 % 69999999999999);
  return s.slice(0,5) + ' ' + s.slice(5,10) + ' ' + s.slice(10,14);
}
window.pinfl = pinfl;

/* Активная лента пациентов — minAgo = минут назад активирован случай */
window.PATIENTS = [
  { id:'STR-4471', fio:'Юлдашев А. К.',   region:'Самарканд',      status:'critical', minAgo:13.4, study:'КТ-АГ',   aspects:6,  expert:'Орлов С. А.',   pinfl:pinfl(1) },
  { id:'STR-4472', fio:'Каримова Д. М.',  region:'Сурхандарья',    status:'critical', minAgo:11.1, study:'КТ-перф', aspects:5,  expert:'Волкова Е. Н.', pinfl:pinfl(2) },
  { id:'STR-4473', fio:'Рахимов Б. У.',   region:'Каракалпакстан', status:'waiting',  minAgo:2.2,  study:'КТ',      aspects:null, expert:'—',           pinfl:pinfl(3) },
  { id:'STR-4474', fio:'Эргашева Н. Т.',  region:'Андижан',        status:'waiting',  minAgo:4.7,  study:'КТ',      aspects:null, expert:'—',           pinfl:pinfl(4) },
  { id:'STR-4475', fio:'Соколова М. П.',  region:'Хорезм',         status:'scanning', minAgo:6.3,  study:'МРТ DWI', aspects:null, expert:'Орлов С. А.', pinfl:pinfl(5) },
  { id:'STR-4476', fio:'Тошматов Ж. Р.',  region:'Фергана',        status:'scanning', minAgo:3.8,  study:'КТ-АГ',   aspects:8,  expert:'—',            pinfl:pinfl(6) },
  { id:'STR-4477', fio:'Назарова Г. И.',  region:'г. Ташкент',     status:'scanning', minAgo:7.9,  study:'КТ-перф', aspects:7,  expert:'Юсупов Д. А.', pinfl:pinfl(7) },
  { id:'STR-4478', fio:'Ким В. С.',       region:'Бухара',         status:'inwork',   minAgo:9.2,  study:'КТ-АГ',   aspects:7,  expert:'Волкова Е. Н.',pinfl:pinfl(8) },
  { id:'STR-4479', fio:'Усмонов Ш. Б.',   region:'Кашкадарья',     status:'inwork',   minAgo:12.6, study:'МРТ DWI', aspects:6,  expert:'Алиева Л. Х.', pinfl:pinfl(9) },
  { id:'STR-4480', fio:'Хасанов О. М.',   region:'Джизак',         status:'scanning', minAgo:1.4,  study:'КТ',      aspects:null, expert:'—',           pinfl:pinfl(10) },
  { id:'STR-4481', fio:'Маликова З. А.',  region:'Наманган',       status:'ready',    minAgo:18.0, study:'КТ-АГ',   aspects:9,  expert:'Юсупов Д. А.', pinfl:pinfl(11) },
  { id:'STR-4482', fio:'Бердиев Ф. Н.',   region:'Навои',          status:'ready',    minAgo:21.3, study:'КТ',      aspects:10, expert:'Алиева Л. Х.', pinfl:pinfl(12) },
  { id:'STR-4483', fio:'Закирова С. Д.',  region:'Ташкентская обл.',status:'ready',   minAgo:24.7, study:'КТ-АГ',   aspects:8,  expert:'Орлов С. А.',  pinfl:pinfl(13) },
];

/* Панель экспертов — 6 врачей */
window.EXPERTS = [
  { num:'Э-01', name:'Волкова Е. Н.',  state:'busy',    patient:'STR-4472' },
  { num:'Э-02', name:'Орлов С. А.',    state:'reading', patient:'STR-4471' },
  { num:'Э-03', name:'Юсупов Д. А.',   state:'reading', patient:'STR-4477' },
  { num:'Э-04', name:'Алиева Л. Х.',   state:'busy',    patient:'STR-4479' },
  { num:'Э-05', name:'Рустамов И. К.',  state:'free',    patient:null },
  { num:'Э-06', name:'Петрова И. С.',  state:'free',    patient:null },
];
window.EXPERT_STATE = {
  free:    { label:'Свободен', solid:'#16a34a', bg:'#e2f5e9', tx:'#11703a' },
  busy:    { label:'Занят',    solid:'#e0a008', bg:'#fdf4dc', tx:'#8a5d00' },
  reading: { label:'Читает',   solid:'#1d6fd8', bg:'#e3eefc', tx:'#14529e' },
};
