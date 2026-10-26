const IMG = '/assets/img/placeholders';

const site = {
  name: 'Ваш бренд',
  legalName: 'Ваша компания',
  domain: 'https://example.com',
  url: 'https://example.com/',
  city: 'Ваш город',
  district: 'Ваш район',
  address: 'Ваш город, ул. Примерная, 1',
  addressShort: 'ул. Примерная, 1',
  entrance: 'опишите вход и ориентиры',
  floor: '1 этаж',
  parking: 'опишите условия парковки',
  coords: '37.6173,55.7558',
  mapUrl: 'https://yandex.ru/maps/?ll=37.6173%2C55.7558&z=17',
  phone: '+7 (499) 495-49-05',
  phoneHref: '+74994954905',
  phones: [
    { label: 'Очаково', value: '+7 (499) 495-49-05', href: '+74994954905' },
    { label: 'Чертаново', value: '+7 (499) 460-59-58', href: '+74994605958' },
  ],
  email: 'info@lafemme-med.ru',
  whatsapp: 'https://wa.me/79990000000',
  telegram: 'https://t.me/yourbrand',
  hours: 'Ежедневно с 9:00 до 20:00',
  hoursShort: 'Пн–Вс 9:00–20:00',
  noDaysOff: true,
  since: '2015',
  clientsDone: '1 200',
  rating: '4,9',
  reviewsCount: '96',
  priceRange: 'от 1 000 ₽',
};

const nav = [
  {
    href: '#services',
    label: 'Услуги',
    children: [
      { href: '#services', label: 'Запись к гинекологу' },
      { href: '#services', label: 'Анализы и лабораторные исследования' },
      { href: '#services', label: 'Ведение беременности' },
      { href: '#services', label: 'Обменная карта' },
      {
        href: '#services',
        label: 'Прерывание беременности (аборт)',
        children: [
          { href: '#services', label: 'Медикаментозный аборт' },
          { href: '#services', label: 'Вакуумный аборт' },
          { href: '#services', label: 'Хирургический аборт' },
        ],
      },
      {
        href: '#services',
        label: 'Интимная пластика',
        children: [
          { href: '#services', label: 'Контурная интимная пластика' },
          { href: '#services', label: 'Увеличение точки G' },
          { href: '/pages/services/labioplastica.html', label: 'Лабиопластика' },
          { href: '#services', label: 'Пластика задней стенки влагалища' },
          { href: '#services', label: 'Плазмолифтинг в гинекологии' },
        ],
      },
      { href: '#services', label: 'Интимное омоложение' },
      { href: '#services', label: 'Лечение недержания мочи лазером CO2' },
      { href: '#services', label: 'Лазерное интимное отбеливание' },
      { href: '#services', label: 'Лечение бартолиновой железы' },
      { href: '#services', label: 'Лазерная эпиляция' },
      {
        href: '#services',
        label: 'УЗИ',
        children: [
          { href: '#services', label: 'УЗИ молочных желез' },
          { href: '#services', label: 'УЗИ органов брюшной полости' },
          { href: '#services', label: 'УЗИ по беременности' },
          { href: '#services', label: 'УЗИ почек' },
          { href: '#services', label: 'УЗИ органов малого таза' },
        ],
      },
      { href: '#services', label: 'Гидросонография' },
      { href: '#services', label: 'Кардиотокография (КТГ)' },
      { href: '#services', label: 'Купить Ворд-катетер' },
    ],
  },
  { href: '#services', label: 'Цены', static: true },
  { href: '#team', label: 'Врачи' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#special', label: 'Акции' },
  { href: '#benefits', label: 'О клинике' },
  { href: '#faq', label: 'Статьи' },
  { href: '#contacts', label: 'Контакты' },
];

const hero = {
  eyebrow: 'Коротко о вашем предложении',
  title: 'Заголовок первого экрана с главной выгодой',
  subtitle:
    'Опишите, что вы делаете, для кого и почему к вам стоит обратиться. Достаточно одного-двух предложений.',
  primaryCta: { label: 'Оставить заявку', href: '#booking' },
  secondaryCta: { label: 'Смотреть услуги', href: '#services' },
  compare: {
    before: `${IMG}/case-1-before.svg`,
    after: `${IMG}/case-1-after.svg`,
    beforeLabel: 'До',
    afterLabel: 'После',
    title: 'Пример работы',
    note: 'Короткое описание кейса',
    alt: 'Пример работы до и после',
  },
  facts: [
    {
      icon: 'fa-solid fa-star',
      value: '4,9',
      label: 'средняя оценка',
      accent: true,
    },
    { icon: 'fa-solid fa-comment-dots', value: '96', label: 'отзывов' },
    { icon: 'fa-solid fa-award', value: 'с 2015', label: 'на рынке' },
    {
      icon: 'fa-solid fa-location-dot',
      value: 'Ваш город',
      label: 'удобное расположение',
    },
  ],
  points: [
    'Первый пункт с ключевой выгодой',
    'Второй пункт — про процесс или результат',
    'Третий пункт — про гарантии или условия',
  ],
};

const trust = [
  {
    icon: 'fa-solid fa-user-check',
    title: 'Опытная команда',
    text: 'Коротко расскажите об экспертизе и опыте специалистов.',
  },
  {
    icon: 'fa-solid fa-list-check',
    title: 'Прозрачный процесс',
    text: 'Опишите, как строится работа и на каком этапе вы подключаете клиента.',
  },
  {
    icon: 'fa-solid fa-file-contract',
    title: 'Работаем по договору',
    text: 'Зафиксируйте условия, сроки и ответственность сторон.',
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Поддержка',
    text: 'Расскажите, как и в какие сроки отвечаете на вопросы.',
  },
  {
    icon: 'fa-solid fa-sliders',
    title: 'Гибкие условия',
    text: 'Подчеркните, что подстраиваете решение под задачу клиента.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Гарантия качества',
    text: 'Опишите гарантии и что происходит, если результат не устроил.',
  },
];

const tiers = [
  { label: 'Базовый', short: 'Базовый' },
  { label: 'Стандарт', short: 'Стандарт' },
  { label: 'Премиум', short: 'Премиум' },
];

const services = [
  {
    id: 'consultation',
    icon: 'fa-solid fa-comments',
    title: 'Консультация',
    text: 'Коротко опишите, что входит в услугу и какой результат получает клиент.',
    price: 1000,
    prices: [1000, 1500, 2000],
    duration: '30–60 мин',
    popular: true,
  },
  {
    id: 'basic',
    icon: 'fa-solid fa-layer-group',
    title: 'Базовый пакет',
    text: 'Перечислите состав пакета и основную ценность для клиента.',
    price: 2000,
    prices: [2000, 3000, 4500],
    duration: '1–2 дня',
  },
  {
    id: 'extended',
    icon: 'fa-solid fa-gem',
    title: 'Расширенный пакет',
    text: 'Опишите, чем этот вариант отличается от базового и кому он подойдёт.',
    price: 3500,
    prices: [3500, 5000, 7000],
    duration: '3–5 дней',
    popular: true,
  },
  {
    id: 'custom',
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Индивидуальный проект',
    text: 'Расскажите про гибкие условия, персональный подход и оценку задачи.',
    price: 5000,
    prices: [5000, 8000, 12000],
    duration: 'по задаче',
  },
];

const serviceNote =
  'Цены указаны для примера. Итоговую стоимость специалист называет после обсуждения задачи и объёма работ.';

const benefits = [
  {
    icon: 'fa-solid fa-user-tie',
    title: 'Профильные специалисты',
    text: 'Опишите, кто будет работать над задачей и почему его опыта достаточно.',
  },
  {
    icon: 'fa-solid fa-route',
    title: 'Понятный план',
    text: 'Расскажите, как клиент видит прогресс и какие этапы его ждут.',
  },
  {
    icon: 'fa-solid fa-message',
    title: 'Связь без задержек',
    text: 'Укажите, как быстро отвечаете и в каком канале удобнее общаться.',
  },
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Работа на результат',
    text: 'Сформулируйте, по каким критериям оценивается результат.',
  },
  {
    icon: 'fa-solid fa-lock',
    title: 'Конфиденциальность',
    text: 'Коротко опишите, как обращаетесь с данными и материалами клиента.',
  },
  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Удобная запись',
    text: 'Опишите, как оставить заявку и получить подтверждение.',
  },
];

const process = [
  {
    icon: 'fa-solid fa-calendar-plus',
    title: 'Заявка',
    text: 'Клиент оставляет заявку на сайте, по телефону или в мессенджере.',
    meta: '2 минуты',
  },
  {
    icon: 'fa-solid fa-comments',
    title: 'Знакомство',
    text: 'Уточняете задачу, сроки, бюджет и ожидаемый результат.',
    meta: '15 минут',
  },
  {
    icon: 'fa-solid fa-file-lines',
    title: 'Согласование',
    text: 'Фиксируете состав работ, стоимость и сроки в договоре или брифе.',
    meta: '1 день',
  },
  {
    icon: 'fa-solid fa-gears',
    title: 'Работа',
    text: 'Выполняете проект и показываете промежуточные результаты.',
    meta: 'по плану',
  },
  {
    icon: 'fa-solid fa-circle-check',
    title: 'Сдача',
    text: 'Передаёте результат, проводите проверку и вносите правки.',
    meta: '1–2 дня',
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Поддержка',
    text: 'Остаётесь на связи после завершения проекта.',
    meta: 'по договору',
  },
];

const team = [
  {
    photo: `${IMG}/team-1.svg`,
    name: 'Анна Иванова',
    role: 'Руководитель проекта',
    experience: 'опыт 8 лет',
    spec: ['Стратегия', 'Запуск проектов'],
    method: 'Планирование и сопровождение проекта от идеи до результата.',
    cert: 'Профильное образование, 2018',
    alt: 'Анна Иванова, руководитель проекта',
  },
  {
    photo: `${IMG}/team-2.svg`,
    name: 'Мария Петрова',
    role: 'Ведущий специалист',
    experience: 'опыт 6 лет',
    spec: ['Консультации', 'Аналитика'],
    method: 'Помогает сформулировать задачу и выбрать подходящее решение.',
    cert: 'Профильное образование, 2020',
    alt: 'Мария Петрова, ведущий специалист',
  },
  {
    photo: `${IMG}/team-3.svg`,
    name: 'Дмитрий Соколов',
    role: 'Технический специалист',
    experience: 'опыт 10 лет',
    spec: ['Реализация', 'Контроль качества'],
    method: 'Отвечает за техническую часть и проверку результата.',
    cert: 'Сертификат по специальности, 2019',
    alt: 'Дмитрий Соколов, технический специалист',
  },
  {
    photo: `${IMG}/team-4.svg`,
    name: 'Елена Смирнова',
    role: 'Координатор',
    experience: 'опыт 5 лет',
    spec: ['Поддержка', 'Документы'],
    method: 'Следит за сроками, коммуникацией и оформлением.',
    cert: 'Профильное образование, 2021',
    alt: 'Елена Смирнова, координатор',
  },
];

const teamNote =
  'Замените имена, роли и описания на реальные данные команды. Фотографии можно заменить в public/assets/img.';

const caseFilters = [
  { id: 'all', label: 'Все работы' },
  { id: 'design', label: 'Дизайн' },
  { id: 'development', label: 'Вёрстка' },
  { id: 'support', label: 'Поддержка' },
];

const cases = [
  {
    slug: '1',
    title: 'Проект 1',
    task: 'Короткое описание задачи',
    filters: ['design'],
    scope: '5 страниц',
    duration: '2 недели',
    specialist: 'Анна И.',
    price: 'от 30 000 ₽',
  },
  {
    slug: '2',
    title: 'Проект 2',
    task: 'Короткое описание задачи',
    filters: ['development'],
    scope: '10 страниц',
    duration: '3 недели',
    specialist: 'Дмитрий С.',
    price: 'от 50 000 ₽',
  },
  {
    slug: '3',
    title: 'Проект 3',
    task: 'Короткое описание задачи',
    filters: ['support'],
    scope: '1 сайт',
    duration: '1 месяц',
    specialist: 'Елена С.',
    price: 'от 20 000 ₽',
  },
  {
    slug: '4',
    title: 'Проект 4',
    task: 'Короткое описание задачи',
    filters: ['design', 'development'],
    scope: '7 страниц',
    duration: '4 недели',
    specialist: 'Мария П.',
    price: 'от 70 000 ₽',
  },
];

const portfolioNote =
  'Замените примеры работ и метаданные на реальные кейсы. Изображения до и после лежат в public/assets/img/placeholders.';

const reviews = [
  {
    owner: 'Анна К.',
    client: 'Проект «Пример»',
    clientPhoto: `${IMG}/review-client-1.svg`,
    ownerPhoto: `${IMG}/review-owner-1.svg`,
    date: '12.04.2026',
    dateISO: '2026-04-12',
    source: 'site',
    sourceLabel: 'Сайт',
    rating: 5,
    text: 'Короткий отзыв клиента: что понравилось, как проходила работа и какой результат получился. Замените текст на реальный.',
  },
  {
    owner: 'Алексей Р.',
    client: 'Проект «Пример»',
    clientPhoto: `${IMG}/review-client-2.svg`,
    ownerPhoto: `${IMG}/review-owner-2.svg`,
    date: '28.03.2026',
    dateISO: '2026-03-28',
    source: 'maps',
    sourceLabel: 'Карты',
    rating: 5,
    text: 'Второй отзыв для демонстрации сетки. Добавьте сюда реальную обратную связь и оценку.',
  },
  {
    owner: 'Елена В.',
    client: 'Проект «Пример»',
    clientPhoto: `${IMG}/review-client-3.svg`,
    ownerPhoto: `${IMG}/review-owner-3.svg`,
    date: '05.03.2026',
    dateISO: '2026-03-05',
    source: 'site',
    sourceLabel: 'Сайт',
    rating: 5,
    text: 'Третий отзыв. Можно оставить четыре или шесть карточек — сетка подстроится автоматически.',
  },
  {
    owner: 'Дмитрий Ш.',
    client: 'Проект «Пример»',
    clientPhoto: `${IMG}/review-client-4.svg`,
    ownerPhoto: `${IMG}/review-owner-4.svg`,
    date: '19.02.2026',
    dateISO: '2026-02-19',
    source: 'maps',
    sourceLabel: 'Карты',
    rating: 4,
    text: 'Четвёртый отзыв с оценкой 4 звезды — удобно проверить, как выглядит разное количество звёзд.',
  },
];

const special = [
  {
    img: `${IMG}/special-1.svg`,
    icon: 'fa-solid fa-tag',
    title: 'Новым клиентам',
    text: 'Опишите стартовое предложение: скидку, бесплатную консультацию или другой бонус для первого обращения.',
    chips: ['Первый заказ', 'Понятные условия', 'Без скрытых платежей'],
  },
  {
    img: `${IMG}/special-2.svg`,
    icon: 'fa-solid fa-boxes-stacked',
    title: 'Комплексные задачи',
    text: 'Расскажите, какие услуги можно объединить в пакет и какую выгоду получает клиент.',
    chips: ['Один подрядчик', 'Общий срок', 'Выгодная цена'],
  },
  {
    img: `${IMG}/special-3.svg`,
    icon: 'fa-solid fa-bolt',
    title: 'Срочные проекты',
    text: 'Опишите, какие задачи берёте в короткий срок и как рассчитывается стоимость срочности.',
    chips: ['Быстрый старт', 'Приоритет', 'Прозрачная доплата'],
  },
  {
    img: `${IMG}/special-4.svg`,
    icon: 'fa-solid fa-user-gear',
    title: 'Индивидуальный подход',
    text: 'Подчеркните, что решение собирается под задачу, а не берётся из готового шаблона.',
    chips: ['Под задачу', 'Гибкий состав', 'Персональный план'],
  },
  {
    img: `${IMG}/special-5.svg`,
    icon: 'fa-solid fa-shield-heart',
    title: 'Гарантия результата',
    text: 'Опишите, что входит в гарантию и как действуете, если клиента что-то не устроило.',
    chips: ['Фиксация условий', 'Правки', 'Поддержка'],
  },
];

const specialNote =
  'Этот блок можно использовать для акций, пакетов или особых условий. Замените тексты и изображения на свои.';

const contacts = {
  cta: {
    title: 'Приезжайте или свяжитесь удобным способом',
    text: 'Опишите задачу по телефону, в мессенджере или через форму — специалист уточнит детали и предложит решение.',
    button: 'Оставить заявку',
  },
  cards: [
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Адрес',
      value: 'Ваш город, ул. Примерная, 1',
      note: 'Ориентир и как найти вход',
    },
    {
      icon: 'fa-solid fa-door-open',
      title: 'Вход',
      value: '1 этаж, вход со двора',
      note: 'Домофон и другие детали',
    },
    {
      icon: 'fa-solid fa-square-parking',
      title: 'Парковка',
      value: 'Бесплатная парковка',
      note: 'Условия и количество мест',
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Часы работы',
      value: 'Ежедневно 10:00–20:00',
      note: 'Работаем без выходных',
    },
  ],
  routes: [
    'На машине: опишите маршрут и ориентиры.',
    'На общественном транспорте: ближайшая остановка или станция.',
    'Пешком: опишите путь от ориентира.',
  ],
  payments: ['Карта', 'Наличные', 'СБП', 'Безналичный расчёт'],
};

const faq = [
  {
    q: 'Как оставить заявку?',
    a: 'Заполните форму на сайте, позвоните или напишите в мессенджер. Специалист свяжется с вами, уточнит задачу и предложит следующий шаг.',
  },
  {
    q: 'Сколько стоит работа?',
    a: 'Стоимость зависит от задачи и объёма. В блоке услуг указаны ориентиры, а точную цену специалист называет после обсуждения деталей.',
  },
  {
    q: 'Сколько времени занимает проект?',
    a: 'Срок зависит от состава работ. После согласования задачи вы получите план с этапами и датами.',
  },
  {
    q: 'Можно ли обсудить задачу онлайн?',
    a: 'Да. Созвонитесь или напишите в удобный мессенджер — формат работы можно выбрать на первом созвоне.',
  },
  {
    q: 'Какие гарантии вы даёте?',
    a: 'Условия и ответственность фиксируются в договоре. Если результат не соответствует согласованному ТЗ, правки обсуждаются отдельно.',
  },
  {
    q: 'Как происходит оплата?',
    a: 'Порядок оплаты зависит от формата работы. Обычно это предоплата за старт и оплата остатка после сдачи этапа или проекта.',
  },
];

const booking = {
  eyebrow: 'Свободные слоты на этой неделе',
  title: 'Оставьте заявку',
  text: 'Перезвоним в течение рабочего дня, уточним детали и предложим удобное время.',
  consent: 'Согласен на обработку персональных данных и получение ответа по заявке.',
  success: {
    title: 'Заявка принята!',
    text: 'Перезвоним в течение рабочего дня и подтвердим детали. Если срочно — позвоните нам напрямую.',
  },
  action: '#',
  timeOptions: [
    'Не важно — подберём свободное время',
    'Утро 10:00–12:00',
    'День 12:00–16:00',
    'Вечер 16:00–20:00',
  ],
  serviceOptions: [
    'Не выбрано — нужна консультация',
    'Консультация',
    'Базовый пакет',
    'Расширенный пакет',
    'Индивидуальный проект',
  ],
  perks: [
    { icon: 'fa-solid fa-clock', text: 'Ответим в течение рабочего дня' },
    { icon: 'fa-solid fa-calendar-check', text: 'Подберём удобное время' },
    { icon: 'fa-solid fa-user-check', text: 'Подключим профильного специалиста' },
    { icon: 'fa-solid fa-file-lines', text: 'Согласуем состав работ и сроки' },
    { icon: 'fa-solid fa-shield-halved', text: 'Работаем по договору' },
  ],
};

const footer = {
  license: 'Лицензия № ЛО-77-01-011503',
  licenseUrl: 'https://lafemme-med.ru/o-klinike/#menu_sertificate',
  columns: [
    {
      title: 'Услуги',
      links: [
        { href: '#services', label: 'Контурная интимная пластика' },
        { href: '/pages/services/labioplastica.html', label: 'Лабиопластика' },
        { href: '#services', label: 'Прерывание беременности (аборт)' },
        { href: '#services', label: 'Интимное омоложение' },
        { href: '#services', label: 'Лечение недержания мочи лазером CO2' },
        { href: '#services', label: 'Лечение бартолиновой железы' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { href: '#reviews', label: 'Отзывы' },
        { href: '#contacts', label: 'Контакты' },
        { href: '#benefits', label: 'О клинике' },
        { href: '#faq', label: 'Статьи' },
        { href: 'https://lafemme-med.ru/terms', label: 'Политика конфиденциальности', external: true },
        { href: 'https://lafemme-med.ru/legacy', label: 'Политика обработки персональных данных', external: true },
      ],
    },
  ],
  clinics: [
    {
      name: 'Очаково',
      metro: 'м. Озерная',
      phone: '+7 (499) 495-49-05',
      phoneHref: '+74994954905',
      address: 'г. Москва, ул. Б. Очаковская, д. 30',
    },
    {
      name: 'Чертаново',
      metro: 'м. Пражская',
      phone: '+7 (499) 460-59-58',
      phoneHref: '+74994605958',
      address: 'г. Москва, ул. Чертановская, д. 43, кор. 5',
    },
  ],
  socials: [
    { label: 'ВКонтакте', href: 'https://vk.com/id367971452', icon: 'fa-brands fa-vk' },
  ],
  legalEntities: [
    { name: 'ООО «Кристалл»', inn: '7734426814', ogrn: '1197746403942' },
    { name: 'ООО «Ля Фамм, Женская Консультация»', inn: '7729468625', ogrn: '1157746679243' },
  ],
  copyright: 'Copyright © 2015–2026 «La Femme».',
  disclaimer: 'Имеются противопоказания, проконсультируйтесь с врачом.',
};

export default {
  site,
  nav,
  hero,
  trust,
  tiers,
  services,
  serviceNote,
  benefits,
  process,
  team,
  teamNote,
  caseFilters,
  cases,
  portfolioNote,
  reviews,
  special,
  specialNote,
  contacts,
  faq,
  booking,
  footer,
};
