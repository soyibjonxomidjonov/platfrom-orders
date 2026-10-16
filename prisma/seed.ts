import { PrismaClient } from "@prisma/client";
import { SEED_ORDERS } from "../src/data/seed-orders";

const prisma = new PrismaClient();

async function main() {
  for (const order of SEED_ORDERS) {
    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        id: order.id,
        title: order.title,
        category: order.category,
        budget: order.budget,
        summary: order.summary,
        description: order.description,
        skills: order.skills,
        deadline: order.deadline,
      },
    });
  }
  console.log(`Seed tugadi: ${SEED_ORDERS.length} ta buyurtma.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
