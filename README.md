# AI JOB HUNTER

Full-stack приложение **Ai Job Hunter** - персональный помощник для поиска работы:

- пользователь создаёт профиль (навыки, опыт, ключевые слова);
- сервис парсит вакансии (через mock или внешний API);
- AI генерирует:
  - 🧠 персональные рекомендации вакансий (на основе similarity по embeddings);
  - 📨 сопроводительные письма под каждую вакансию;
- система присылает realtime-уведомления (WebSocket) при появлении подходящих новых вакансий.

## 🛠️ Стек технологий

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

- [zod](https://zod.dev/) — валидация форм
- [next-auth](https://next-auth.js.org/) — аутентификация через CredentialsProvider
- [tRPC v11](https://trpc.io/) — типобезопасный API
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [SuperJSON](https://github.com/blitz-js/superjson) — сериализация даты и вложенных структур
- Архитектура: **FSD** (Feature-Sliced Design)

## 🚀 Демо

> 📌 _Запуск проекта производится локально. Приложение работает на порту `http://localhost:3000`._

## 📦 Основной функционал

-
