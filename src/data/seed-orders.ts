import type { Order } from "@/types/order";

/**
 * Prototip uchun 6 ta namunaviy buyurtma.
 * Bu ma'lumot ham frontend (login talab qilmaydigan asosiy sinov),
 * ham `prisma/seed.ts` orqali bazaga yuklash uchun ishlatiladi.
 */
export const SEED_ORDERS: Order[] = [
  {
    id: "B01",
    title: "Kafe uchun menyu dizayni",
    category: "Dizayn",
    budget: 150000,
    summary: "Zamonaviy kafe uchun menyu dizayni (A4, 2 bet).",
    description:
      "Kichik oilaviy kafe uchun chiroyli va o'qish oson menyu dizayni kerak. " +
      "Ikki betli A4 format, taomlar bo'limlarga ajratilgan, brend ranglari issiq va qulay bo'lsin. " +
      "Yakuniy natija PDF va tahrir qilinadigan manba fayl ko'rinishida topshiriladi.",
    skills: ["Figma", "Typografika", "Brending"],
    deadline: "3 kun",
  },
  {
    id: "B02",
    title: "Do'kon uchun afisha",
    category: "Dizayn",
    budget: 100000,
    summary: "Chegirma aksiyasi uchun e'tiborli afisha (A3).",
    description:
      "Mahalliy do'konning mavsumiy chegirmasi uchun A3 afisha kerak. " +
      "Diqqatni tortadigan sarlavha, aniq chegirma foizi va do'kon logotipi joylashsin. " +
      "Ham chop etishga tayyor (CMYK, 300dpi), ham ijtimoiy tarmoq uchun kvadrat versiya kerak.",
    skills: ["Photoshop", "Illustrator", "Kompozitsiya"],
    deadline: "2 kun",
  },
  {
    id: "B03",
    title: "30 soniyali rolik montaji",
    category: "Video",
    budget: 200000,
    summary: "Instagram Reels uchun 30 soniyali dinamik montaj.",
    description:
      "Tayyor video material (5 daqiqa) beriladi. Undan 30 soniyali qiziqarli Reels tayyorlash kerak: " +
      "dinamik kesish, trend musiqa, matn animatsiyalari va yorqin ranglar. " +
      "Vertikal 9:16 format, 1080x1920.",
    skills: ["Premiere Pro", "CapCut", "Ritmik montaj"],
    deadline: "2 kun",
  },
  {
    id: "B04",
    title: "Videoga subtitr qo'shish",
    category: "Video",
    budget: 120000,
    summary: "10 daqiqalik videoga aniq o'zbekcha subtitr.",
    description:
      "10 daqiqalik intervyu videosiga o'zbek tilida aniq va vaqtga mos subtitr qo'shish kerak. " +
      "Subtitr o'qish oson shriftda, ekranning pastki qismida, fon bilan kontrastli bo'lsin. " +
      "SRT fayl va subtitr o'rnatilgan video topshiriladi.",
    skills: ["Subtitr", "Tahrir", "O'zbek tili"],
    deadline: "1 kun",
  },
  {
    id: "B05",
    title: "Bir sahifali sayt yaratish",
    category: "Veb",
    budget: 500000,
    summary: "Mahsulot uchun responsive landing page.",
    description:
      "Yangi mahsulotni tanishtiruvchi bir sahifali landing page kerak. " +
      "Hero bo'limi, imkoniyatlar, narxlar va aloqa formasi bo'lsin. " +
      "To'liq responsive (mobil/planshet/desktop), tez yuklanadigan va zamonaviy dizayn.",
    skills: ["HTML/CSS", "React", "Responsive dizayn"],
    deadline: "5 kun",
  },
  {
    id: "B06",
    title: "Saytdagi matnni yangilash",
    category: "Veb",
    budget: 100000,
    summary: "Mavjud saytda matn va rasmlarni yangilash.",
    description:
      "Mavjud HTML saytda bir nechta sahifadagi matnlarni yangilash va eski rasmlarni almashtirish kerak. " +
      "Kirish ma'lumotlari beriladi. O'zgarishlardan so'ng sayt mobil ko'rinishda ham to'g'ri ishlashini tekshirish lozim.",
    skills: ["HTML", "Kontent", "Mayda tuzatish"],
    deadline: "1 kun",
  },
];

export function getOrderById(id: string): Order | undefined {
  return SEED_ORDERS.find((o) => o.id.toLowerCase() === id.toLowerCase());
}
