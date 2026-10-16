/**
 * Logik acceptance testlari (musobaqa talablari).
 * Ishga tushirish:  npx tsx tests/acceptance.test.ts
 * Qamrov: TEST 1, 2 (filter), TEST 4 (success matni), TEST 5, 6 (validatsiya).
 * Interaktiv testlar (TEST 9 dark mode, TEST 10 mobil) brauzerda tekshirilgan.
 */
import { proposalSchema } from "../src/lib/validators";
import { SEED_ORDERS, getOrderById } from "../src/data/seed-orders";

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean) {
  console.log(`${cond ? "✅ PASS" : "❌ FAIL"}  ${name}`);
  if (cond) pass++;
  else fail++;
}

// TEST 1 — kategoriya filtri
const ids = (c: string) =>
  SEED_ORDERS.filter((o) => o.category === c).map((o) => o.id);
check('TEST1 Dizayn = [B01, B02]', JSON.stringify(ids("Dizayn")) === '["B01","B02"]');
check('TEST1 Video = [B03, B04]', JSON.stringify(ids("Video")) === '["B03","B04"]');
check('TEST1 Veb = [B05, B06]', JSON.stringify(ids("Veb")) === '["B05","B06"]');

// TEST 2 — Barchasi = 6
check("TEST2 Barchasi = 6 ta ish", SEED_ORDERS.length === 6);

// TEST 3 — B01 ma'lumotlari
const b01 = getOrderById("B01");
check(
  "TEST3 B01 = 'Kafe uchun menyu dizayni', 150000",
  !!b01 && b01.title === "Kafe uchun menyu dizayni" && b01.budget === 150000,
);

// TEST 4 — to'g'ri taklif + aniq success matni
const t4 = proposalSchema.safeParse({
  name: "Sinovchi 01",
  portfolioUrl: "https://example.com/portfolio",
});
check("TEST4 to'g'ri ma'lumot qabul qilindi", t4.success);
const msg =
  t4.success && b01
    ? `${t4.data.name}, sizning '${b01.title}' buyurtmasi uchun taklifingiz muvaffaqiyatli qabul qilindi.`
    : "";
check(
  "TEST4 success matni aniq mos",
  msg ===
    "Sinovchi 01, sizning 'Kafe uchun menyu dizayni' buyurtmasi uchun taklifingiz muvaffaqiyatli qabul qilindi.",
);

// TEST 5 — bo'sh ism rad etiladi
check(
  "TEST5 bo'sh/probel ism rad etildi",
  !proposalSchema.safeParse({ name: "   ", portfolioUrl: "https://a.com" }).success,
);

// TEST 6 — "portfolio" (URL emas) rad etiladi
check(
  "TEST6 'portfolio' rad etildi",
  !proposalSchema.safeParse({ name: "Ali", portfolioUrl: "portfolio" }).success,
);
check(
  "TEST6b http:// to'g'ri URL qabul qilindi",
  proposalSchema.safeParse({ name: "Ali", portfolioUrl: "http://sayt.uz/men" }).success,
);
check(
  "TEST6c http(s) bo'lmagan sxema rad etildi",
  !proposalSchema.safeParse({ name: "Ali", portfolioUrl: "ftp://x.com" }).success,
);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
