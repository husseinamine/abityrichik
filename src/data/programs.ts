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
  { id: 'russian', name: 'Русский язык', shortName: 'Рус', defaultRequired: true },
  { id: 'math', name: 'Профильная математика', shortName: 'Мат' },
  { id: 'cs', name: 'Информатика', shortName: 'Инф' },
  { id: 'physics', name: 'Физика', shortName: 'Физ' },
  { id: 'social', name: 'Обществознание', shortName: 'Общ' },
  { id: 'history', name: 'История', shortName: 'Ист' },
  { id: 'foreign', name: 'Иностранный язык', shortName: 'Ин.яз' },
  { id: 'biology', name: 'Биология', shortName: 'Био' },
  { id: 'literature', name: 'Литература', shortName: 'Лит' },
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
    officialProgramUrl: 'https://www.hse.ru/ba/se/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/HSE_new_building_%282015-01-22%29_01.jpg',
    budgetPassingScore: 298,
    paidPassingScore: 210,
    budgetPlaces: 120,
    paidPlaces: 90,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 65,
      cs: 60,
      physics: 60,
      russian: 60,
    },
    tags: ['IT', 'Архитектура ПО', 'Highload', 'AI'],
    description:
      'Флагманская программа подготовки ведущих инженеров-разработчиков и архитекторов программного обеспечения на Факультете компьютерных наук (ФКН) НИУ ВШЭ. Студенты с первого курса решают индустриальные задачи от Яндекса, Т-Банка, Сбера и VK. Программа включает глубокое изучение алгоритмов, распределенных систем, компиляторов и машинного обучения.',
    vkChatLink: 'https://vk.me/join/hse_fkn_applicants_2026',
    vkChatDescription:
      'Официальный чат абитуриентов ФКН ВШЭ: здесь общаются студенты старших курсов, кураторы и ребята, которые уже подали документы. Можно спросить про сложность учёбы, военную кафедру и общежития.',
    cityInfo:
      'Москва — главный технологический и финансовый хаб России. Огромное количество офисов международных и крупнейших IT-компаний, гибкие возможности стажировок уже со 2 курса, насыщенная студенческая жизнь и развитая инфраструктура.',
    importantLinks: [
      { label: 'Официальная страница программы ВШЭ', url: 'https://www.hse.ru/ba/se/' },
      { label: 'Приёмная комиссия бакалавриата НИУ ВШЭ', url: 'https://ba.hse.ru/' },
      { label: 'Студенческий городок и общежития ВШЭ', url: 'https://www.hse.ru/dormitory/' },
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
    officialProgramUrl: 'https://abit.itmo.ru/program/bachelor/applied_math',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/ITMO_University_Main_Campus_October_2024.jpg',
    budgetPassingScore: 302,
    paidPassingScore: 215,
    budgetPlaces: 110,
    paidPlaces: 70,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 60,
      cs: 60,
      physics: 60,
      russian: 60,
    },
    tags: ['IT', 'Machine Learning', 'Олимпиадное программирование', 'AI'],
    description:
      'Легендарная кузница чемпионов мира по программированию ICPC. Программа ориентирована на подготовку исследователей в области искусственного интеллекта, data scientists и разработчиков алгоритмических ядер сложных систем. Студенты выбирают индивидуальные треки обучения.',
    vkChatLink: 'https://vk.me/join/itmo_fitip_2026',
    vkChatDescription:
      'В этом чате уже состоят первокурсники и абитуриенты ИТМО. Тебе расскажут про систему индивидуальных образовательных треков, преподавателей и жизнь в кампусе на Кронверкском.',
    cityInfo:
      'Санкт-Петербург — культурная столица и один из сильнейших центров IT-индустрии и науки. Уникальная городская атмосфера, коворкинги и комфортная среда для молодёжи.',
    importantLinks: [
      { label: 'Страница программы в приёмной комиссии ИТМО', url: 'https://abit.itmo.ru/program/bachelor/applied_math' },
      { label: 'Официальный портал абитуриента ИТМО', url: 'https://abit.itmo.ru/' },
      { label: 'Студенческие общежития ИТМО', url: 'https://abit.itmo.ru/page/dormitories' },
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
    officialProgramUrl: 'https://cs.msu.ru/education/bachelor/fiit',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/5e/Main_Building_of_Moscow_state_University.jpg',
    budgetPassingScore: 345,
    paidPassingScore: 230,
    budgetPlaces: 80,
    paidPlaces: 40,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 60,
      cs: 65,
      physics: 55,
      russian: 60,
    },
    tags: ['Кибернетика', 'Фундаментальная наука', 'IT', 'Суперкомпьютеры'],
    description:
      'Классическое фундаментальное образование мирового уровня на факультете ВМК МГУ им. М.В. Ломоносова. Сочетает глубокую теоретическую математическую базу с направлениями высокопроизводительных параллельных вычислений, кибербезопасности и системного анализа.',
    vkChatLink: 'https://vk.me/join/msu_vmk_chat_2026',
    vkChatDescription:
      'Чат абитуриентов факультета ВМК МГУ: здесь будущие первокурсники обсуждают подачу согласий, подготовку к вступительным испытаниям и жизнь в Главном Здании на Воробьёвых горах.',
    cityInfo:
      'Москва открывает доступ к ведущим исследовательским институтам РАН, крупнейшим научным лабораториям и штаб-квартирам ключевых корпораций страны.',
    importantLinks: [
      { label: 'Страница программы на факультете ВМК МГУ', url: 'https://cs.msu.ru/education/bachelor/fiit' },
      { label: 'Приёмная комиссия факультета ВМК МГУ', url: 'https://pk.cs.msu.ru/' },
      { label: 'Центральная приёмная комиссия МГУ', url: 'https://cpk.msu.ru/' },
    ],
  },

  // 4. HSE Nizhny Novgorod - Applied Math and Computer Science
  {
    id: 'hse-nn-pmi',
    title: 'Прикладная математика и информатика',
    university: 'НИУ ВШЭ',
    campus: 'Нижний Новгород',
    city: 'Нижний Новгород',
    faculty: 'Факультет информатики, математики и компьютерных наук',
    officialProgramUrl: 'https://nnov.hse.ru/ba/ami/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/c3/Nizhny_Novgorod._Bolshaya_Pecherskaya_St.%2C_16.jpg',
    budgetPassingScore: 284,
    paidPassingScore: 180,
    budgetPlaces: 50,
    paidPlaces: 30,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 60,
      cs: 60,
      physics: 60,
      russian: 60,
    },
    tags: ['IT', 'Машинное обучение', 'AI', 'Алгоритмы', 'Регионы'],
    description:
      'Программа НИУ ВШЭ в Нижнем Новгороде по направлению «Прикладная математика и информатика». Сочетает фундаментальную математику, передовые методы машинного обучения (AI/ML), спортивное программирование и проектную работу с ведущими IT-компаниями.',
    vkChatLink: 'https://vk.me/join/hse_nn_pmi_2026',
    vkChatDescription:
      'Чат абитуриентов ПМИ Вышки в Нижнем Новгороде: студенты делятся реальным опытом учёбы на Большой Печёрской, рассказывают про курсы и поступление.',
    cityInfo:
      'Нижний Новгород — один из крупнейших IT-кластеров страны, город на слиянии Волги и Оки с живописными набережными, старинным кремлем и доступной стоимостью жизни.',
    importantLinks: [
      { label: 'Официальная страница программы «ПМИ» в НН', url: 'https://nnov.hse.ru/ba/ami/' },
      { label: 'Приёмная комиссия НИУ ВШЭ — Нижний Новгород', url: 'https://nnov.hse.ru/ba/' },
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
    officialProgramUrl: 'https://priem.bmstu.ru/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/1f/Moscow_MSTU_Bauman_main_building_asv2021-08.jpg',
    budgetPassingScore: 290,
    paidPassingScore: 195,
    budgetPlaces: 140,
    paidPlaces: 80,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 60,
      cs: 60,
      physics: 60,
      russian: 55,
    },
    tags: ['Инженерия', 'Hard & Soft', 'IT', 'Робототехника'],
    description:
      'Классическая инженерная школа Бауманки, объединяющая фундаментальную математику и масштабную практическую разработку (кафедра ИУ-7). Выпускники проектируют операционные системы, системные утилиты, микропроцессорную технику и высоконадежное программное обеспечение.',
    vkChatLink: 'https://vk.me/join/bmstu_iu_chat_2026',
    vkChatDescription:
      'Чат будущих бауманцев: обсуждение баллов, кафедр ИУ-7, общежитий на Измайловской и традиций МГТУ.',
    cityInfo:
      'Москва предоставляет студентам Бауманки возможность проходить практику на ведущих высокотехнологичных предприятиях и в исследовательских центрах.',
    importantLinks: [
      { label: 'Приёмная комиссия МГТУ им. Н.Э. Баумана', url: 'https://priem.bmstu.ru/' },
      { label: 'Официальный портал МГТУ им. Н.Э. Баумана', url: 'https://bmstu.ru/' },
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
    officialProgramUrl: 'https://spb.hse.ru/ba/ami/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/HSE_new_building_%282015-01-22%29_01.jpg',
    budgetPassingScore: 289,
    paidPassingScore: 190,
    budgetPlaces: 75,
    paidPlaces: 50,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 75,
      cs: 75,
      physics: 75,
      russian: 60,
    },
    tags: ['Data Science', 'Machine Learning', 'IT', 'Алгоритмы'],
    description:
      'Программа создана при участии ведущих ученых и IT-индустрии. Сфокусирована на современной фундаментальной математике, машинном обучении, компьютерном зрении и промышленной разработке распределенных систем.',
    vkChatLink: 'https://vk.me/join/hse_spb_ami_2026',
    vkChatDescription:
      'Чат абитуриентов Питерской Вышки: живое общение с первокурсниками, вопросы по баллам, скидкам на обучение и жизни на Кантемировской.',
    cityInfo:
      'Санкт-Петербург славится креативными пространствами, набережными и европейским ритмом жизни с развитой университетской инфраструктурой.',
    importantLinks: [
      { label: 'Официальная страница программы в СПб', url: 'https://spb.hse.ru/ba/ami/' },
      { label: 'Приёмная комиссия НИУ ВШЭ — Санкт-Петербург', url: 'https://spb.hse.ru/ba/' },
    ],
  },

  // 7. SPbU Saint Petersburg - Economics
  {
    id: 'spbu-spb-econ',
    title: 'Экономика',
    university: 'СПбГУ',
    campus: 'Санкт-Петербург',
    city: 'Санкт-Петербург',
    faculty: 'Экономический факультет',
    officialProgramUrl: 'https://abiturient.spbu.ru/programmy/bakalavriat/ekonomika/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/ff/Twelve_collegia.jpg',
    budgetPassingScore: 278,
    paidPassingScore: 175,
    budgetPlaces: 65,
    paidPlaces: 60,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['social', 'foreign', 'cs'],
    },
    minSubjectScores: {
      math: 60,
      social: 60,
      foreign: 60,
      cs: 60,
      russian: 60,
    },
    tags: ['Экономика', 'Data Analysis', 'Финансы', 'Бизнес'],
    description:
      'Синтез классической фундаментальной экономической теории и количественных методов анализа данных в старейшем университете России. Подготовка аналитиков для ведущих банков, инвестиционных фондов, консалтинга и финтех-компаний.',
    vkChatLink: 'https://vk.me/join/spbu_econ_2026',
    vkChatDescription:
      'Чат абитуриентов Экономфака СПбГУ: вопросы про общежития в Петергофе и на Васильевском острове, баллы прошлых лет и учебу.',
    cityInfo:
      'Санкт-Петербург сочетает богатейшую университетскую историю со стремительно растущим финтех- и финансовым сектором.',
    importantLinks: [
      { label: 'Страница программы в бакалавриате СПбГУ', url: 'https://abiturient.spbu.ru/programmy/bakalavriat/ekonomika/' },
      { label: 'Приёмная комиссия СПбГУ', url: 'https://abiturient.spbu.ru/' },
      { label: 'Экономический факультет СПбГУ', url: 'https://econ.spbu.ru/' },
    ],
  },

  // 8. KFU Kazan - Software Engineering
  {
    id: 'kfu-kzn-se',
    title: 'Программная инженерия',
    university: 'КФУ',
    campus: 'Казань',
    city: 'Казань',
    faculty: 'Высшая школа ИТИС / ИВМиИТ',
    officialProgramUrl: 'https://admissions.kpfu.ru/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/81/Kazan_Federal_University_building_08-2016.jpg',
    budgetPassingScore: 268,
    paidPassingScore: 160,
    budgetPlaces: 80,
    paidPlaces: 70,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 55,
      cs: 55,
      physics: 55,
      russian: 50,
    },
    tags: ['IT', 'Web', 'Mobile Dev', 'Регионы'],
    description:
      'КФУ — один из старейших университетов России с математической школой Лобачевского. Программа готовит разработчиков программного обеспечения, веб- и мобильных систем для динамично растущего IT-кластера Татарстана и Иннополиса.',
    vkChatLink: 'https://vk.me/join/kfu_ivmiit_2026',
    vkChatDescription:
      'Чат абитуриентов КФУ: здесь рассказывают про комфортные общежития Деревни Универсиады, учёбу и студенческую жизнь в Казани.',
    cityInfo:
      'Казань — спортивная и молодежная столица России, современный комфортный мегаполис с Деревней Универсиады и богатыми культурными традициями.',
    importantLinks: [
      { label: 'Приёмная комиссия КФУ', url: 'https://admissions.kpfu.ru/' },
      { label: 'Высшая школа ИТИС КФУ', url: 'https://kpfu.ru/itis' },
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
    officialProgramUrl: 'https://urfu.ru/ru/applicant/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/E-burg_asv2019-05_img30_UrFU_Mira19.jpg',
    budgetPassingScore: 264,
    paidPassingScore: 155,
    budgetPlaces: 120,
    paidPlaces: 80,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 50,
      cs: 50,
      physics: 50,
      russian: 50,
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
      { label: 'Приёмная комиссия УрФУ', url: 'https://urfu.ru/ru/applicant/' },
      { label: 'Институт радиоэлектроники и информтехнологий УрФУ', url: 'https://irit-rtf.urfu.ru/' },
    ],
  },

  // 10. HSE Moscow - Business Informatics
  {
    id: 'hse-msk-bi',
    title: 'Бизнес-информатика',
    university: 'НИУ ВШЭ',
    campus: 'Москва',
    city: 'Москва',
    faculty: 'Высшая школа бизнеса НИУ ВШЭ',
    officialProgramUrl: 'https://www.hse.ru/ba/bi/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/HSE_new_building_%282015-01-22%29_01.jpg',
    budgetPassingScore: 288,
    paidPassingScore: 195,
    budgetPlaces: 80,
    paidPlaces: 120,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'social', 'foreign'],
    },
    minSubjectScores: {
      math: 65,
      cs: 65,
      social: 65,
      foreign: 65,
      russian: 60,
    },
    tags: ['Бизнес-аналитика', 'IT-консалтинг', 'ERP', 'Управление продуктом'],
    description:
      'Программа Высшей школы бизнеса НИУ ВШЭ готовит лидеров цифровой трансформации, IT-консультантов и продуктовых менеджеров. Студенты проектируют архитектуру корпоративных информационных систем, управляют IT-проектами и применяют аналитику данных для бизнеса.',
    vkChatLink: 'https://vk.me/join/hse_gsb_chat_2026',
    vkChatDescription:
      'Чат абитуриентов Высшей школы бизнеса ВШЭ: обсуждение проходных баллов, общежитий, практик в компаниях и студенческих клубов.',
    cityInfo:
      'Москва — центр деловой и корпоративной активности страны, штаб-квартир ведущих банков, телекомов и технологических гигантов.',
    importantLinks: [
      { label: 'Официальная страница программы «Бизнес-информатика»', url: 'https://www.hse.ru/ba/bi/' },
      { label: 'Приёмная комиссия НИУ ВШЭ', url: 'https://ba.hse.ru/' },
      { label: 'Высшая школа бизнеса НИУ ВШЭ', url: 'https://gsb.hse.ru/' },
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
    officialProgramUrl: 'https://perm.hse.ru/ba/bi/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/HSE_new_building_%282015-01-22%29_01.jpg',
    budgetPassingScore: 255,
    paidPassingScore: 150,
    budgetPlaces: 35,
    paidPlaces: 25,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'social', 'foreign'],
    },
    minSubjectScores: {
      math: 60,
      cs: 60,
      social: 60,
      foreign: 60,
      russian: 60,
    },
    tags: ['Бизнес-анализ', 'IT', 'Менеджмент'],
    description:
      'Специалисты по цифровой трансформации бизнеса и внедрению корпоративных информационных систем. Высокий спрос на выпускников на стыке менеджмента и IT, московский диплом ВШЭ и сильный преподавательский состав.',
    vkChatLink: 'https://vk.me/join/hse_perm_bi_2026',
    vkChatDescription:
      'Чат абитуриентов Вышки в Перми: вопросы про баллы, стипендии и общежития кампуса.',
    cityInfo:
      'Пермь — крупный культурный и промышленный центр Западного Урала с уютным компактным кампусом ВШЭ.',
    importantLinks: [
      { label: 'Официальная страница программы в Перми', url: 'https://perm.hse.ru/ba/bi/' },
      { label: 'Приёмная комиссия НИУ ВШЭ — Пермь', url: 'https://perm.hse.ru/ba/' },
    ],
  },

  // 12. UNN Lobachevsky Nizhny Novgorod - Applied Math and CS
  {
    id: 'nngu-nn-pmi',
    title: 'Прикладная математика и информатика',
    university: 'ННГУ им. Н.И. Лобачевского',
    campus: 'Нижний Новгород',
    city: 'Нижний Новгород',
    faculty: 'Институт информационных технологий, математики и механики (ИИТММ)',
    officialProgramUrl: 'http://www.itmm.unn.ru/',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/c3/Nizhny_Novgorod._Bolshaya_Pecherskaya_St.%2C_16.jpg',
    budgetPassingScore: 260,
    paidPassingScore: 165,
    budgetPlaces: 100,
    paidPlaces: 60,
    requiredSubjects: {
      primary: ['russian', 'math'],
      choice: ['cs', 'physics'],
    },
    minSubjectScores: {
      math: 55,
      cs: 55,
      physics: 55,
      russian: 50,
    },
    tags: ['IT', 'Фундаментальная математика', 'Вычислительные методы', 'Алгоритмы'],
    description:
      'Классическая университетская школа прикладной математики и кибернетики Нижегородского государственного университета им. Н.И. Лобачевского. Обучение базируется на мощной научной базе вычислительной математики, теоретической информатики, математического моделирования и численных методов.',
    vkChatLink: 'https://vk.me/join/unn_itmm_2026',
    vkChatDescription:
      'Чат абитуриентов Института ИИТММ ННГУ: вопросы про учёбу на проспекте Гагарина, баллы прошлых лет, общежития и студенческие секции.',
    cityInfo:
      'Нижний Новгород — признанный научно-образовательный центр Поволжья с сильными традициями математических исследований.',
    importantLinks: [
      { label: 'Институт ИИТММ ННГУ им. Лобачевского', url: 'http://www.itmm.unn.ru/' },
      { label: 'Приёмная комиссия ННГУ', url: 'https://admissions.unn.ru/' },
    ],
  },
];
