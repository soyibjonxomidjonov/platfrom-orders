import Groq from "groq-sdk";

/**
 * Groq mijozi — faqat serverda ishlatiladi (API route / server action).
 * Kalit brauzerga hech qachon chiqmaydi.
 */
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";
export const GROQ_FALLBACK_MODEL =
  process.env.GROQ_FALLBACK_MODEL ?? "qwen/qwen3.8-27b";

export function isGroqConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}
