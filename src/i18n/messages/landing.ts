import type { Messages } from "@/i18n/config";

/** Rus tilida ko'plik shakli: 1 заказ, 2 заказа, 5 заказов. */
function ruPlural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

type Step = { title: string; text: string };
type CategoryCopy = { text: string; skills: string };

export type LandingMessages = {
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    supportLine1: string;
    supportLine2: string;
    ctaOrders: string;
    ctaHow: string;
    noteReal: string;
    noteSmallStep: string;
    disciplinesAria: string;
    disciplinesLabel: string;
    imageAlt: string;
    ideaSticker: string;
    floatingTitle: string;
    floatingText: string;
    growthSticker: string;
    scroll: string;
  };
  stats: {
    aria: string;
    ordersValue: (n: number) => string;
    ordersLabel: string;
    categoriesValue: (n: number) => string;
    categoriesLabel: string;
    budgetValue: (price: string) => string;
    budgetLabel: string;
  };
  how: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: [Step, Step, Step];
  };
  categories: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    textLine1: string;
    textLine2: string;
    count: (n: number) => string;
    items: { Dizayn: CategoryCopy; Video: CategoryCopy; Veb: CategoryCopy };
  };
  featured: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    viewAll: string;
    details: string;
    detailsAria: string;
    note: string;
  };
  ai: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    text: string;
    bullets: [string, string, string];
    cta: string;
    previewAria: string;
    botSubtitle: string;
    demoLabel: string;
    sampleUser: string;
    sampleAi: string;
    suggestion: string;
    inputPlaceholder: string;
  };
  grid: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchAria: string;
    sortAria: string;
    sortDefault: string;
    sortBudgetDesc: string;
    sortBudgetAsc: string;
    favorites: string;
    results: (n: number) => string;
    emptyTitle: string;
    emptyText: string;
    reset: string;
  };
  ordersPage: {
    metaTitle: string;
    breadcrumbAria: string;
    home: string;
    orders: string;
  };
};

export const landingMessages: Messages<LandingMessages> = {
  uz: {
    hero: {
      eyebrow: "Yoshlar uchun yangi imkoniyatlar",
      titleStart: "Kichik buyurtmalardan",
      titleAccent: "katta imkoniyatlar.",
      description: "Yosh mutaxassislar uchun dizayn, video va veb yo‘nalishidagi mikro-ishlar platformasi.",
      supportLine1: "Bilimingizni amalda sinang. Portfolio yarating.",
      supportLine2: "O‘z yo‘lingizni bugun boshlang.",
      ctaOrders: "Buyurtmalarni ko‘rish",
      ctaHow: "Qanday ishlaydi?",
      noteReal: "Real loyihalar",
      noteSmallStep: "Kichik qadam, katta tajriba",
      disciplinesAria: "Ijodiy yo‘nalishlar",
      disciplinesLabel: "IJOD UCHUN MAKON",
      imageAlt: "Binafsha hudidagi yosh mutaxassis noutbukda ijodiy loyiha ustida ishlamoqda",
      ideaSticker: "IDEA!",
      floatingTitle: "Ijodingizga yo‘l oching",
      floatingText: "Ilk loyihangiz shu yerdan boshlanadi",
      growthSticker: "O‘sish vaqti!",
      scroll: "Imkoniyatlarni kashf eting",
    },
    stats: {
      aria: "Platforma raqamlarda",
      ordersValue: (n) => `${n} ta`,
      ordersLabel: "Sizni kutayotgan buyurtma",
      categoriesValue: (n) => `${n} ta`,
      categoriesLabel: "Ijodiy yo‘nalish",
      budgetValue: (price) => `${price}gacha`,
      budgetLabel: "Bir loyiha uchun budjet",
    },
    how: {
      eyebrow: "BOSHLASH OSON",
      title: "Katta yo‘l — uchta kichik qadam.",
      subtitle: "Ilk buyurtmangizga o‘ylaganingizdan ham yaqinsiz.",
      steps: [
        { title: "Buyurtmani toping", text: "Qiziqishingiz va ko‘nikmalaringizga mos loyihani tanlang. Dizayn, video yoki veb — tanlov sizniki." },
        { title: "Taklif yuboring", text: "O‘zingizni tanishtiring va portfolio havolasini ulashing. Birinchi qadam uchun login shart emas." },
        { title: "Tajriba orttiring", text: "Haqiqiy loyihalar orqali mahoratingizni oshiring va portfoliongizni yangi ishlar bilan boyiting." },
      ],
    },
    categories: {
      eyebrow: "O‘ZINGIZNI KASHF ETING",
      titleLine1: "Sizning mahoratingiz.",
      titleLine2: "Sizning yo‘nalishingiz.",
      textLine1: "O‘zingiz sevgan ishni",
      textLine2: "haqiqiy loyihaga aylantiring.",
      count: (n) => `${n} ta buyurtma`,
      items: {
        Dizayn: { text: "G‘oyalarni ranglarga aylantiring.", skills: "Brending · Grafik dizayn · Afishalar" },
        Video: { text: "Har bir kadrda hikoya yarating.", skills: "Montaj · Reels · Subtitrlar" },
        Veb: { text: "Raqamli dunyoda iz qoldiring.", skills: "Landing page · React · Kontent" },
      },
    },
    featured: {
      eyebrow: "BIRINCHI QADAM UCHUN",
      titleLine1: "Kichik loyihalar,",
      titleLine2: "haqiqiy imkoniyatlar.",
      subtitle: "Har bir yo‘nalishdan boshlashga arziydigan bir loyiha.",
      viewAll: "Barchasini ko‘rish",
      details: "Batafsil",
      detailsAria: "batafsil",
      note: "Birinchi taklifingizni yuborish uchun ism va portfolio havolasi yetarli.",
    },
    ai: {
      eyebrow: "YONINGIZDA AQLLI YORDAMCHI",
      titleLine1: "Birinchi qadamda",
      titleLine2: "yolg‘iz emassiz.",
      text: "Qayerdan boshlashni bilmayapsizmi? AI yordamchimiz bilan o‘z imkoniyatlaringizni kashf eting.",
      bullets: ["Ko‘nikmalaringizga mos buyurtma topish", "Taklif yozishda yordam", "Portfolio bo‘yicha maslahat"],
      cta: "AI bilan suhbatlashish",
      previewAria: "AI yordamchi imkoniyatlari namunasi",
      botSubtitle: "Sizning ijodiy hamrohingiz",
      demoLabel: "Namuna",
      sampleUser: "Dizaynni bilaman. Nimadan boshlay?",
      sampleAi: "Ajoyib! Men sizga mos buyurtmalarni topishda va birinchi taklifingizni tayyorlashda yordam beraman.",
      suggestion: "O‘z mahoratingizdan boshlang.",
      inputPlaceholder: "Savolingizni yozing...",
    },
    grid: {
      eyebrow: "IMKONIYATLAR MAYDONI",
      title: "Mavjud buyurtmalar",
      subtitle: "Kategoriya tanlang, qidiring yoki budjet bo'yicha saralang.",
      searchPlaceholder: "Ish qidirish (masalan: dizayn, video, sayt)...",
      searchAria: "Buyurtmalarni qidirish",
      sortAria: "Saralash",
      sortDefault: "Standart tartib",
      sortBudgetDesc: "Budjet: yuqoridan",
      sortBudgetAsc: "Budjet: pastdan",
      favorites: "Sevimlilar",
      results: (n) => `${n} ta natija`,
      emptyTitle: "Hech narsa topilmadi",
      emptyText: "Boshqa kalit so'z yoki kategoriyani sinab ko'ring.",
      reset: "Filtrlarni tozalash",
    },
    ordersPage: {
      metaTitle: "Buyurtmalar — YoshlarMakon",
      breadcrumbAria: "Breadcrumb",
      home: "Bosh sahifa",
      orders: "Buyurtmalar",
    },
  },

  ru: {
    hero: {
      eyebrow: "Новые возможности для молодёжи",
      titleStart: "Маленькие заказы —",
      titleAccent: "большие возможности.",
      description: "Платформа микрозаказов в дизайне, видео и веб-разработке для молодых специалистов.",
      supportLine1: "Применяйте знания на практике. Собирайте портфолио.",
      supportLine2: "Начните свой путь уже сегодня.",
      ctaOrders: "Смотреть заказы",
      ctaHow: "Как это работает?",
      noteReal: "Реальные проекты",
      noteSmallStep: "Маленький шаг — большой опыт",
      disciplinesAria: "Творческие направления",
      disciplinesLabel: "ПРОСТРАНСТВО ДЛЯ ТВОРЧЕСТВА",
      imageAlt: "Молодой специалист в фиолетовом худи работает над творческим проектом за ноутбуком",
      ideaSticker: "IDEA!",
      floatingTitle: "Откройте путь своему творчеству",
      floatingText: "Ваш первый проект начинается здесь",
      growthSticker: "Время расти!",
      scroll: "Откройте возможности",
    },
    stats: {
      aria: "Платформа в цифрах",
      ordersValue: (n) => `${n}`,
      ordersLabel: "Заказов ждут вас",
      categoriesValue: (n) => `${n}`,
      categoriesLabel: "Творческих направления",
      budgetValue: (price) => `до ${price}`,
      budgetLabel: "Бюджет одного проекта",
    },
    how: {
      eyebrow: "НАЧАТЬ ЛЕГКО",
      title: "Большой путь — три маленьких шага.",
      subtitle: "Ваш первый заказ ближе, чем кажется.",
      steps: [
        { title: "Найдите заказ", text: "Выберите проект по своим интересам и навыкам. Дизайн, видео или веб — решать вам." },
        { title: "Отправьте отклик", text: "Расскажите о себе и поделитесь ссылкой на портфолио. Для первого шага регистрация не нужна." },
        { title: "Набирайтесь опыта", text: "Прокачивайте мастерство на реальных проектах и пополняйте портфолио новыми работами." },
      ],
    },
    categories: {
      eyebrow: "ОТКРОЙТЕ СЕБЯ",
      titleLine1: "Ваше мастерство.",
      titleLine2: "Ваше направление.",
      textLine1: "Превратите любимое дело",
      textLine2: "в настоящий проект.",
      count: (n) => `${n} ${ruPlural(n, "заказ", "заказа", "заказов")}`,
      items: {
        Dizayn: { text: "Превращайте идеи в цвета.", skills: "Брендинг · Графический дизайн · Афиши" },
        Video: { text: "Рассказывайте историю в каждом кадре.", skills: "Монтаж · Reels · Субтитры" },
        Veb: { text: "Оставьте след в цифровом мире.", skills: "Лендинги · React · Контент" },
      },
    },
    featured: {
      eyebrow: "ДЛЯ ПЕРВОГО ШАГА",
      titleLine1: "Небольшие проекты,",
      titleLine2: "реальные возможности.",
      subtitle: "По одному проекту из каждого направления, с которого стоит начать.",
      viewAll: "Смотреть все",
      details: "Подробнее",
      detailsAria: "подробнее",
      note: "Для первого отклика достаточно имени и ссылки на портфолио.",
    },
    ai: {
      eyebrow: "УМНЫЙ ПОМОЩНИК РЯДОМ",
      titleLine1: "На первом шаге",
      titleLine2: "вы не одни.",
      text: "Не знаете, с чего начать? Откройте свои возможности вместе с нашим AI-помощником.",
      bullets: ["Подбор заказов под ваши навыки", "Помощь в составлении отклика", "Советы по портфолио"],
      cta: "Поговорить с AI",
      previewAria: "Пример возможностей AI-помощника",
      botSubtitle: "Ваш творческий напарник",
      demoLabel: "Пример",
      sampleUser: "Я разбираюсь в дизайне. С чего начать?",
      sampleAi: "Отлично! Я помогу подобрать подходящие заказы и подготовить ваш первый отклик.",
      suggestion: "Начните со своих сильных сторон.",
      inputPlaceholder: "Напишите свой вопрос...",
    },
    grid: {
      eyebrow: "ПОЛЕ ВОЗМОЖНОСТЕЙ",
      title: "Доступные заказы",
      subtitle: "Выберите категорию, воспользуйтесь поиском или отсортируйте по бюджету.",
      searchPlaceholder: "Поиск работы (например: дизайн, видео, сайт)...",
      searchAria: "Поиск заказов",
      sortAria: "Сортировка",
      sortDefault: "По умолчанию",
      sortBudgetDesc: "Бюджет: по убыванию",
      sortBudgetAsc: "Бюджет: по возрастанию",
      favorites: "Избранное",
      results: (n) => `${n} ${ruPlural(n, "результат", "результата", "результатов")}`,
      emptyTitle: "Ничего не найдено",
      emptyText: "Попробуйте другое ключевое слово или категорию.",
      reset: "Сбросить фильтры",
    },
    ordersPage: {
      metaTitle: "Заказы — YoshlarMakon",
      breadcrumbAria: "Навигационная цепочка",
      home: "Главная",
      orders: "Заказы",
    },
  },

  en: {
    hero: {
      eyebrow: "New opportunities for young talent",
      titleStart: "Small orders,",
      titleAccent: "big opportunities.",
      description: "A micro-job platform for young specialists in design, video and web.",
      supportLine1: "Put your skills into practice. Build your portfolio.",
      supportLine2: "Start your journey today.",
      ctaOrders: "Browse orders",
      ctaHow: "How it works",
      noteReal: "Real projects",
      noteSmallStep: "Small step, big experience",
      disciplinesAria: "Creative fields",
      disciplinesLabel: "A SPACE FOR CREATIVITY",
      imageAlt: "A young specialist in a purple hoodie working on a creative project on a laptop",
      ideaSticker: "IDEA!",
      floatingTitle: "Open the way to your creativity",
      floatingText: "Your first project starts here",
      growthSticker: "Time to grow!",
      scroll: "Discover opportunities",
    },
    stats: {
      aria: "The platform in numbers",
      ordersValue: (n) => `${n}`,
      ordersLabel: "Orders waiting for you",
      categoriesValue: (n) => `${n}`,
      categoriesLabel: "Creative fields",
      budgetValue: (price) => `Up to ${price}`,
      budgetLabel: "Budget per project",
    },
    how: {
      eyebrow: "EASY TO START",
      title: "A big journey — three small steps.",
      subtitle: "Your first order is closer than you think.",
      steps: [
        { title: "Find an order", text: "Pick a project that matches your interests and skills. Design, video or web — the choice is yours." },
        { title: "Send a proposal", text: "Introduce yourself and share your portfolio link. No sign-up needed for the first step." },
        { title: "Gain experience", text: "Sharpen your craft on real projects and grow your portfolio with new work." },
      ],
    },
    categories: {
      eyebrow: "DISCOVER YOURSELF",
      titleLine1: "Your craft.",
      titleLine2: "Your direction.",
      textLine1: "Turn the work you love",
      textLine2: "into a real project.",
      count: (n) => `${n} ${n === 1 ? "order" : "orders"}`,
      items: {
        Dizayn: { text: "Turn ideas into color.", skills: "Branding · Graphic design · Posters" },
        Video: { text: "Tell a story in every frame.", skills: "Editing · Reels · Subtitles" },
        Veb: { text: "Leave your mark on the digital world.", skills: "Landing pages · React · Content" },
      },
    },
    featured: {
      eyebrow: "FOR YOUR FIRST STEP",
      titleLine1: "Small projects,",
      titleLine2: "real opportunities.",
      subtitle: "One project from each field that's worth starting with.",
      viewAll: "View all",
      details: "Details",
      detailsAria: "details",
      note: "All you need to send your first proposal is your name and a portfolio link.",
    },
    ai: {
      eyebrow: "A SMART ASSISTANT BY YOUR SIDE",
      titleLine1: "You're not alone",
      titleLine2: "on your first step.",
      text: "Not sure where to start? Discover your opportunities with our AI assistant.",
      bullets: ["Find orders that match your skills", "Help writing your proposal", "Portfolio advice"],
      cta: "Chat with AI",
      previewAria: "Sample of the AI assistant's capabilities",
      botSubtitle: "Your creative companion",
      demoLabel: "Sample",
      sampleUser: "I know design. Where should I start?",
      sampleAi: "Great! I'll help you find matching orders and prepare your first proposal.",
      suggestion: "Start with what you do best.",
      inputPlaceholder: "Type your question...",
    },
    grid: {
      eyebrow: "A FIELD OF OPPORTUNITIES",
      title: "Available orders",
      subtitle: "Pick a category, search, or sort by budget.",
      searchPlaceholder: "Search jobs (e.g. design, video, website)...",
      searchAria: "Search orders",
      sortAria: "Sort",
      sortDefault: "Default order",
      sortBudgetDesc: "Budget: high to low",
      sortBudgetAsc: "Budget: low to high",
      favorites: "Favorites",
      results: (n) => `${n} ${n === 1 ? "result" : "results"}`,
      emptyTitle: "Nothing found",
      emptyText: "Try a different keyword or category.",
      reset: "Clear filters",
    },
    ordersPage: {
      metaTitle: "Orders — YoshlarMakon",
      breadcrumbAria: "Breadcrumb",
      home: "Home",
      orders: "Orders",
    },
  },
};
