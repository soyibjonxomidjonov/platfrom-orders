import type { Locale } from "@/i18n/config";
import type { Order } from "@/types/order";

/**
 * Buyurtma matnlarining ru/en tarjimalari. ID, kategoriya kaliti va budjet o'zgarmaydi.
 * O'zbekcha (asl) ma'lumot seed-orders.ts da — "uz" uchun hech narsa o'zgartirilmaydi.
 * Qidiruv `order.id` bo'yicha bo'lgani uchun localizeOrder idempotent (qayta chaqirish xavfsiz).
 */
type OrderText = Pick<Order, "title" | "summary" | "description" | "skills" | "deadline">;
const TRANSLATIONS: Partial<Record<Exclude<Locale, "uz">, Record<string, OrderText>>> = {
  ru: {
    B01: {
      title: "Дизайн меню для кафе",
      summary: "Дизайн меню для современного кафе (A4, 2 страницы).",
      description:
        "Небольшому семейному кафе нужен красивый и удобный для чтения дизайн меню. " +
        "Формат A4 на двух страницах, блюда разделены по разделам, фирменные цвета — тёплые и уютные. " +
        "Итоговый результат сдаётся в формате PDF и в виде редактируемого исходного файла.",
      skills: ["Figma", "Типографика", "Брендинг"],
      deadline: "3 дня",
    },
    B02: {
      title: "Афиша для магазина",
      summary: "Заметная афиша для акции со скидками (A3).",
      description:
        "Для сезонной распродажи местного магазина нужна афиша формата A3. " +
        "На ней должны быть привлекающий внимание заголовок, чёткий процент скидки и логотип магазина. " +
        "Нужна версия, готовая к печати (CMYK, 300 dpi), и квадратная версия для социальных сетей.",
      skills: ["Photoshop", "Illustrator", "Композиция"],
      deadline: "2 дня",
    },
    B03: {
      title: "Монтаж 30-секундного ролика",
      summary: "Динамичный 30-секундный монтаж для Instagram Reels.",
      description:
        "Предоставляется готовый видеоматериал (5 минут). Из него нужно сделать увлекательный 30-секундный Reels: " +
        "динамичная нарезка, трендовая музыка, текстовые анимации и яркие цвета. " +
        "Вертикальный формат 9:16, 1080x1920.",
      skills: ["Premiere Pro", "CapCut", "Ритмичный монтаж"],
      deadline: "2 дня",
    },
    B04: {
      title: "Добавление субтитров к видео",
      summary: "Точные узбекские субтитры для 10-минутного видео.",
      description:
        "К 10-минутному видеоинтервью нужно добавить точные и синхронизированные по времени субтитры на узбекском языке. " +
        "Субтитры должны быть набраны легко читаемым шрифтом, располагаться в нижней части экрана и контрастировать с фоном. " +
        "Сдаются SRT-файл и видео с вшитыми субтитрами.",
      skills: ["Субтитры", "Редактура", "Узбекский язык"],
      deadline: "1 день",
    },
    B05: {
      title: "Создание одностраничного сайта",
      summary: "Адаптивный лендинг для продукта.",
      description:
        "Нужен одностраничный лендинг, представляющий новый продукт. " +
        "Должны быть hero-блок, раздел с возможностями, цены и форма обратной связи. " +
        "Полностью адаптивный (мобильные/планшеты/десктоп), быстро загружающийся, с современным дизайном.",
      skills: ["HTML/CSS", "React", "Адаптивный дизайн"],
      deadline: "5 дней",
    },
    B06: {
      title: "Обновление текста на сайте",
      summary: "Обновление текстов и изображений на существующем сайте.",
      description:
        "На существующем HTML-сайте нужно обновить тексты на нескольких страницах и заменить старые изображения. " +
        "Данные для входа будут предоставлены. После внесения изменений необходимо проверить, что сайт корректно отображается и на мобильных устройствах.",
      skills: ["HTML", "Контент", "Мелкие правки"],
      deadline: "1 день",
    },
  },
  en: {
    B01: {
      title: "Café menu design",
      summary: "Menu design for a modern café (A4, 2 pages).",
      description:
        "A small family café needs a beautiful, easy-to-read menu design. " +
        "Two-page A4 format, dishes grouped into sections, with warm and inviting brand colours. " +
        "The final result is delivered as a PDF along with an editable source file.",
      skills: ["Figma", "Typography", "Branding"],
      deadline: "3 days",
    },
    B02: {
      title: "Shop poster",
      summary: "An eye-catching poster for a sale campaign (A3).",
      description:
        "A local shop needs an A3 poster for its seasonal sale. " +
        "It should feature an attention-grabbing headline, a clear discount percentage and the shop logo. " +
        "Both a print-ready version (CMYK, 300 dpi) and a square version for social media are required.",
      skills: ["Photoshop", "Illustrator", "Composition"],
      deadline: "2 days",
    },
    B03: {
      title: "30-second video edit",
      summary: "A dynamic 30-second edit for Instagram Reels.",
      description:
        "Ready-made footage (5 minutes) will be provided. Turn it into an engaging 30-second Reel: " +
        "dynamic cuts, trending music, text animations and vivid colours. " +
        "Vertical 9:16 format, 1080x1920.",
      skills: ["Premiere Pro", "CapCut", "Rhythmic editing"],
      deadline: "2 days",
    },
    B04: {
      title: "Adding subtitles to a video",
      summary: "Accurate Uzbek subtitles for a 10-minute video.",
      description:
        "A 10-minute interview video needs accurate, well-timed subtitles in Uzbek. " +
        "Subtitles should use an easy-to-read font, sit at the bottom of the screen and contrast with the background. " +
        "Deliverables: an SRT file and a video with burned-in subtitles.",
      skills: ["Subtitling", "Editing", "Uzbek language"],
      deadline: "1 day",
    },
    B05: {
      title: "One-page website",
      summary: "A responsive landing page for a product.",
      description:
        "We need a one-page landing page introducing a new product. " +
        "It should include a hero section, features, pricing and a contact form. " +
        "Fully responsive (mobile/tablet/desktop), fast-loading and with a modern design.",
      skills: ["HTML/CSS", "React", "Responsive design"],
      deadline: "5 days",
    },
    B06: {
      title: "Updating website copy",
      summary: "Update text and images on an existing website.",
      description:
        "On an existing HTML website, the text on several pages needs updating and old images need replacing. " +
        "Login details will be provided. After the changes, check that the site also works correctly on mobile.",
      skills: ["HTML", "Content", "Minor fixes"],
      deadline: "1 day",
    },
  },
};

export function localizeOrder(order: Order, locale: Locale): Order {
  if (locale === "uz") return order;
  const t = TRANSLATIONS[locale]?.[order.id];
  return t ? { ...order, ...t } : order;
}

export function localizeOrders(orders: Order[], locale: Locale): Order[] {
  return orders.map((o) => localizeOrder(o, locale));
}
