import type { SubjectInfo, Program } from '../types/onboarding';

export const CITIES_LIST = [
  'Все города',
  'Москва',
  'Санкт-Петербург',
  'Нижний Новгород',
  'Казань',
  'Екатеринбург',
  'Пермь',
];

export const EGE_SUBJECTS: SubjectInfo[] = [
  { id: 'russian', name: 'Русский язык', defaultRequired: true },
  { id: 'math', name: 'Профильная математика' },
  { id: 'cs', name: 'Информатика' },
  { id: 'physics', name: 'Физика' },
  { id: 'social', name: 'Обществознание' },
  { id: 'history', name: 'История' },
  { id: 'foreign', name: 'Иностранный язык' },
  { id: 'biology', name: 'Биология' },
  { id: 'literature', name: 'Литература' },
];

export const UNIVERSITY_PROGRAMS: Program[] = [
  // 1. HSE Moscow - Software Engineering
  {
    id: 'hse-msk-se',
    title: 'Программная инженерия',
    university: 'НИУ ВШЭ',
    campus: 'Москва',
    city: 'Москва',
    faculty: 'Факультет компьютерных наук (ФКН)',
    imageUrl:
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 298,
    paidPassingScore: 210,
    budgetPlaces: 120,
    paidPlaces: 90,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['IT', 'Архитектура ПО', 'Highload', 'AI'],
    description:
      'Флагманская программа подготовки ведущих инженеров-разработчиков и архитекторов программного обеспечения. Студенты с первого курса решают индустриальные задачи от Яндекса, Сбера, Т-Банка и VK. Глубокое погружение в алгоритмы, низкоуровневое программирование, распределенные системы и машинное обучение.',
    vkChatLink: 'https://vk.me/join/hse_fkn_applicants_2026',
    vkChatDescription:
      'Официальный чат абитуриентов ФКН ВШЭ 2026: здесь общаются студенты старших курсов, кураторы и ребята, которые уже подали документы. Можно спросить про сложность учёбы, военную кафедру и общежития.',
    cityInfo:
      'Москва — главный технологический и финансовый хаб России. Огромное количество офисов международных и крупнейших IT-компаний, гибкие возможности стажировок уже со 2 курса, насыщенная студенческая жизнь и развитая транспортная сеть.',
    importantLinks: [
      { label: 'Официальная страница программы ВШЭ', url: 'https://hse.ru/ba/se/' },
      { label: 'Приёмная комиссия НИУ ВШЭ', url: 'https://ba.hse.ru/' },
      { label: 'Студенческие общежития и жильё', url: 'https://hse.ru/dormitory/' },
    ],
  },

  // 2. ITMO Saint Petersburg - Applied Math and CS
  {
    id: 'itmo-spb-pm',
    title: 'Прикладная математика и информатика',
    university: 'Университет ИТМО',
    campus: 'Санкт-Петербург',
    city: 'Санкт-Петербург',
    faculty: 'Факультет информационных технологий и программирования (ФИТиП)',
    imageUrl:
      'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 302,
    paidPassingScore: 215,
    budgetPlaces: 110,
    paidPlaces: 70,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['IT', 'Machine Learning', 'Олимпиадное программирование', 'AI'],
    description:
      'Легендарная кузница чемпионов мира по спортивному программированию ICPC. Программа ориентирована на подготовку исследователей в области искусственного интеллекта, data scientists и создателей алгоритмических ядер сложных систем.',
    vkChatLink: 'https://vk.me/join/itmo_fitip_2026',
    vkChatDescription:
      'В этом чате уже состоят первокурсники и абитуриенты ИТМО. Тебе расскажут про систему индивидуальных образовательных треков, преподавателей и жизнь в кампусе на Кронверкском.',
    cityInfo:
      'Санкт-Петербург — культурная столица и один из сильнейших центров IT-индустрии и науки. Уникальная городская атмосфера, сотни музеев, открытые коворкинги и комфортная среда для молодёжи.',
    importantLinks: [
      { label: 'Сайт для абитуриентов ИТМО', url: 'https://abit.itmo.ru/' },
      { label: 'Программа на сайте университета', url: 'https://itmo.ru' },
      { label: 'Кампусы и общежития ИТМО', url: 'https://itmo.ru/ru/viewperson/campus.htm' },
    ],
  },

  // 3. MSU Moscow - Fundamental Informatics & IT
  {
    id: 'msu-msk-fiit',
    title: 'Фундаментальная информатика и информационные технологии',
    university: 'МГУ им. М.В. Ломоносова',
    campus: 'Москва',
    city: 'Москва',
    faculty: 'Факультет вычислительной математики и кибернетики (ВМК)',
    imageUrl:
      'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 345,
    paidPassingScore: 230,
    budgetPlaces: 80,
    paidPlaces: 40,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['Кибернетика', 'Фундаментальная наука', 'IT'],
    description:
      'Классическое академическое фундаментальное образование мирового уровня от ведущего университета страны. Сочетает глубокую теоретическую математическую базу с новейшими направлениями кибербезопасности, квантовых вычислений и суперкомпьютеров.',
    vkChatLink: 'https://vk.me/join/msu_vmk_chat_2026',
    vkChatDescription:
      'Чат абитуриентов факультета ВМК МГУ: здесь будущие первокурсники обсуждают подачу согласий, подготовку к ДВИ по математике и жизнь в Главном Здании на Воробьёвых горах.',
    cityInfo:
      'Москва открывает доступ к ведущим исследовательским институтам РАН, крупнейшим научным лабораториям и штаб-квартирам ключевых корпораций страны.',
    importantLinks: [
      { label: 'Приёмная комиссия МГУ', url: 'https://cpk.msu.ru/' },
      { label: 'Факультет ВМК МГУ', url: 'https://cs.msu.ru/' },
      { label: 'Студенческий городок МГУ (ГЗ / ДАС / ДСВ)', url: 'https://msu.ru' },
    ],
  },

  // 4. HSE Nizhny Novgorod - Software Engineering
  {
    id: 'hse-nn-se',
    title: 'Программная инженерия',
    university: 'НИУ ВШЭ',
    campus: 'Нижний Новгород',
    city: 'Нижний Новгород',
    faculty: 'Факультет информатики, математики и компьютерных наук',
    imageUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 282,
    paidPassingScore: 185,
    budgetPlaces: 60,
    paidPlaces: 35,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['IT', 'Разработка ПО', 'AI'],
    description:
      'Московский диплом НИУ ВШЭ с сильным региональным фокусом на индустрию в признанной IT-столице Поволжья. Практика на реальных проектах, сильная математическая школа и плотное партнёрство с IT-кластером Нижегородской области.',
    vkChatLink: 'https://vk.me/join/hse_nn_se_2026',
    vkChatDescription:
      'Чат абитуриентов Вышки в Нижнем Новгороде: студенты делятся реальным опытом обучения на Большой Печёрской и рассказывают про поступление.',
    cityInfo:
      'Нижний Новгород — один из крупнейших IT-кластеров страны, город на слиянии Волги и Оки с живописными закатами, старинным кремлем и доступной стоимостью жизни.',
    importantLinks: [
      { label: 'Страница программы в НН', url: 'https://nnov.hse.ru/ba/se/' },
      { label: 'Приёмная комиссия НИУ ВШЭ — Нижний Новгород', url: 'https://nnov.hse.ru/' },
    ],
  },

  // 5. Bauman MSTU Moscow - Informatics and Computer Engineering
  {
    id: 'bauman-msk-cs',
    title: 'Информатика и вычислительная техника',
    university: 'МГТУ им. Н.Э. Баумана',
    campus: 'Москва',
    city: 'Москва',
    faculty: 'Факультет информатики и систем управления (ИУ)',
    imageUrl:
      'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 290,
    paidPassingScore: 195,
    budgetPlaces: 140,
    paidPlaces: 80,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['Инженерия', 'Hard & Soft', 'IT', 'Робототехника'],
    description:
      'Знаменитый "русский метод обучения ремёслам", объединяющий теоретическую подготовку с масштабной практической инженерией. Выпускники проектируют сложные встроенные системы, операционные платформы и микропроцессорную технику.',
    vkChatLink: 'https://vk.me/join/bmstu_iu_chat_2026',
    vkChatDescription:
      'Чат будущих бауманцев: обсуждение баллов, кафедр ИУ-7, ИУ-6, общежитий на Измайловской и студенческих традиций.',
    cityInfo:
      'Москва предоставляет студентам Бауманки возможность проходить практику на ведущих высокотехнологичных оборонных и гражданских предприятиях.',
    importantLinks: [
      { label: 'Приёмная комиссия МГТУ им. Баумана', url: 'https://priem.bmstu.ru/' },
      { label: 'Официальный портал Бауманки', url: 'https://bmstu.ru/' },
    ],
  },

  // 6. HSE Saint Petersburg - Applied Math and Information Science
  {
    id: 'hse-spb-ami',
    title: 'Прикладная математика и информатика',
    university: 'НИУ ВШЭ',
    campus: 'Санкт-Петербург',
    city: 'Санкт-Петербург',
    faculty: 'Санкт-Петербургская школа физико-математических и компьютерных наук',
    imageUrl:
      'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 289,
    paidPassingScore: 190,
    budgetPlaces: 75,
    paidPlaces: 50,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['Data Science', 'Machine Learning', 'IT'],
    description:
      'Программа создана при участии JetBrains и Яндекса. Сфокусирована на современной фундаментальной математике, машинном обучении и промышленной разработке с преподаванием ведущими учеными и инженерами-практиками.',
    vkChatLink: 'https://vk.me/join/hse_spb_ami_2026',
    vkChatDescription:
      'Чат абитуриентов Питерской Вышки: живое общение с первокурсниками, вопросы по баллам, скидкам на обучение и жизни на Кантемировской.',
    cityInfo:
      'Санкт-Петербург славится своими креативными пространствами, набережными и европейским ритмом жизни с развитой университетской инфраструктурой.',
    importantLinks: [
      { label: 'Страница программы в СПб', url: 'https://spb.hse.ru/ba/ami/' },
      { label: 'Приёмная комиссия НИУ ВШЭ СПб', url: 'https://spb.hse.ru/' },
    ],
  },

  // 7. SPbU Saint Petersburg - Economics and Data Analysis
  {
    id: 'spbu-spb-econ',
    title: 'Экономика (с углубленным изучением анализа данных)',
    university: 'СПбГУ',
    campus: 'Санкт-Петербург',
    city: 'Санкт-Петербург',
    faculty: 'Экономический факультет',
    imageUrl:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 278,
    paidPassingScore: 175,
    budgetPlaces: 65,
    paidPlaces: 60,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['social', 'foreign', 'cs'],
    },
    tags: ['Экономика', 'Data Analysis', 'Финансы'],
    description:
      'Синтез классической экономической теории и современных количественных методов анализа данных (FinTech, Quantitative Economics). Подготовка аналитиков для консалтинга, банковского сектора и финтех-компаний.',
    vkChatLink: 'https://vk.me/join/spbu_econ_2026',
    vkChatDescription:
      'Чат абитуриентов Экономфака СПбГУ: вопросы про общежития в Петергофе и на Васильевском острове, баллы прошлых лет и международные стажировки.',
    cityInfo:
      'Санкт-Петербург сочетает богатейшую университетскую историю старейшего вуза России со стремительно растущим финтех-сектором.',
    importantLinks: [
      { label: 'Приёмная комиссия СПбГУ', url: 'https://abiturient.spbu.ru/' },
      { label: 'Сайт экономического факультета', url: 'https://econ.spbu.ru/' },
    ],
  },

  // 8. KFU Kazan - Software Engineering
  {
    id: 'kfu-kzn-se',
    title: 'Программная инженерия',
    university: 'КФУ',
    campus: 'Казань',
    city: 'Казань',
    faculty: 'Институт вычислительной математики и информационных технологий (ИВМиИТ)',
    imageUrl:
      'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 268,
    paidPassingScore: 160,
    budgetPlaces: 80,
    paidPlaces: 70,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['IT', 'Web', 'Mobile Dev', 'Регионы'],
    description:
      'КФУ — один из старейших университетов России с мощнейшей школой математики Лобачевского. Программа готовит разработчиков для бурно развивающегося IT-кластера Татарстана и инновационного города Иннополис.',
    vkChatLink: 'https://vk.me/join/kfu_ivmiit_2026',
    vkChatDescription:
      'Чат абитуриентов КФУ: здесь рассказывают про комфортные общежития Деревни Универсиады, учёбу и студенческую жизнь в Казани.',
    cityInfo:
      'Казань — спортивная и молодежная столица России, современный комфортный мегаполис с Деревней Универсиады (лучшим студенческим кампусом страны) и богатыми культурными традициями.',
    importantLinks: [
      { label: 'Приёмная комиссия КФУ', url: 'https://admissions.kpfu.ru/' },
      { label: 'Деревня Универсиады КФУ', url: 'https://kpfu.ru/universiade-village' },
    ],
  },

  // 9. UrFU Ekaterinburg - Information Systems and Technologies
  {
    id: 'urfu-ekb-ist',
    title: 'Информационные системы и технологии',
    university: 'УрФУ',
    campus: 'Екатеринбург',
    city: 'Екатеринбург',
    faculty: 'Институт радиоэлектроники и информационных технологий (ИРИТ-РТФ)',
    imageUrl:
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 264,
    paidPassingScore: 155,
    budgetPlaces: 120,
    paidPlaces: 80,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    tags: ['IT', 'Облачные сервисы', 'Индустрия'],
    description:
      'Крупнейший научно-образовательный центр Урала. Программа разработана в тесном партнерстве с Контуром, Сбером и Яндексом. Студенты получают практический опыт разработки enterprise-сервисов и облачных платформ.',
    vkChatLink: 'https://vk.me/join/urfu_rtf_2026',
    vkChatDescription:
      'Чат абитуриентов радиофака УрФУ: общение со студентами, всё о новом кампусе в Новокольцовском и проектном обучении.',
    cityInfo:
      'Екатеринбург — индустриальный гигант и динамичная столица Урала с развитым IT-сектором, конструктивистской архитектурой и активным студенческим сообществом.',
    importantLinks: [
      { label: 'Абитуриент УрФУ', url: 'https://urfu.ru/ru/applicant/' },
      { label: 'Новый кампус Новокольцовский', url: 'https://urfu.ru' },
    ],
  },

  // 10. HSE Moscow - Design
  {
    id: 'hse-msk-design',
    title: 'Дизайн (Коммуникационный, Цифровой, Мода)',
    university: 'НИУ ВШЭ',
    campus: 'Москва',
    city: 'Москва',
    faculty: 'Школа дизайна факультета креативных индустрий',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 292,
    paidPassingScore: 210,
    budgetPlaces: 40,
    paidPlaces: 150,
    requiredSubjects: {
      primary: ['russian', 'literature'],
    },
    requiresCreativeExam: true,
    tags: ['Дизайн', 'UI/UX', 'Креатив', 'ДВИ'],
    description:
      'Ведущая школа дизайна в России. Обучение построено на создании реального проектного портфолио с первых месяцев учебы под кураторством топовых арт-директоров и дизайнеров индустрии.',
    vkChatLink: 'https://vk.me/join/hse_design_chat_2026',
    vkChatDescription:
      'Чат абитуриентов Школы дизайна ВШЭ: обсуждение творческого проекта, выбор профиля и советы тех, кто уже сдал ДВИ на максимум.',
    cityInfo:
      'Москва — центр креативных индустрий, моды, медиа и арт-кластеров (Винзавод, Artplay, ГЭС-2).',
    importantLinks: [
      { label: 'Школа дизайна НИУ ВШЭ', url: 'https://design.hse.ru/' },
      { label: 'Требования к творческому проекту (ДВИ)', url: 'https://design.hse.ru/ba' },
    ],
  },

  // 11. HSE Perm - Business Informatics
  {
    id: 'hse-prm-bi',
    title: 'Бизнес-информатика',
    university: 'НИУ ВШЭ',
    campus: 'Пермь',
    city: 'Пермь',
    faculty: 'Социально-гуманитарный факультет',
    imageUrl:
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800&auto=format&fit=crop',
    budgetPassingScore: 255,
    paidPassingScore: 150,
    budgetPlaces: 35,
    paidPlaces: 25,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'social', 'foreign'],
    },
    tags: ['Бизнес-анализ', 'IT', 'Менеджмент'],
    description:
      'Специалисты по цифровой трансформации бизнеса и внедрению корпоративных информационных систем. Высокий спрос на выпускников на стыке менеджмента и IT.',
    vkChatLink: 'https://vk.me/join/hse_perm_bi_2026',
    vkChatDescription:
      'Чат абитуриентов Вышки в Перми: вопросы про баллы, стипендии и общежития кампуса.',
    cityInfo:
      'Пермь — крупный культурный и промышленный центр Западного Урала с уютным компактным кампусом ВШЭ.',
    importantLinks: [
      { label: 'Сайт НИУ ВШЭ — Пермь', url: 'https://perm.hse.ru/' },
    ],
  },
];
