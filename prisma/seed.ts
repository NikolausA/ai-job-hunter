import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Создание или обновление пользователя 1
  const user1 = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {}, // Не обновляем, если существует
    create: {
      email: "john@example.com",
      name: "John Doe",
      skills: ["typescript", "react", "nodejs"],
      profiles: {
        create: [
          {
            title: "Frontend Developer",
            experience: "3 years in React/TS development",
          },
        ],
      },
    },
  });
  console.log("✅ User 1 created:", user1.email);

  // Создание или обновление пользователя 2
  const user2 = await prisma.user.upsert({
    where: { email: "jane@example.com" },
    update: {},
    create: {
      email: "jane@example.com",
      name: "Jane Smith",
      skills: ["python", "django", "postgresql"],
      profiles: {
        create: [
          {
            title: "Backend Developer",
            experience: "5 years in Python/Django",
          },
        ],
      },
    },
  });
  console.log("✅ User 2 created:", user2.email);

  // Создание вакансий (с проверкой дубликатов)
  const jobsData = [
    {
      title: "Senior Frontend Engineer",
      company: "TechCorp",
      description: "React, TypeScript, Next.js",
      location: "Remote",
      tags: ["frontend", "react", "senior"],
    },
    {
      title: "Junior Fullstack Developer",
      company: "DevStart",
      description: "Node.js + React",
      location: "Berlin",
      tags: ["fullstack", "react", "node"],
    },
    {
      title: "Python Backend Engineer",
      company: "DataCorp",
      description: "Django, PostgreSQL, Redis",
      location: "London",
      tags: ["backend", "python", "senior"],
    },
  ];

  for (const jobData of jobsData) {
    // Проверяем, существует ли вакансия
    const existingJob = await prisma.job.findFirst({
      where: {
        title: jobData.title,
        company: jobData.company,
      },
    });

    if (!existingJob) {
      await prisma.job.create({ data: jobData });
      console.log(`✅ Job created: ${jobData.title} at ${jobData.company}`);
    } else {
      console.log(`⏭️  Job already exists: ${jobData.title}`);
    }
  }

  console.log("🎉 Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
