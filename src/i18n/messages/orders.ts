import type { Messages } from "@/i18n/config";

export type OrdersMessages = {
  card: {
    detailsAria: (title: string) => string;
    budget: string;
    details: string;
  };
  favorite: { add: string; remove: string };
  details: {
    back: string;
    description: string;
    skills: string;
    howTo: string;
    steps: string[];
    budget: string;
    category: string;
    deadline: string;
    code: string;
    apply: string;
    loginToApply: string;
    noteSignedIn: (name: string) => string;
    noteNoName: string;
    noteLogin: string;
    aiTitle: string;
    aiText: string;
    related: string;
  };
  modal: {
    title: string;
    successTitle: string;
    /** Ism (qalin) dan keyingi matn: "<strong>{name}</strong>{successRest(title)}" */
    successRest: (orderTitle: string) => string;
    viewProposals: string;
    close: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    urlLabel: string;
    urlPlaceholder: string;
    urlHint: string;
    networkError: string;
    cancel: string;
    submitting: string;
    submit: string;
  };
  notFound: string;
};

export const ordersMessages: Messages<OrdersMessages> = {
  uz: {
    card: {
      detailsAria: (t) => `${t} — tafsilotlar`,
      budget: "Loyiha budjeti",
      details: "Batafsil",
    },
    favorite: { add: "Sevimlilarga qo'shish", remove: "Sevimlilardan olib tashlash" },
    details: {
      back: "Buyurtmalarga qaytish",
      description: "Loyiha tavsifi",
      skills: "Kerakli ko‘nikmalar",
      howTo: "Qanday taklif yuboriladi?",
      steps: [
        "Tavsif va kerakli ko‘nikmalar bilan tanishing.",
        "Google orqali tizimga kiring va «Taklif yuborish» tugmasini bosing.",
        "Ismingiz va portfolio havolangizni kiriting — taklif kabinetingizda saqlanadi.",
      ],
      budget: "Loyiha budjeti",
      category: "Kategoriya",
      deadline: "Muddat",
      code: "Buyurtma kodi",
      apply: "Taklif yuborish",
      loginToApply: "Taklif yuborish uchun kiring",
      noteSignedIn: (n) => `${n} sifatida kirgansiz. Taklifingiz kabinetingizda saqlanadi.`,
      noteNoName: "Ism va portfolio havolasini kiriting.",
      noteLogin:
        "Taklif yuborish uchun Google orqali tizimga kirish kerak. Kirgandan so‘ng shu sahifaga qaytasiz.",
      aiTitle: "Taklif yozishda yordam kerakmi?",
      aiText: "O‘ng pastdagi AI yordamchidan taklif matningizni yaxshilashni so‘rang.",
      related: "Boshqa buyurtmalar",
    },
    modal: {
      title: "Taklif yuborish",
      successTitle: "Taklifingiz qabul qilindi!",
      successRest: (t) => `, sizning '${t}' buyurtmasi uchun taklifingiz muvaffaqiyatli qabul qilindi.`,
      viewProposals: "Takliflarimni ko‘rish",
      close: "Yopish",
      nameLabel: "Ism",
      namePlaceholder: "Masalan: Aziz Karimov",
      nameError: "Ism",
      urlLabel: "Portfolio havolasi",
      urlPlaceholder: "https://behance.net/ismingiz",
      urlHint: "Havola http:// yoki https:// bilan boshlanishi kerak.",
      networkError: "Tarmoq xatosi. Qayta urinib ko'ring.",
      cancel: "Bekor qilish",
      submitting: "Yuborilmoqda...",
      submit: "Taklifni yuborish",
    },
    notFound: "Buyurtma topilmadi",
  },
  ru: {
    card: {
      detailsAria: (t) => `${t} — подробнее`,
      budget: "Бюджет проекта",
      details: "Подробнее",
    },
    favorite: { add: "Добавить в избранное", remove: "Удалить из избранного" },
    details: {
      back: "Назад к заказам",
      description: "Описание проекта",
      skills: "Необходимые навыки",
      howTo: "Как отправить заявку?",
      steps: [
        "Ознакомьтесь с описанием и необходимыми навыками.",
        "Войдите через Google и нажмите кнопку «Отправить заявку».",
        "Укажите имя и ссылку на портфолио — заявка сохранится в вашем кабинете.",
      ],
      budget: "Бюджет проекта",
      category: "Категория",
      deadline: "Срок",
      code: "Код заказа",
      apply: "Отправить заявку",
      loginToApply: "Войдите, чтобы отправить заявку",
      noteSignedIn: (n) => `Вы вошли как ${n}. Ваша заявка сохранится в кабинете.`,
      noteNoName: "Укажите имя и ссылку на портфолио.",
      noteLogin:
        "Чтобы отправить заявку, войдите через Google. После входа вы вернётесь на эту страницу.",
      aiTitle: "Нужна помощь с заявкой?",
      aiText: "Попросите AI-помощника в правом нижнем углу улучшить текст вашей заявки.",
      related: "Другие заказы",
    },
    modal: {
      title: "Отправить заявку",
      successTitle: "Ваша заявка принята!",
      successRest: (t) => `, ваша заявка на заказ «${t}» успешно принята.`,
      viewProposals: "Мои заявки",
      close: "Закрыть",
      nameLabel: "Имя",
      namePlaceholder: "Например: Азиз Каримов",
      nameError: "Имя",
      urlLabel: "Ссылка на портфолио",
      urlPlaceholder: "https://behance.net/vashe-imya",
      urlHint: "Ссылка должна начинаться с http:// или https://.",
      networkError: "Ошибка сети. Попробуйте ещё раз.",
      cancel: "Отмена",
      submitting: "Отправка...",
      submit: "Отправить заявку",
    },
    notFound: "Заказ не найден",
  },
  en: {
    card: {
      detailsAria: (t) => `${t} — details`,
      budget: "Project budget",
      details: "Details",
    },
    favorite: { add: "Add to favourites", remove: "Remove from favourites" },
    details: {
      back: "Back to orders",
      description: "Project description",
      skills: "Required skills",
      howTo: "How to submit a proposal?",
      steps: [
        "Read the description and the required skills.",
        "Sign in with Google and click “Submit proposal”.",
        "Enter your name and portfolio link — the proposal is saved in your dashboard.",
      ],
      budget: "Project budget",
      category: "Category",
      deadline: "Deadline",
      code: "Order code",
      apply: "Submit proposal",
      loginToApply: "Sign in to submit a proposal",
      noteSignedIn: (n) => `Signed in as ${n}. Your proposal will be saved in your dashboard.`,
      noteNoName: "Enter your name and portfolio link.",
      noteLogin:
        "You need to sign in with Google to submit a proposal. After signing in you’ll return to this page.",
      aiTitle: "Need help writing a proposal?",
      aiText: "Ask the AI assistant in the bottom-right corner to improve your proposal text.",
      related: "Other orders",
    },
    modal: {
      title: "Submit proposal",
      successTitle: "Proposal received!",
      successRest: (t) => `, your proposal for '${t}' has been successfully received.`,
      viewProposals: "View my proposals",
      close: "Close",
      nameLabel: "Name",
      namePlaceholder: "e.g. Aziz Karimov",
      nameError: "Name",
      urlLabel: "Portfolio link",
      urlPlaceholder: "https://behance.net/yourname",
      urlHint: "The link must start with http:// or https://.",
      networkError: "Network error. Please try again.",
      cancel: "Cancel",
      submitting: "Sending...",
      submit: "Submit proposal",
    },
    notFound: "Order not found",
  },
};
