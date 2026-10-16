// Faqat serverda import qilinadi (API route). LLM kaliti brauzerga chiqmaydi.
// (`server-only` paketi loyihada mavjud emas, shuning uchun import qilinmaydi;
//  bu modul faqat server kontekstidan chaqiriladi.)
import {
  groq,
  GROQ_MODEL,
  GROQ_FALLBACK_MODEL,
} from "@/lib/groq";
import { SEED_ORDERS, getOrderById } from "@/data/seed-orders";
import { localizeOrder, localizeOrders } from "@/data/order-translations";
import { formatPrice, type Locale } from "@/i18n/config";
import { categoryLabel } from "@/i18n/categories";

/**
 * Server-only AI xizmati — Groq orqali 6 ta mavjud buyurtma asosida javob beradi.
 * LLM kaliti hech qachon brauzerga chiqmaydi (bu fayl faqat serverda ishlaydi).
 */

type ChatRole = "user" | "assistant";
export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const MODEL_TIMEOUT_MS = 15_000;

/**
 * Xavfsiz, ichki xatolik kodi. Foydalanuvchiga ko'rinadigan matnlarni
 * route (joriy tilda) ishlab chiqaradi.
 */
const SAFE_ERROR = "ai_unavailable";

/* -------------------------------------------------------------------------- */
/*  System prompt                                                              */
/* -------------------------------------------------------------------------- */

/** Model javob berishi kerak bo'lgan til nomi. */
const LANGUAGE_NAME: Record<Locale, string> = {
  uz: "O'zbek tili (lotin yozuvi)",
  ru: "русский язык",
  en: "English",
};

/** Prompt qismlari — har bir til uchun. */
interface PromptText {
  intro: string;
  rulesTitle: string;
  rules: string[];
  jobsTitle: string;
  category: string;
  budget: string;
  deadline: string;
  recommend: string;
  explain: string;
  improve: string;
  portfolio: string;
  recommendUser: (skills: string) => string;
  explainUser: (id: string, title: string, description: string) => string;
  improveUser: (id: string, title: string, draft: string) => string;
  portfolioUser: (skills: string) => string;
}

const PROMPTS: Record<Locale, PromptText> = {
  uz: {
    intro: "Siz «YoshlarMakon» frilans platformasining aqlli yordamchisisiz.",
    rulesTitle: "QAT'IY QOIDALAR:",
    rules: [
      `Faqat ${LANGUAGE_NAME.uz}da javob bering — foydalanuvchi boshqa tilda yozsa ham.`,
      "Faqat quyidagi ro'yxatdagi MAVJUD buyurtmalar haqida gapiring.",
      "Yangi buyurtma, yangi budjet, yangi muddat yoki kafolatlangan natija O'YLAB TOPMANG.",
      "Buyurtmaga ishora qilganda uni ANIQ IDsi bilan ko'rsating (masalan B01).",
      "Qisqa, aniq va foydali javob bering. Haqiqatga asoslaning.",
    ],
    jobsTitle: "MAVJUD BUYURTMALAR:",
    category: "kategoriya",
    budget: "budjet",
    deadline: "muddat",
    recommend:
      "Foydalanuvchining ko'nikmalariga eng mos keladigan 1-3 ta buyurtmani " +
      "tanlang. Har birini IDsi bilan ko'rsating va nega mos kelishini qisqa " +
      "tushuntiring. Mos buyurtma bo'lmasa, buni halol ayting.",
    explain:
      "Foydalanuvchiga tanlangan buyurtmani sodda tilda tushuntiring: nima " +
      "qilish kerakligi, qanday ko'nikmalar zarurligi, nimaga e'tibor berish " +
      "lozimligi. Faqat shu buyurtma ma'lumotidan foydalaning.",
    improve:
      "Foydalanuvchining taklif (ariza) matnini shu buyurtmaga moslab " +
      "yaxshilang: aniqroq, ishonchli va professional qiling. Yolg'on " +
      "tajriba yoki kafolat qo'shmang. Yaxshilangan matnni va qisqa " +
      "izohlarni bering.",
    portfolio:
      "Foydalanuvchining ko'nikmalari asosida portfoliosini qanday " +
      "yaxshilash bo'yicha amaliy maslahatlar bering. Platformadagi mavjud " +
      "buyurtmalar turlariga mos ishlar qo'shishni tavsiya qiling (mos " +
      "buyurtma IDsini ko'rsating).",
    recommendUser: (skills) =>
      `Mening ko'nikmalarim: ${skills}. Menga qaysi buyurtmalar mos keladi?`,
    explainUser: (id, title, description) =>
      `[${id}] "${title}" buyurtmasini menga tushuntirib bering. To'liq tavsif: ${description}`,
    improveUser: (id, title, draft) =>
      `[${id}] "${title}" buyurtmasi uchun taklif matnim:\n\n${draft}\n\nUni yaxshilab bering.`,
    portfolioUser: (skills) =>
      `Mening ko'nikmalarim: ${skills}. Portfoliomni qanday yaxshilashim mumkin?`,
  },
  ru: {
    intro: "Вы — умный помощник фриланс-платформы «YoshlarMakon».",
    rulesTitle: "СТРОГИЕ ПРАВИЛА:",
    rules: [
      `Отвечайте ТОЛЬКО на языке: ${LANGUAGE_NAME.ru} — даже если пользователь пишет на другом языке.`,
      "Говорите только о СУЩЕСТВУЮЩИХ заказах из списка ниже.",
      "НЕ ВЫДУМЫВАЙТЕ новые заказы, бюджеты, сроки или гарантированные результаты.",
      "Упоминая заказ, указывайте его ТОЧНЫЙ ID (например, B01).",
      "Отвечайте кратко, точно и по делу. Опирайтесь только на факты.",
    ],
    jobsTitle: "ДОСТУПНЫЕ ЗАКАЗЫ:",
    category: "категория",
    budget: "бюджет",
    deadline: "срок",
    recommend:
      "Выберите 1–3 заказа, которые лучше всего подходят под навыки пользователя. " +
      "Укажите ID каждого и кратко объясните, почему он подходит. " +
      "Если подходящих заказов нет, честно скажите об этом.",
    explain:
      "Простыми словами объясните пользователю выбранный заказ: что нужно " +
      "сделать, какие навыки требуются, на что обратить внимание. " +
      "Используйте только данные этого заказа.",
    improve:
      "Улучшите текст отклика пользователя под этот заказ: сделайте его " +
      "точнее, убедительнее и профессиональнее. Не добавляйте вымышленный " +
      "опыт или гарантии. Приведите улучшенный текст и краткие пояснения.",
    portfolio:
      "На основе навыков пользователя дайте практические советы по улучшению " +
      "портфолио. Порекомендуйте добавить работы, соответствующие типам " +
      "заказов на платформе (укажите ID подходящих заказов).",
    recommendUser: (skills) =>
      `Мои навыки: ${skills}. Какие заказы мне подходят?`,
    explainUser: (id, title, description) =>
      `Объясните мне заказ [${id}] «${title}». Полное описание: ${description}`,
    improveUser: (id, title, draft) =>
      `Мой отклик на заказ [${id}] «${title}»:\n\n${draft}\n\nПожалуйста, улучшите его.`,
    portfolioUser: (skills) =>
      `Мои навыки: ${skills}. Как мне улучшить портфолио?`,
  },
  en: {
    intro: "You are the smart assistant of the «YoshlarMakon» freelance platform.",
    rulesTitle: "STRICT RULES:",
    rules: [
      `Answer ONLY in ${LANGUAGE_NAME.en}, even if the user writes in another language.`,
      "Talk only about the EXISTING jobs listed below.",
      "Do NOT invent new jobs, budgets, deadlines or guaranteed outcomes.",
      "When referring to a job, always use its EXACT ID (e.g. B01).",
      "Be brief, precise and helpful. Stick to the facts.",
    ],
    jobsTitle: "AVAILABLE JOBS:",
    category: "category",
    budget: "budget",
    deadline: "deadline",
    recommend:
      "Pick the 1–3 jobs that best match the user's skills. Reference each " +
      "by its ID and briefly explain why it fits. If no job fits, say so honestly.",
    explain:
      "Explain the selected job to the user in plain language: what needs to " +
      "be done, which skills are required and what to pay attention to. " +
      "Use only this job's information.",
    improve:
      "Improve the user's proposal text for this job: make it clearer, more " +
      "convincing and professional. Do not add fake experience or guarantees. " +
      "Provide the improved text and short notes.",
    portfolio:
      "Based on the user's skills, give practical advice on improving their " +
      "portfolio. Recommend adding work that matches the types of jobs on the " +
      "platform (reference the matching job IDs).",
    recommendUser: (skills) =>
      `My skills: ${skills}. Which jobs are a good fit for me?`,
    explainUser: (id, title, description) =>
      `Please explain the job [${id}] "${title}" to me. Full description: ${description}`,
    improveUser: (id, title, draft) =>
      `My proposal for the job [${id}] "${title}":\n\n${draft}\n\nPlease improve it.`,
    portfolioUser: (skills) =>
      `My skills: ${skills}. How can I improve my portfolio?`,
  },
};

function buildJobsList(locale: Locale): string {
  const p = PROMPTS[locale];
  return localizeOrders(SEED_ORDERS, locale)
    .map(
      (o) =>
        `- [${o.id}] ${o.title} — ${p.category}: ${categoryLabel(
          o.category,
          locale,
        )}; ${p.budget}: ${formatPrice(o.budget, locale)}; ${p.deadline}: ${
          o.deadline
        }. ${o.summary}`,
    )
    .join("\n");
}

function buildSystemPrompt(locale: Locale, extra?: string): string {
  const p = PROMPTS[locale];
  return [
    p.intro,
    "",
    p.rulesTitle,
    ...p.rules.map((r, i) => `${i + 1}. ${r}`),
    "",
    p.jobsTitle,
    buildJobsList(locale),
    extra ? "\n" + extra : "",
    "",
    // Til talabini oxirida yana takrorlaymiz — model uni unutmasligi uchun.
    p.rules[0],
  ]
    .filter(Boolean)
    .join("\n");
}

/* -------------------------------------------------------------------------- */
/*  Groq chaqiruvi — timeout + bir martalik fallback                           */
/* -------------------------------------------------------------------------- */

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("timeout"));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

interface CompletionMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callModel(
  model: string,
  messages: CompletionMessage[],
): Promise<string> {
  const completion = await withTimeout(
    groq.chat.completions.create({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 700,
    }),
    MODEL_TIMEOUT_MS,
  );
  return completion.choices[0]?.message?.content?.trim() ?? "";
}

/**
 * Asosiy model bilan urinadi, xatolik/timeout bo'lsa bir marta fallback modelga
 * o'tadi. Ikkalasi ham muvaffaqiyatsiz bo'lsa xavfsiz Error tashlaydi.
 */
async function runCompletion(messages: CompletionMessage[]): Promise<string> {
  try {
    const reply = await callModel(GROQ_MODEL, messages);
    if (reply) return reply;
    throw new Error("empty");
  } catch (primaryErr) {
    console.error("[ai/service] primary model failed:", primaryErr);
    try {
      const reply = await callModel(GROQ_FALLBACK_MODEL, messages);
      if (reply) return reply;
      throw new Error("empty");
    } catch (fallbackErr) {
      console.error("[ai/service] fallback model failed:", fallbackErr);
      throw new Error(SAFE_ERROR);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  ID validatsiyasi                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Matndan Bxx shaklidagi IDlarni ajratib oladi va faqat SEED_ORDERS da
 * HAQIQATAN mavjud bo'lganlarini (tartibini saqlab, takrorsiz) qaytaradi.
 */
function extractValidOrderIds(text: string): string[] {
  const matches = text.match(/\bB\d{2}\b/gi) ?? [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of matches) {
    const order = getOrderById(raw);
    if (order && !seen.has(order.id)) {
      seen.add(order.id);
      result.push(order.id);
    }
  }
  return result;
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                 */
/* -------------------------------------------------------------------------- */

/** Umumiy suhbat — 6 ta buyurtmaga asoslangan. */
export async function chat(
  messages: ChatMessage[],
  locale: Locale,
): Promise<{ reply: string; suggestedOrderIds: string[] }> {
  const trimmed = (Array.isArray(messages) ? messages : [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.trim() }));

  if (trimmed.length === 0) {
    throw new Error("empty_messages");
  }

  const payload: CompletionMessage[] = [
    { role: "system", content: buildSystemPrompt(locale) },
    ...trimmed,
  ];

  const reply = await runCompletion(payload);
  return { reply, suggestedOrderIds: extractValidOrderIds(reply) };
}

/** Ko'nikmalarga mos buyurtmalarni tavsiya qiladi. */
export async function recommendJobs(
  skills: string,
  locale: Locale,
): Promise<{ reply: string; orderIds: string[] }> {
  const clean = (skills ?? "").trim();
  if (!clean) {
    throw new Error("empty_skills");
  }

  const payload: CompletionMessage[] = [
    {
      role: "system",
      content: buildSystemPrompt(locale, PROMPTS[locale].recommend),
    },
    {
      role: "user",
      content: PROMPTS[locale].recommendUser(clean),
    },
  ];

  const reply = await runCompletion(payload);
  return { reply, orderIds: extractValidOrderIds(reply) };
}

/** Bitta buyurtmani batafsil tushuntiradi. */
export async function explainJob(
  orderId: string,
  locale: Locale,
): Promise<{ reply: string }> {
  const base = getOrderById((orderId ?? "").trim());
  if (!base) {
    throw new Error("order_not_found");
  }
  const order = localizeOrder(base, locale);

  const payload: CompletionMessage[] = [
    {
      role: "system",
      content: buildSystemPrompt(locale, PROMPTS[locale].explain),
    },
    {
      role: "user",
      content: PROMPTS[locale].explainUser(order.id, order.title, order.description),
    },
  ];

  const reply = await runCompletion(payload);
  return { reply };
}

/** Taklif (proposal) matnini yaxshilaydi. */
export async function improveProposal(
  orderId: string,
  draft: string,
  locale: Locale,
): Promise<{ reply: string }> {
  const base = getOrderById((orderId ?? "").trim());
  if (!base) {
    throw new Error("order_not_found");
  }
  const order = localizeOrder(base, locale);
  const clean = (draft ?? "").trim();
  if (!clean) {
    throw new Error("empty_draft");
  }

  const payload: CompletionMessage[] = [
    {
      role: "system",
      content: buildSystemPrompt(locale, PROMPTS[locale].improve),
    },
    {
      role: "user",
      content: PROMPTS[locale].improveUser(order.id, order.title, clean),
    },
  ];

  const reply = await runCompletion(payload);
  return { reply };
}

/** Portfolio yaxshilash bo'yicha maslahat beradi. */
export async function suggestPortfolioImprovements(
  skills: string,
  locale: Locale,
): Promise<{ reply: string }> {
  const clean = (skills ?? "").trim();
  if (!clean) {
    throw new Error("empty_skills");
  }

  const payload: CompletionMessage[] = [
    {
      role: "system",
      content: buildSystemPrompt(locale, PROMPTS[locale].portfolio),
    },
    {
      role: "user",
      content: PROMPTS[locale].portfolioUser(clean),
    },
  ];

  const reply = await runCompletion(payload);
  return { reply };
}
