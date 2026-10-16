/**
 * Juda sodda, xotirada ishlaydigan fixed-window rate limiter.
 *
 * ESLATMA: Bu limiter faqat BITTA server instansiyasi doirasida ishlaydi
 * (module-level Map). Serverless/multi-instance muhitda yoki qayta ishga
 * tushirilganda holat yo'qoladi. Prototip uchun yetarli; production uchun
 * Redis kabi tashqi store kerak bo'ladi.
 */

interface WindowState {
  count: number;
  resetAt: number; // epoch ms — shu vaqtda oyna yangilanadi
}

const buckets = new Map<string, WindowState>();

const DEFAULT_LIMIT = 20;
const DEFAULT_WINDOW_MS = 60_000;

export function checkRateLimit(
  key: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS,
): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count < limit) {
    existing.count += 1;
    return { ok: true };
  }

  // Limitdan oshdi — necha soniyadan keyin urinish mumkinligini qaytaramiz.
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return { ok: false, retryAfter };
}
