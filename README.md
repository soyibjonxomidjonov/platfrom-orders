# Yoshlar Jobs

Yoshlar uchun kichik buyurtmalar platformasi — **Next.js 16 + TypeScript** asosidagi to‘liq ishlaydigan interaktiv prototip. Alohida API server (FastAPI) talab qilinmaydi: frontend va server funksiyalari bitta loyihada.

## Texnologiyalar

| Qatlam | Texnologiya |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions) |
| Til | TypeScript |
| Dizayn | Tailwind CSS v4 + custom UI komponentlar |
| Animatsiya | Motion |
| Ikonkalar | lucide-react |
| Forma | React Hook Form + Zod |
| Auth | Auth.js (NextAuth v5) — Google |
| AI | Groq SDK |
| DB (3-bosqich) | PostgreSQL + Prisma |

## Ishga tushirish

```bash
npm install
cp .env.example .env   # qiymatlarni to'ldiring
npm run dev            # http://localhost:3000
```

> Asosiy prototip (buyurtmalar, filter, taklif formasi, AI) **ma'lumotlar bazasisiz** ishlaydi — barcha buyurtmalar `src/data/seed-orders.ts` dan olinadi.

## Skriptlar

| Buyruq | Vazifa |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript tekshiruvi |
| `npm run db:generate` | Prisma client generatsiya |
| `npm run db:push` | Schema'ni bazaga yuborish |
| `npm run db:seed` | 6 buyurtmani bazaga yuklash |

## Sahifalar

| Sahifa | Yo‘l | Tavsif |
| --- | --- | --- |
| Bosh sahifa | `/` | Hero, 6 buyurtma, kategoriya filtri |
| Buyurtma | `/orders/[id]` | Batafsil, budjet, taklif yuborish |
| Takliflar | `/proposals` | Yuborilgan takliflar |
| Dashboard | `/dashboard` | Profil + takliflar |
| Login | `/login` | Google orqali kirish |

AI yordamchi barcha sahifalarda o‘ng pastki burchakda ochilib-yopiladigan widget sifatida ishlaydi va faqat mavjud buyurtmalar bo‘yicha maslahat beradi.

## Ishlab chiqish bosqichlari

1. **Yadro (tayyor):** 6 buyurtma, filter, tafsilot, taklif formasi (validatsiya + tasdiqlash), AI yordamchi.
2. **Dizayn (keyingi):** landing sayqallash, rasmlar, animatsiya, to‘liq responsive.
3. **To‘liq integratsiya:** Google login (Prisma adapter), PostgreSQL, takliflarni bazaga saqlash.

## Maxfiylik

Barcha maxfiy kalitlar (`.env`) faqat serverda ishlatiladi va git'ga yuklanmaydi. Google OAuth lokal ishlashi uchun Google Cloud Console'da quyidagi redirect URI qo‘shilishi kerak:

```
http://localhost:3000/api/auth/callback/google
```
