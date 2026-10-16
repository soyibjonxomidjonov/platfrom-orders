import type { Messages } from "@/i18n/config";

/** AI yordamchi (klient UI) matnlari. */
export interface AIMessages {
  greeting: string;
  quickActions: {
    recommend: string;
    explain: string;
    improve: string;
    portfolio: string;
  };
  sampleQuestions: string[];
  errors: {
    rateLimit: string;
    notConfigured: string;
    modelFailure: string;
    generic: string;
    timeout: string;
    network: string;
    noReply: string;
  };
  skillsLabelRecommend: string;
  skillsLabelPortfolio: string;
  explainPrompt: string;
  improveInstructions: string;
  fabOpen: string;
  fabClose: string;
  dialogLabel: string;
  title: string;
  subtitle: string;
  thinking: string;
  retry: string;
  skillsHintRecommend: string;
  skillsHintPortfolio: string;
  placeholderSkills: string;
  placeholderChat: string;
  inputLabel: string;
  send: string;
}

const uz: AIMessages = {
  greeting:
    "Salom! Men YoshlarMakon yordamchisiman. Mavjud buyurtmalar bo'yicha maslahat beraman — sizga mos ish toppishdan tortib taklif matningizni yaxshilashgacha. Quyidagilardan birini tanlang yoki savolingizni yozing.",
  quickActions: {
    recommend: "Menga mos ish toping",
    explain: "Buyurtmalarni tushuntir",
    improve: "Taklif matnimni yaxshila",
    portfolio: "Portfolio maslahati",
  },
  sampleQuestions: [
    "Qanday buyurtmalar bor?",
    "Eng yuqori budjetli ish qaysi?",
    "Dizayn bo'yicha nima bor?",
  ],
  errors: {
    rateLimit: "Juda ko'p so'rov yubordingiz. Birozdan so'ng qayta urinib ko'ring.",
    notConfigured: "AI hozircha sozlanmagan. Keyinroq urinib ko'ring.",
    modelFailure: "AI bilan bog'lanishda xatolik yuz berdi. Qayta urinib ko'ring.",
    generic: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    timeout: "Javob juda uzoq kutildi (vaqt tugadi). Qayta urinib ko'ring.",
    network: "Tarmoq xatosi. Internetni tekshirib, qayta urinib ko'ring.",
    noReply: "Kechirasiz, javob topilmadi.",
  },
  skillsLabelRecommend: "Ko'nikmalarim: ",
  skillsLabelPortfolio: "Portfolio uchun ko'nikmalarim: ",
  explainPrompt:
    "Buyurtmalarni tushuntir. Qaysi buyurtma qiziqtiradi — B01, B02, B03, B04, B05 yoki B06?",
  improveInstructions:
    "Taklif matningizni yaxshilashim uchun quyidagi ko'rinishda yozing: avval buyurtma kodini (masalan B05), so'ng taklif matningizni. Men uni shu buyurtmaga moslab yaxshilab beraman.",
  fabOpen: "AI yordamchini ochish",
  fabClose: "Yordamchini yopish",
  dialogLabel: "AI yordamchi oynasi",
  title: "AI Yordamchi",
  subtitle: "Buyurtmalar bo'yicha maslahat",
  thinking: "o'ylamoqda...",
  retry: "Qayta urinish",
  skillsHintRecommend: "Ko'nikmalaringizni yozing (masalan: Figma, montaj, React)",
  skillsHintPortfolio: "Portfolio uchun ko'nikmalaringizni yozing",
  placeholderSkills: "Ko'nikmalar...",
  placeholderChat: "Savolingizni yozing...",
  inputLabel: "Xabar matni",
  send: "Yuborish",
};

const ru: AIMessages = {
  greeting:
    "Здравствуйте! Я помощник YoshlarMakon. Я консультирую по доступным заказам — от подбора подходящей работы до улучшения текста вашего отклика. Выберите один из вариантов ниже или напишите свой вопрос.",
  quickActions: {
    recommend: "Подберите мне работу",
    explain: "Объясни заказы",
    improve: "Улучши мой отклик",
    portfolio: "Советы по портфолио",
  },
  sampleQuestions: [
    "Какие есть заказы?",
    "Какой заказ с самым большим бюджетом?",
    "Что есть по дизайну?",
  ],
  errors: {
    rateLimit: "Вы отправили слишком много запросов. Попробуйте ещё раз чуть позже.",
    notConfigured: "AI пока не настроен. Попробуйте позже.",
    modelFailure: "Не удалось связаться с AI. Попробуйте ещё раз.",
    generic: "Произошла ошибка. Попробуйте ещё раз.",
    timeout: "Ответ занял слишком много времени (время ожидания истекло). Попробуйте ещё раз.",
    network: "Ошибка сети. Проверьте подключение к интернету и попробуйте ещё раз.",
    noReply: "Извините, ответ не получен.",
  },
  skillsLabelRecommend: "Мои навыки: ",
  skillsLabelPortfolio: "Мои навыки для портфолио: ",
  explainPrompt:
    "Объясни заказы. Какой заказ вас интересует — B01, B02, B03, B04, B05 или B06?",
  improveInstructions:
    "Чтобы я улучшил ваш отклик, напишите в таком виде: сначала код заказа (например, B05), затем текст отклика. Я доработаю его под этот заказ.",
  fabOpen: "Открыть AI-помощника",
  fabClose: "Закрыть помощника",
  dialogLabel: "Окно AI-помощника",
  title: "AI-помощник",
  subtitle: "Консультации по заказам",
  thinking: "думает...",
  retry: "Повторить",
  skillsHintRecommend: "Укажите ваши навыки (например: Figma, монтаж, React)",
  skillsHintPortfolio: "Укажите ваши навыки для портфолио",
  placeholderSkills: "Навыки...",
  placeholderChat: "Напишите ваш вопрос...",
  inputLabel: "Текст сообщения",
  send: "Отправить",
};

const en: AIMessages = {
  greeting:
    "Hi! I'm the YoshlarMakon assistant. I can help with the available jobs — from finding one that fits you to polishing your proposal. Pick an option below or type your question.",
  quickActions: {
    recommend: "Find a job for me",
    explain: "Explain the jobs",
    improve: "Improve my proposal",
    portfolio: "Portfolio tips",
  },
  sampleQuestions: [
    "What jobs are available?",
    "Which job has the highest budget?",
    "What is there for design?",
  ],
  errors: {
    rateLimit: "You've sent too many requests. Please try again in a moment.",
    notConfigured: "AI isn't configured yet. Please try again later.",
    modelFailure: "Something went wrong while contacting the AI. Please try again.",
    generic: "Something went wrong. Please try again.",
    timeout: "The response took too long (timed out). Please try again.",
    network: "Network error. Check your internet connection and try again.",
    noReply: "Sorry, no reply was received.",
  },
  skillsLabelRecommend: "My skills: ",
  skillsLabelPortfolio: "My skills for the portfolio: ",
  explainPrompt:
    "Explain the jobs. Which job are you interested in — B01, B02, B03, B04, B05 or B06?",
  improveInstructions:
    "To improve your proposal, write it like this: first the job code (e.g. B05), then your proposal text. I'll tailor and improve it for that job.",
  fabOpen: "Open AI assistant",
  fabClose: "Close assistant",
  dialogLabel: "AI assistant window",
  title: "AI Assistant",
  subtitle: "Advice on available jobs",
  thinking: "thinking...",
  retry: "Try again",
  skillsHintRecommend: "Enter your skills (e.g. Figma, video editing, React)",
  skillsHintPortfolio: "Enter your skills for the portfolio",
  placeholderSkills: "Skills...",
  placeholderChat: "Type your question...",
  inputLabel: "Message text",
  send: "Send",
};

export const aiMessages: Messages<AIMessages> = { uz, ru, en };
