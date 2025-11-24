process.env.DATABASE_URL = "file:./test.db"; // отдельная тестовая БД

import { prisma } from "@/server/db";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
