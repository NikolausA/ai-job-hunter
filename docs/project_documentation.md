# 📚 Project Documentation

Этот файл содержит полный набор документов проекта, объединённый в одном месте для удобства. При необходимости мы можем разнести их по отдельным файлам.

---

# 1. TECH-SPEC (Техническое задание)

## 🎯 Назначение проекта
Платформа для поиска работы и управления профилями пользователей. Предназначена для соискателей и (в перспективе) работодателей.

## 🧩 Основные сущности
- **User** — пользователь
- **Profile** — резюме пользователя, одно или несколько
- **Job** — вакансия, создаваемая системой или админом

## 🔥 Must Have функциональность
- Получение вакансий (все, по id)
- Создание вакансии
- Получение профилей пользователя
- Получение пользователя по id
- Клиентский tRPC-клиент
- Авторизация (NextAuth + Credentials)
- Построение UI в стиле SPA

## ⭐ Nice to Have
- Фильтры вакансий
- Редактирование профиля
- Админ-панель

## ⚙️ API (по смыслу)
- `job.getAll()` — список вакансий
- `job.getById(id)` — вакансия по id
- `job.create(data)` — создать вакансию
- `profile.getByUser(userId)` — профили конкретного пользователя
- `user.getById(id)` — пользователь
- `user.getUserWithProfiles(id)` — пользователь + профили

---

# 2. STACK (Стек технологий)

## 🧱 Backend
- **Next.js App Router**
- **tRPC v10**
- **Prisma ORM**
- **PostgreSQL** (через Docker-compose)
- **Zod**
- **SuperJSON**

## 🎨 Frontend
- **React 18**
- **TypeScript**
- **TailwindCSS**
- FSD (Feature-Sliced Design)

## 🛠 Dev Tools
- Vitest
- Testing Library
- ESLint
- Prettier
- Docker / Docker Compose

---

# 3. ARCHITECTURE (Архитектура проекта)

```
src/
 ├── app/                     # Next.js App Router
 ├── server/
 │    ├── db.ts              # Prisma клиент
 │    ├── trpc/
 │    │     ├── context.ts   # Контекст tRPC
 │    │     ├── trpc.ts      # Инициализация tRPC
 │    │     ├── root.ts      # Корневой роутер
 │    │     └── routers/
 │    │           ├── job.ts
 │    │           ├── user.ts
 │    │           └── profile.ts
 │    └── api/…              # API endpoints
 ├── shared/
 │    ├── types/             # Zod-схемы
 │    └── libs/
 ├── features/
 ├── entities/
 └── widgets/
```

### 🔗 Взаимосвязи
- `root.ts` агрегирует `jobRouter`, `userRouter`, `profileRouter`
- `client.ts` создаёт tRPC-клиент
- `TrpcProvider` пробрасывает клиент вниз по дереву
- tRPC вызывает Prisma через контекст

---

# 4. ROADMAP (План разработки)

## ✅ Спринт 1 — База проекта
- Создать структуру репозитория
- Настроить PostgreSQL через Docker
- Настроить Prisma Schema
- Настроить tRPC server
- Создать jobRouter, userRouter, profileRouter

## ⏳ Спринт 2 — Клиент
- TRPC-client
- TrpcProvider
- Подключение к Next.js

## 🔥 Спринт 3 — Тестирование
- Покрытие tRPC-роутов Vitest-тестами
- Mock Prisma

## 🔜 Спринт 4 — UI
- Базовые страницы (jobs, job/:id, profile)

---

# 5. CHANGELOG

### 2025-11-24
- Настроен tRPC-сервер
- Созданы job/user/profile роуты
- Настроен createTRPCContext
- Настроены документы проекта

### 2025-11-25
- Настроены Vitest
- Начато тестирование tRPC-роутов

---

# 6. GUIDE (Как запустить проект)

## 🐘 PostgreSQL (Docker)
```
docker compose up -d
```

## 🔧 Настройка окружения (`.env`)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jobhunter"
```

## 🗃 Миграции
```
npx prisma migrate dev
```

## ▶️ Запуск проекта
```
npm run dev
```

## 🧪 Запуск тестов
```
npx vitest
```

## 💡 Форматировать код
```
npm run lint
```

---

Документы готовы. Если хочешь — можем разнести их в отдельные файлы или дополнить любую из секций.

