# ТЗ — ЕРРЦ Design System
## Техническое описание обновлений UI

**Дата:** июнь 2026  
**Версия:** 1.0  
**Статус:** 📝 Сбор требований

---

## 1. Главный экран (Landing Page)

### 1.1 Левая навигационная панель (Sidebar)

#### Требования:
- **Позиция:** Фиксированная слева, вся высота экрана
- **Ширина:** ~200–250px (обсудить)
- **Фон:** Navy `--brand-800` (соответствует corporate-blue)
- **Высота:** Full viewport height
- **Z-index:** Поверх контента

#### Кнопки/Элементы в navbar:
1. **Big Screen** (Операционный монитор)
   - Иконка: `activity` или `monitor` (Lucide)
   - Текст: "Большой экран" или "Big Screen"
   - Ссылка: `/ui_kits/big-screen/index.html`
   - Статус: Primary / highlight если активна

2. **Доска Мониторинга ОНМК** (Stroke Monitoring Board)
   - Иконка: `grid` или `layout` (Lucide)
   - Текст: "Мониторинг ОНМК" или "Доска"
   - Ссылка: `/ui_kits/monitoring-board/index.html`
   - Статус: Primary / highlight если активна

3. **Design System** (опционально)
   - Иконка: `palette` (Lucide)
   - Текст: "Design System"
   - Ссылка: На текущий экран / index.html
   - Статус: Primary / highlight если активна

#### Стили кнопок:
- **Не активна:** Navy text `--on-inverse-dim`, no background
- **Hover:** Slight background lift `rgba(255,255,255,.07)`
- **Активна:** Accent border left (3–4px) + highlight background `rgba(29,111,216,.15)`
- **Transition:** ≤120ms ease
- **Padding:** `var(--sp-4)` (16px)
- **Радиус:** `var(--r-sm)` (5px)

#### Лого/Branding в navbar:
- **Позиция:** Top, внутри navbar
- **Элемент:** Logo mark (`logo-mark.svg`) или логотип ЕРРЦ
- **Размер:** ~40px × 40px
- **Padding:** `var(--sp-4)` сверху/снизу

#### Дополнительные элементы (опционально):
- **Footer в navbar:** Версия системы, контакт, copyright
- **Collapse кнопка:** Если нужна возможность свернуть navbar

---

### 1.2 Главный контент (Рядом с navbar)

#### Требования:
- **Позиция:** Справа от navbar
- **Фон:** `--surface-1` (светлый, как сейчас)
- **Padding:** `var(--sp-10)` (40px)
- **Overflow:** Scrollable, если контент длинный
- **Max-width:** не ограничена (используй полную ширину минус navbar)

#### Содержание:
- **Header с логотипом ЕРРЦ** (как сейчас, но может измениться)
- **Intro блок** (описание системы)
- **Preview компонентов** (сетка, как сейчас)
- **Quick start** (CSS классы)

---

## 2. Навигация между экранами

### Требования:
- **Активная кнопка:** Должна быть визуально отмечена (highlight)
- **Текущий экран:** Определяется по текущему URL или маршруту
- **Переходы:** При клике — переход на новый UI-кит (новая страница)
- **Сохранение состояния:** (опционально) Помнить, на каком экране был юзер

---

## 3. Responsive / Адаптивность

### Вопросы:
- **Минимальная ширина:** Сейчас у Big Screen `min-width: 1280px`, у Monitoring Board тоже плотная верстка
  - Навбар слева будет занимать место — нужно ли учитывать это?
  - Может быть, на узких экранах navbar скрывается / коллапсируется?

- **Мобильные экраны:** Нужна ли поддержка мобилок? Или только десктоп (1920×1080)?

---

## 4. Доступность и UX

### Требования:
- **Клавиатурная навигация:** Tab между кнопками navbar, Enter для активации
- **Focus state:** `--focus-ring` (3px `rgba(29,111,216,.30)`)
- **ARIA атрибуты:** `aria-current="page"` на активной кнопке
- **Цветовая контрастность:** Text на navy `--brand-800` должен быть достаточно контрастным

---

## 5. Интеграция с Big Screen и Monitoring Board

### Требования:
- **Navbar НЕ должна блокировать контент:**
  - Big Screen работает на 1920×1080, navbar добавляет высоту/ширину — нужна ли корректировка?
  - Может быть, navbar скрывается внутри Big Screen и Monitoring Board (только на главном экране)?

- **Логика скрытия navbar:**
  - (опционально) На `/ui_kits/big-screen/index.html` navbar не видна (full screen режим)?
  - (опционально) На `/ui_kits/monitoring-board/index.html` navbar не видна?
  - Или navbar всегда видна со ссылками для быстрого переключения?

---

## 6. Структура файлов (предложение)

```
ЕРРЦ/
├── index.html                    # Главный экран + navbar
├── layout.css                    # Новый файл: стили navbar + layout
├── colors_and_type.css           # (не менять)
├── assets/
│   ├── logo.svg
│   └── logo-mark.svg
├── ui_kits/
│   ├── big-screen/
│   │   └── index.html
│   └── monitoring-board/
│       └── index.html
└── ...
```

**Новый файл:**
- `layout.css` — содержит:
  - Navbar стили (`.navbar`, `.navbar-button`, `.navbar-active`)
  - Main content container стили
  - Grid/Flex для navbar + контент

---

## 7. Уточнения (ОДОБРЕНО ✅)

| # | Вопрос | Ответ | Примечание |
|---|--------|-------|-----------|
| 1 | Navbar везде? | **Везде** ✅ | На главном экране, Big Screen, Monitoring Board |
| 2 | Ширина navbar | **200px** ✅ | Фиксированная ширина |
| 3 | Вертикальное расположение | **Сверху** ✅ | Кнопки под логотипом, вверху sidebar |
| 4 | Collapse-функция | **Да** ✅ | Кнопка свернуть navbar (иконка `chevron-left` или `menu`) |
| 5 | Мобильность | **Нет** ✗ | Только десктоп, min-width: 1280px |
| 6 | Стиль активной кнопки | **Left border** ✅ | Только левая border, 3–4px accent blue |
| 7 | Footer в navbar | **Нет** ✗ | Пусто или только пространство |

---

## 8. Детальная спецификация (на основе ответов)

### 8.1 Структура навбара

```
┌─────────────────┐
│   LOGO MARK     │  ← 40px × 40px, margin: var(--sp-4)
├─────────────────┤
│                 │
│  [BIG SCREEN]   │  ← Кнопка 1, сверху
│                 │
│  [MONITORING]   │  ← Кнопка 2
│                 │
├─────────────────┤
│                 │  ← Пустое пространство (flex-grow)
├─────────────────┤
│  [⌄ COLLAPSE]   │  ← Кнопка collapse (внизу)
└─────────────────┘
```

### 8.2 Размеры и отступы

| Элемент | Значение | Замечание |
|---------|----------|-----------|
| Ширина navbar | 200px | Fixed |
| Высота navbar | 100vh | Full viewport |
| Padding navbar | var(--sp-4) | 16px со всех сторон |
| Logo size | 40px × 40px | Centered |
| Button padding | var(--sp-4) | 16px |
| Button height | ~48px | min-height |
| Gap между кнопками | var(--sp-3) | 12px |
| Left border активной | 4px | `--brand-500` (#1D6FD8) |

### 8.3 Navbar Button (CSS class: `.navbar-button`)

**Состояния:**

1. **Не активна (default)**
   ```css
   background: transparent;
   color: var(--on-inverse-dim);
   border-left: 4px solid transparent;
   padding-left: calc(var(--sp-4) - 4px); /* чтобы контент не прыгал */
   ```

2. **Hover**
   ```css
   background: rgba(255, 255, 255, 0.07);
   color: var(--on-inverse);
   border-left: 4px solid transparent;
   ```

3. **Активна (с класом `.navbar-button.active`)**
   ```css
   background: rgba(29, 111, 216, 0.15);
   color: var(--on-inverse);
   border-left: 4px solid var(--brand-500); /* solid accent border */
   ```

4. **Focus (keyboard)**
   ```css
   outline: var(--focus-ring);
   outline-offset: -3px;
   ```

### 8.4 Collapse кнопка (внизу navbar)

- **Иконка:** `chevron-left` (Lucide, 16px)
- **Текст:** "Свернуть" или просто иконка
- **На клик:** Navbar сжимается на какое-то значение (опционально, обсудить ширину)
- **Состояние:** Сохраняется в localStorage (опционально)

### 8.5 Main content (справа от navbar)

```css
margin-left: 200px; /* ширина navbar */
padding: var(--sp-10); /* 40px */
background: var(--surface-1);
min-height: 100vh;
overflow-y: auto;
```

### 8.6 Навигация между экранами (JavaScript логика)

**Определение текущей страницы:**
```javascript
const currentPath = window.location.pathname;
const isMainPage = currentPath === '/' || currentPath.includes('index.html');
const isBigScreen = currentPath.includes('big-screen');
const isMonitoring = currentPath.includes('monitoring-board');

// Добавить класс active к нужной кнопке
```

**Кнопка Big Screen:**
- URL: `/ui_kits/big-screen/index.html`
- Active если: `isBigScreen === true`

**Кнопка Monitoring Board:**
- URL: `/ui_kits/monitoring-board/index.html`
- Active если: `isMonitoring === true`

---

## 9. Задачи разработки (Breakdown)

### Phase 1.1.1 — Создать layout.css

- [ ] Создать файл `layout.css`
- [ ] Написать стили для `.navbar` (200px, navy фон, flexbox column)
- [ ] Написать стили для `.navbar-button` (все состояния)
- [ ] Написать стили для `.navbar-button.active` (left border + hover)
- [ ] Написать стили для main content (`margin-left: 200px`, padding)
- [ ] Импортировать в `index.html` перед другими стилями

### Phase 1.1.2 — Обновить index.html

- [ ] Обернуть существующий контент в `<div class="main-content">`
- [ ] Добавить navbar сверху / сбоку (HTML структура)
- [ ] Logo mark в navbar
- [ ] Две кнопки (Big Screen, Monitoring Board)
- [ ] Collapse кнопка внизу
- [ ] Импортировать `layout.css`

### Phase 1.1.3 — JavaScript для активной кнопки

- [ ] Написать скрипт, определяющий текущую страницу
- [ ] Добавить класс `.active` к активной кнопке при загрузке
- [ ] Обновить класс `.active` при переходе между страницами (или просто reload)

### Phase 1.1.4 — Collapse функция (опционально)

- [ ] Кнопка collapse внизу navbar
- [ ] На клик: navbar сжимается (какая ширина? обсудить)
- [ ] Иконка меняется на `chevron-right`
- [ ] localStorage сохранение состояния

### Phase 1.1.5 — Обновить Big Screen и Monitoring Board

- [ ] Добавить navbar в `ui_kits/big-screen/index.html`
- [ ] Добавить navbar в `ui_kits/monitoring-board/index.html`
- [ ] Убедиться, что navbar не блокирует контент
- [ ] Проверить responsive поведение (navbar + UI-кит должны умещаться на 1920×1080)

---

## 10. Фаза 2+ (будущие обновления)

*Заполнится позже, когда закончим фазу 1*

- Новые компоненты
- Интеграция с реальными данными
- Новые экраны
- ...

---

## Статус разработки

| Задача | Статус | Дата |
|--------|--------|------|
| 1.1 Левая navbar + кнопки | ✅ ТЗ одобрена | TBD |
| 1.1.1 Создать layout.css | ⏳ Ожидание | TBD |
| 1.1.2 Обновить index.html | ⏳ Ожидание | TBD |
| 1.1.3 JavaScript активная кнопка | ⏳ Ожидание | TBD |
| 1.1.4 Collapse функция | ⏳ Ожидание | TBD |
| 1.1.5 Обновить UI-киты | ⏳ Ожидание | TBD |

