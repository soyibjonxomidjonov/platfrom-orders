import type { Messages } from "@/i18n/config";

type CommonMessages = {
  meta: { title: string; description: string };
  nav: {
    home: string; orders: string; how: string; ai: string; proposals: string;
    login: string; cabinet: string; menu: string; mainNav: string; mobileNav: string; theme: string; language: string;
  };
  theme: { group: string; light: string; dark: string; system: string };
  modal: { close: string };
  footer: {
    tagline1: string; tagline2: string; platform: string; orders: string; directions: string; how: string;
    forYou: string; myProposals: string; saved: string; ai: string; bottom: string;
  };
  login: {
    metaTitle: string; badge: string; heroA: string; heroB: string; benefits: string[]; imageAlt: string;
    back: string; welcome: string; subtitle: string; google: string; or: string; browse: string; note: string;
    errors: { Configuration: string; AccessDenied: string; OAuthCallbackError: string; OAuthSignin: string; OAuthAccountNotLinked: string; CredentialsSignin: string; default: string };
  };
  email: {
    label: string; placeholder: string; send: string; sending: string; sentTo: string; codeLabel: string;
    codePlaceholder: string; verify: string; verifying: string; resend: string; resendIn: string; change: string;
    hint: string;
    errors: {
      notConfigured: string; rateLimited: string; sendFailed: string; invalid: string; expired: string;
      tooMany: string; generic: string;
    };
  };
  dashboard: {
    metaTitle: string; sections: { overview: string; proposals: string; favorites: string; settings: string; orders: string; home: string };
    logout: string; nav: string; eyebrow: string; hello: string; friend: string; intro: string; findNew: string;
    stats: { sent: string; pending: string; favorites: string; aria: string };
    proposalsTitle: string; all: string; favoritesTitle: string; settingsTitle: string;
    appearance: string; appearanceHint: string; languageTitle: string; languageHint: string; account: string; memberSince: string;
  };
  proposals: {
    metaTitle: string; title: string; subtitle: string; emptyTitle: string; emptyText: string; browse: string;
    status: { PENDING: string; ACCEPTED: string; REJECTED: string }; portfolio: string;
  };
  saved: { empty: string; remove: string };
  server: {
    loginRequired: string; orderNotFound: string; checkFields: string; duplicate: string; saveFailed: string;
  };
};

export const commonMessages: Messages<CommonMessages> = {
  uz: {
    meta: {
      title: "YoshlarMakon — Kichik buyurtmalardan katta imkoniyatlar",
      description: "Yosh mutaxassislar uchun freelance mikro-ishlar platformasi. Dizayn, video va veb buyurtmalarni toping va taklif yuboring.",
    },
    nav: {
      home: "Bosh sahifa", orders: "Buyurtmalar", how: "Qanday ishlaydi?", ai: "AI yordamchi", proposals: "Takliflar",
      login: "Kirish", cabinet: "Kabinet", menu: "Menyu", mainNav: "Asosiy navigatsiya", mobileNav: "Mobil navigatsiya",
      theme: "Mavzu", language: "Til",
    },
    theme: { group: "Mavzu (tema) tanlash", light: "Yorug'", dark: "Qorong'u", system: "Tizim" },
    modal: { close: "Yopish" },
    footer: {
      tagline1: "Kichik buyurtmalardan katta imkoniyatlar.", tagline2: "Kelajagingizni o‘z qo‘lingiz bilan yarating.",
      platform: "PLATFORMA", orders: "Buyurtmalar", directions: "Yo‘nalishlar", how: "Qanday ishlaydi?",
      forYou: "SIZ UCHUN", myProposals: "Mening takliflarim", saved: "Saqlangan buyurtmalar", ai: "AI yordamchi",
      bottom: "Yoshlar uchun. Imkoniyatlar sari.",
    },
    login: {
      metaTitle: "Kirish — YoshlarMakon", badge: "Yoshlar uchun imkoniyatlar", heroA: "Kichik buyurtmalardan", heroB: "katta imkoniyatlar!",
      benefits: ["Saqlangan buyurtmalaringiz bir joyda", "Takliflaringiz tarixini kuzating", "AI yordamchidan shaxsiy maslahatlar"],
      imageAlt: "Yosh mutaxassis noutbukda ijodiy loyiha ustida ishlamoqda",
      back: "Bosh sahifa", welcome: "Xush kelibsiz!",
      subtitle: "Google hisobingiz yoki emailingizga yuboriladigan kod orqali kiring.",
      google: "Google orqali kirish", or: "yoki", browse: "Ro‘yxatdan o‘tmasdan buyurtmalarni ko‘rish",
      note: "Taklif yuborish, sevimlilarni saqlash va takliflar tarixini ko‘rish uchun tizimga kirish kerak. Buyurtmalarni esa login’siz ko‘rish mumkin.",
      errors: {
        Configuration: "Google kirish hozircha sozlanmagan. Administrator redirect URI ni tekshirishi kerak.",
        AccessDenied: "Kirishga ruxsat berilmadi.",
        OAuthCallbackError: "Google bilan bog‘lanishda xatolik. Qayta urinib ko‘ring.",
        OAuthSignin: "Google orqali kirishni boshlab bo‘lmadi. Qayta urinib ko‘ring.",
        OAuthAccountNotLinked: "Bu email allaqachon boshqa usul bilan ro‘yxatdan o‘tgan. O‘sha usul bilan kiring.",
        CredentialsSignin: "Kod noto‘g‘ri yoki muddati o‘tgan.",
        default: "Kirishda xatolik yuz berdi. Qayta urinib ko‘ring.",
      },
    },
    email: {
      label: "Email manzil", placeholder: "siz@example.com", send: "Kod yuborish", sending: "Yuborilmoqda...",
      sentTo: "6 xonali kod yuborildi:", codeLabel: "Tasdiqlash kodi", codePlaceholder: "000000",
      verify: "Tasdiqlash va kirish", verifying: "Tekshirilmoqda...", resend: "Kodni qayta yuborish",
      resendIn: "Qayta yuborish: {s} soniyadan so‘ng", change: "Emailni o‘zgartirish",
      hint: "Xat kelmasa, «Spam» papkasini tekshiring.",
      errors: {
        notConfigured: "Email xizmati sozlanmagan. Hozircha Google orqali kiring.",
        rateLimited: "Juda ko‘p so‘rov. {s} soniyadan so‘ng qayta urinib ko‘ring.",
        sendFailed: "Xatni yuborib bo‘lmadi. Email manzilni tekshiring yoki keyinroq urinib ko‘ring.",
        invalid: "Kod noto‘g‘ri. Qayta tekshiring.",
        expired: "Kod muddati o‘tgan yoki topilmadi. Yangi kod so‘rang.",
        tooMany: "Juda ko‘p noto‘g‘ri urinish. Yangi kod so‘rang.",
        generic: "Xatolik yuz berdi. Qayta urinib ko‘ring.",
      },
    },
    dashboard: {
      metaTitle: "Shaxsiy kabinet — YoshlarMakon",
      sections: { overview: "Umumiy ko‘rinish", proposals: "Mening takliflarim", favorites: "Sevimlilar", settings: "Sozlamalar", orders: "Buyurtmalar", home: "Bosh sahifa" },
      logout: "Chiqish", nav: "Kabinet bo‘limlari", eyebrow: "Shaxsiy kabinet", hello: "Salom, {name}! 👋", friend: "do‘st",
      intro: "Takliflaringiz va sevimli buyurtmalaringiz shu yerda saqlanadi.", findNew: "Yangi buyurtma topish",
      stats: { sent: "Yuborilgan takliflar", pending: "Ko‘rib chiqilmoqda", favorites: "Sevimli buyurtmalar", aria: "Statistika" },
      proposalsTitle: "Mening takliflarim", all: "Barchasi →", favoritesTitle: "Sevimli buyurtmalar", settingsTitle: "Sozlamalar",
      appearance: "Ko‘rinish", appearanceHint: "Yorug‘, qorong‘u yoki tizim bo‘yicha.",
      languageTitle: "Til", languageHint: "O‘zbekcha, ruscha yoki inglizcha.",
      account: "Hisob", memberSince: "A’zo bo‘lgan sana: {date}",
    },
    proposals: {
      metaTitle: "Mening takliflarim — YoshlarMakon", title: "Mening takliflarim", subtitle: "Yuborgan barcha takliflaringiz va ularning holati.",
      emptyTitle: "Hali taklif yubormagansiz", emptyText: "Buyurtmani tanlab, birinchi taklifingizni yuboring.", browse: "Buyurtmalarni ko‘rish",
      status: { PENDING: "Ko‘rib chiqilmoqda", ACCEPTED: "Qabul qilingan", REJECTED: "Rad etilgan" }, portfolio: "Portfolio",
    },
    saved: { empty: "Hali sevimli buyurtma yo‘q. Kartadagi yurakcha belgisini bosing.", remove: "Olib tashlash" },
    server: {
      loginRequired: "Taklif yuborish uchun avval tizimga kiring.",
      orderNotFound: "Buyurtma topilmadi.",
      checkFields: "Ma'lumotlarni tekshiring.",
      duplicate: "Siz '{title}' buyurtmasiga allaqachon taklif yuborgansiz.",
      saveFailed: "Taklifni saqlab bo'lmadi. Qayta urinib ko'ring.",
    },
  },
  ru: {
    meta: {
      title: "YoshlarMakon — Большие возможности начинаются с малых заказов",
      description: "Фриланс-платформа микрозаданий для молодых специалистов. Находите заказы по дизайну, видео и вебу и отправляйте заявки.",
    },
    nav: {
      home: "Главная", orders: "Заказы", how: "Как это работает?", ai: "AI-помощник", proposals: "Заявки",
      login: "Войти", cabinet: "Кабинет", menu: "Меню", mainNav: "Основная навигация", mobileNav: "Мобильная навигация",
      theme: "Тема", language: "Язык",
    },
    theme: { group: "Выбор темы", light: "Светлая", dark: "Тёмная", system: "Системная" },
    modal: { close: "Закрыть" },
    footer: {
      tagline1: "Большие возможности начинаются с малых заказов.", tagline2: "Создайте своё будущее своими руками.",
      platform: "ПЛАТФОРМА", orders: "Заказы", directions: "Направления", how: "Как это работает?",
      forYou: "ДЛЯ ВАС", myProposals: "Мои заявки", saved: "Сохранённые заказы", ai: "AI-помощник",
      bottom: "Для молодёжи. Навстречу возможностям.",
    },
    login: {
      metaTitle: "Вход — YoshlarMakon", badge: "Возможности для молодёжи", heroA: "Большие возможности", heroB: "начинаются с малых заказов!",
      benefits: ["Все сохранённые заказы в одном месте", "История ваших заявок", "Персональные советы от AI-помощника"],
      imageAlt: "Молодой специалист работает над творческим проектом за ноутбуком",
      back: "Главная", welcome: "Добро пожаловать!",
      subtitle: "Войдите через Google или с помощью кода, который придёт на ваш email.",
      google: "Войти через Google", or: "или", browse: "Смотреть заказы без регистрации",
      note: "Чтобы отправлять заявки, сохранять избранное и видеть историю заявок, нужно войти. Просматривать заказы можно без входа.",
      errors: {
        Configuration: "Вход через Google пока не настроен. Администратору нужно проверить redirect URI.",
        AccessDenied: "Доступ запрещён.",
        OAuthCallbackError: "Ошибка связи с Google. Попробуйте ещё раз.",
        OAuthSignin: "Не удалось начать вход через Google. Попробуйте ещё раз.",
        OAuthAccountNotLinked: "Этот email уже зарегистрирован другим способом. Войдите тем же способом.",
        CredentialsSignin: "Неверный или просроченный код.",
        default: "Ошибка входа. Попробуйте ещё раз.",
      },
    },
    email: {
      label: "Email", placeholder: "you@example.com", send: "Получить код", sending: "Отправка...",
      sentTo: "6-значный код отправлен на:", codeLabel: "Код подтверждения", codePlaceholder: "000000",
      verify: "Подтвердить и войти", verifying: "Проверка...", resend: "Отправить код ещё раз",
      resendIn: "Повторная отправка через {s} с", change: "Изменить email",
      hint: "Если письма нет, проверьте папку «Спам».",
      errors: {
        notConfigured: "Почтовый сервис не настроен. Пока войдите через Google.",
        rateLimited: "Слишком много запросов. Повторите через {s} с.",
        sendFailed: "Не удалось отправить письмо. Проверьте email или попробуйте позже.",
        invalid: "Неверный код. Проверьте ещё раз.",
        expired: "Код истёк или не найден. Запросите новый.",
        tooMany: "Слишком много неверных попыток. Запросите новый код.",
        generic: "Произошла ошибка. Попробуйте ещё раз.",
      },
    },
    dashboard: {
      metaTitle: "Личный кабинет — YoshlarMakon",
      sections: { overview: "Обзор", proposals: "Мои заявки", favorites: "Избранное", settings: "Настройки", orders: "Заказы", home: "Главная" },
      logout: "Выйти", nav: "Разделы кабинета", eyebrow: "Личный кабинет", hello: "Привет, {name}! 👋", friend: "друг",
      intro: "Здесь хранятся ваши заявки и избранные заказы.", findNew: "Найти новый заказ",
      stats: { sent: "Отправлено заявок", pending: "На рассмотрении", favorites: "Избранные заказы", aria: "Статистика" },
      proposalsTitle: "Мои заявки", all: "Все →", favoritesTitle: "Избранные заказы", settingsTitle: "Настройки",
      appearance: "Оформление", appearanceHint: "Светлая, тёмная или как в системе.",
      languageTitle: "Язык", languageHint: "Узбекский, русский или английский.",
      account: "Аккаунт", memberSince: "Дата регистрации: {date}",
    },
    proposals: {
      metaTitle: "Мои заявки — YoshlarMakon", title: "Мои заявки", subtitle: "Все отправленные заявки и их статус.",
      emptyTitle: "Вы ещё не отправляли заявок", emptyText: "Выберите заказ и отправьте первую заявку.", browse: "Смотреть заказы",
      status: { PENDING: "На рассмотрении", ACCEPTED: "Принята", REJECTED: "Отклонена" }, portfolio: "Портфолио",
    },
    saved: { empty: "В избранном пока пусто. Нажмите на сердечко на карточке заказа.", remove: "Удалить" },
    server: {
      loginRequired: "Чтобы отправить заявку, сначала войдите в аккаунт.",
      orderNotFound: "Заказ не найден.",
      checkFields: "Проверьте введённые данные.",
      duplicate: "Вы уже отправили заявку на заказ «{title}».",
      saveFailed: "Не удалось сохранить заявку. Попробуйте ещё раз.",
    },
  },
  en: {
    meta: {
      title: "YoshlarMakon — Big opportunities start with small jobs",
      description: "A freelance micro-jobs platform for young professionals. Find design, video and web jobs and send proposals.",
    },
    nav: {
      home: "Home", orders: "Jobs", how: "How it works", ai: "AI assistant", proposals: "Proposals",
      login: "Sign in", cabinet: "Dashboard", menu: "Menu", mainNav: "Main navigation", mobileNav: "Mobile navigation",
      theme: "Theme", language: "Language",
    },
    theme: { group: "Choose theme", light: "Light", dark: "Dark", system: "System" },
    modal: { close: "Close" },
    footer: {
      tagline1: "Big opportunities start with small jobs.", tagline2: "Build your future with your own hands.",
      platform: "PLATFORM", orders: "Jobs", directions: "Categories", how: "How it works",
      forYou: "FOR YOU", myProposals: "My proposals", saved: "Saved jobs", ai: "AI assistant",
      bottom: "For young people. Towards opportunity.",
    },
    login: {
      metaTitle: "Sign in — YoshlarMakon", badge: "Opportunities for young people", heroA: "Big opportunities", heroB: "start with small jobs!",
      benefits: ["All your saved jobs in one place", "Track your proposal history", "Personal tips from the AI assistant"],
      imageAlt: "A young professional working on a creative project on a laptop",
      back: "Home", welcome: "Welcome!",
      subtitle: "Sign in with Google or with a code sent to your email.",
      google: "Continue with Google", or: "or", browse: "Browse jobs without signing up",
      note: "Signing in is required to send proposals, save favourites and see your proposal history. Browsing jobs is open to everyone.",
      errors: {
        Configuration: "Google sign-in isn’t configured yet. The administrator needs to check the redirect URI.",
        AccessDenied: "Access denied.",
        OAuthCallbackError: "Couldn’t connect to Google. Please try again.",
        OAuthSignin: "Couldn’t start Google sign-in. Please try again.",
        OAuthAccountNotLinked: "This email is already registered with another method. Please use that method.",
        CredentialsSignin: "The code is incorrect or has expired.",
        default: "Sign-in failed. Please try again.",
      },
    },
    email: {
      label: "Email address", placeholder: "you@example.com", send: "Send code", sending: "Sending...",
      sentTo: "A 6-digit code was sent to:", codeLabel: "Verification code", codePlaceholder: "000000",
      verify: "Verify and sign in", verifying: "Verifying...", resend: "Resend code",
      resendIn: "Resend in {s}s", change: "Change email",
      hint: "Didn’t get it? Check your Spam folder.",
      errors: {
        notConfigured: "Email service isn’t configured. Please sign in with Google for now.",
        rateLimited: "Too many requests. Try again in {s}s.",
        sendFailed: "Couldn’t send the email. Check the address or try again later.",
        invalid: "Incorrect code. Please check and try again.",
        expired: "The code has expired or wasn’t found. Request a new one.",
        tooMany: "Too many incorrect attempts. Request a new code.",
        generic: "Something went wrong. Please try again.",
      },
    },
    dashboard: {
      metaTitle: "Dashboard — YoshlarMakon",
      sections: { overview: "Overview", proposals: "My proposals", favorites: "Favourites", settings: "Settings", orders: "Jobs", home: "Home" },
      logout: "Sign out", nav: "Dashboard sections", eyebrow: "Your dashboard", hello: "Hi, {name}! 👋", friend: "there",
      intro: "Your proposals and favourite jobs are saved here.", findNew: "Find a new job",
      stats: { sent: "Proposals sent", pending: "Under review", favorites: "Favourite jobs", aria: "Statistics" },
      proposalsTitle: "My proposals", all: "View all →", favoritesTitle: "Favourite jobs", settingsTitle: "Settings",
      appearance: "Appearance", appearanceHint: "Light, dark or match your system.",
      languageTitle: "Language", languageHint: "Uzbek, Russian or English.",
      account: "Account", memberSince: "Member since: {date}",
    },
    proposals: {
      metaTitle: "My proposals — YoshlarMakon", title: "My proposals", subtitle: "All the proposals you’ve sent and their status.",
      emptyTitle: "You haven’t sent any proposals yet", emptyText: "Pick a job and send your first proposal.", browse: "Browse jobs",
      status: { PENDING: "Under review", ACCEPTED: "Accepted", REJECTED: "Declined" }, portfolio: "Portfolio",
    },
    saved: { empty: "No favourites yet. Tap the heart on a job card.", remove: "Remove" },
    server: {
      loginRequired: "Please sign in before sending a proposal.",
      orderNotFound: "Job not found.",
      checkFields: "Please check the form.",
      duplicate: "You’ve already sent a proposal for '{title}'.",
      saveFailed: "Couldn’t save your proposal. Please try again.",
    },
  },
};

/** "{name}" kabi joy egalarini to'ldirish. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}
