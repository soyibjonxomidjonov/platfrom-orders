import { NextResponse } from "next/server";
import { isGroqConfigured } from "@/lib/groq";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import {
  chat,
  recommendJobs,
  explainJob,
  improveProposal,
  suggestPortfolioImprovements,
  type ChatMessage,
} from "@/lib/ai/service";
import { isLocale, type Locale, type Messages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export const runtime = "nodejs";

type Mode = "chat" | "recommend" | "explain" | "improve" | "portfolio";
const MODES: Mode[] = ["chat", "recommend", "explain", "improve", "portfolio"];

interface Body {
  messages?: ChatMessage[];
  mode?: string;
  orderId?: string;
  skills?: string;
  draft?: string;
  locale?: string;
}

/** Foydalanuvchiga qaytariladigan xatolik matnlari (har bir til uchun). */
interface RouteErrors {
  notConfigured: string;
  rateLimit: string;
  badRequest: string;
  skillsRequired: string;
  orderRequired: string;
  orderAndDraftRequired: string;
  questionRequired: string;
  modelFailure: string;
}

const ERRORS: Messages<RouteErrors> = {
  uz: {
    notConfigured: "AI sozlanmagan.",
    rateLimit: "Juda ko'p so'rov. Birozdan so'ng urinib ko'ring.",
    badRequest: "Noto'g'ri so'rov.",
    skillsRequired: "Ko'nikmalarni kiriting.",
    orderRequired: "Buyurtma tanlanmagan.",
    orderAndDraftRequired: "Buyurtma va taklif matnini kiriting.",
    questionRequired: "Savol matnini kiriting.",
    modelFailure: "AI bilan bog'lanishda xatolik. Qayta urinib ko'ring.",
  },
  ru: {
    notConfigured: "AI не настроен.",
    rateLimit: "Слишком много запросов. Попробуйте чуть позже.",
    badRequest: "Некорректный запрос.",
    skillsRequired: "Укажите навыки.",
    orderRequired: "Заказ не выбран.",
    orderAndDraftRequired: "Укажите заказ и текст отклика.",
    questionRequired: "Введите текст вопроса.",
    modelFailure: "Ошибка связи с AI. Попробуйте ещё раз.",
  },
  en: {
    notConfigured: "AI is not configured.",
    rateLimit: "Too many requests. Please try again shortly.",
    badRequest: "Invalid request.",
    skillsRequired: "Please enter your skills.",
    orderRequired: "No job selected.",
    orderAndDraftRequired: "Please provide a job and your proposal text.",
    questionRequired: "Please enter your question.",
    modelFailure: "Failed to reach the AI. Please try again.",
  },
};

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "local";
}

export async function POST(req: Request) {
  // 0. Body (til aniqlash uchun avval o'qiymiz; xatoni keyinroq qaytaramiz)
  let body: Body | null = null;
  try {
    body = (await req.json()) as Body;
  } catch {
    body = null;
  }

  const locale: Locale =
    body && isLocale(body.locale) ? body.locale : await getLocale();
  const t = ERRORS[locale];

  // 1. AI sozlanganmi?
  if (!isGroqConfigured()) {
    return NextResponse.json({ error: t.notConfigured }, { status: 503 });
  }

  // 2. Rate limit (IP bo'yicha): ~20 so'rov / 60s
  const rl = checkRateLimit(clientIp(req));
  if (!rl.ok) {
    return NextResponse.json(
      { error: t.rateLimit },
      {
        status: 429,
        headers: rl.retryAfter ? { "Retry-After": String(rl.retryAfter) } : undefined,
      },
    );
  }

  // 3. Body validatsiyasi
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: t.badRequest }, { status: 400 });
  }

  const mode: Mode = MODES.includes(body.mode as Mode)
    ? (body.mode as Mode)
    : "chat";

  try {
    switch (mode) {
      case "recommend": {
        const skills = (body.skills ?? "").trim();
        if (!skills) {
          return NextResponse.json({ error: t.skillsRequired }, { status: 400 });
        }
        const { reply, orderIds } = await recommendJobs(skills, locale);
        return NextResponse.json({ reply, suggestedOrderIds: orderIds });
      }

      case "explain": {
        const orderId = (body.orderId ?? "").trim();
        if (!orderId) {
          return NextResponse.json({ error: t.orderRequired }, { status: 400 });
        }
        const { reply } = await explainJob(orderId, locale);
        return NextResponse.json({ reply });
      }

      case "improve": {
        const orderId = (body.orderId ?? "").trim();
        const draft = (body.draft ?? "").trim();
        if (!orderId || !draft) {
          return NextResponse.json(
            { error: t.orderAndDraftRequired },
            { status: 400 },
          );
        }
        const { reply } = await improveProposal(orderId, draft, locale);
        return NextResponse.json({ reply });
      }

      case "portfolio": {
        const skills = (body.skills ?? "").trim();
        if (!skills) {
          return NextResponse.json({ error: t.skillsRequired }, { status: 400 });
        }
        const { reply } = await suggestPortfolioImprovements(skills, locale);
        return NextResponse.json({ reply });
      }

      case "chat":
      default: {
        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return NextResponse.json({ error: t.questionRequired }, { status: 400 });
        }
        const { reply, suggestedOrderIds } = await chat(messages, locale);
        return NextResponse.json({ reply, suggestedOrderIds });
      }
    }
  } catch (err) {
    console.error("[ai/chat]", err);
    return NextResponse.json({ error: t.modelFailure }, { status: 502 });
  }
}
