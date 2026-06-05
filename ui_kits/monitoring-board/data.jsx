/* Mock patient data for the ЕРРЦ stroke monitoring board.
   Times are stored as a baseline epoch offset so timers tick live. */
window.STATUS_META = {
  critical:  { key:'critical',  label:'Критический',   solid:'var(--st-critical)',  bg:'var(--st-critical-bg)',  tx:'var(--st-critical-tx)' },
  waiting:   { key:'waiting',   label:'Ожидание',      solid:'var(--st-waiting)',   bg:'var(--st-waiting-bg)',   tx:'var(--st-waiting-tx)' },
  scanning:  { key:'scanning',  label:'Сканирование',  solid:'var(--st-scanning)',  bg:'var(--st-scanning-bg)',  tx:'var(--st-scanning-tx)' },
  inwork:    { key:'inwork',    label:'В работе',      solid:'var(--st-inwork)',    bg:'var(--st-inwork-bg)',    tx:'var(--st-inwork-tx)' },
  ready:     { key:'ready',     label:'Готово',        solid:'var(--st-ready)',     bg:'var(--st-ready-bg)',     tx:'var(--st-ready-tx)' },
};
window.COLUMN_ORDER = ['waiting','scanning','inwork','ready'];

// minutes ago the door-to-needle clock started
window.PATIENTS = [
  { id:'PT-2024-0917', name:'Смирнов А. В.',   sex:'М', age:67, status:'critical', modality:'КТ-АГ',   nihss:14, since:42, window:18, bp:'168/94', spo2:97, hr:88,  dept:'СтОСМП-1', complaint:'Левосторонний гемипарез, афазия. ОНМК по ишемическому типу.', radiologist:'Волкова Е. Н.' },
  { id:'PT-2024-0918', name:'Петрова И. С.',   sex:'Ж', age:54, status:'scanning', modality:'МРТ DWI', nihss:6,  since:9,  window:144, bp:'142/88', spo2:99, hr:76, dept:'СтОСМП-2', complaint:'Преходящая слабость в правой руке, дизартрия.', radiologist:'—' },
  { id:'PT-2024-0919', name:'Кузнецов Д. М.',  sex:'М', age:73, status:'waiting',  modality:'КТ',      nihss:9,  since:4,  window:96,  bp:'176/101',spo2:96, hr:92, dept:'Приёмное', complaint:'Внезапная головная боль, рвота. Исключить геморрагию.', radiologist:'—' },
  { id:'PT-2024-0920', name:'Соколова М. П.',  sex:'Ж', age:61, status:'inwork',   modality:'КТ-АГ',   nihss:11, since:27, window:42,  bp:'158/90', spo2:98, hr:81, dept:'СтОСМП-1', complaint:'Окклюзия M1 сегмента СМА слева. Кандидат на тромбэкстракцию.', radiologist:'Орлов С. А.' },
  { id:'PT-2024-0921', name:'Васильев Р. К.',  sex:'М', age:58, status:'ready',    modality:'КТ',      nihss:3,  since:61, window:0,   bp:'134/82', spo2:99, hr:70, dept:'Неврология', complaint:'Лакунарный инфаркт. Заключение готово, передано неврологу.', radiologist:'Волкова Е. Н.' },
  { id:'PT-2024-0922', name:'Морозова Л. Д.',  sex:'Ж', age:79, status:'critical', modality:'КТ-перф', nihss:18, since:51, window:9,   bp:'182/98', spo2:94, hr:101,dept:'РАО',      complaint:'Обширный инфаркт в бассейне ВСА. Снижение SpO₂.', radiologist:'Орлов С. А.' },
  { id:'PT-2024-0923', name:'Зайцев П. И.',    sex:'М', age:65, status:'waiting',  modality:'МРТ',     nihss:5,  since:2,  window:160, bp:'150/85', spo2:98, hr:74, dept:'Приёмное', complaint:'Транзиторная ишемическая атака в анамнезе, контроль.', radiologist:'—' },
  { id:'PT-2024-0924', name:'Новикова Т. А.',  sex:'Ж', age:70, status:'scanning', modality:'КТ-АГ',   nihss:12, since:14, window:33,  bp:'164/92', spo2:97, hr:85, dept:'СтОСМП-2', complaint:'Правосторонняя гемигипестезия, гемианопсия.', radiologist:'—' },
  { id:'PT-2024-0925', name:'Фёдоров А. Е.',   sex:'М', age:48, status:'inwork',   modality:'МРТ DWI', nihss:7,  since:19, window:71,  bp:'138/86', spo2:99, hr:72, dept:'Неврология', complaint:'Стволовой синдром, головокружение. Уточнение очага.', radiologist:'Волкова Е. Н.' },
  { id:'PT-2024-0926', name:'Григорьева О. В.',sex:'Ж', age:66, status:'ready',    modality:'КТ-АГ',   nihss:8,  since:88, window:0,   bp:'146/89', spo2:98, hr:78, dept:'РСЦ',      complaint:'Стеноз ВСА 70%. Заключение и рекомендации сформированы.', radiologist:'Орлов С. А.' },
];
