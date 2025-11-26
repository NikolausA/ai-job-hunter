# Архитектура проекта

## 1. Общий обзор

Проект **AI Job Hunter** — это веб‑приложение, построенное на **Next.js App Router**, использующее:

- **tRPC** для типобезопасного взаимодействия клиент ↔ сервер
- **Prisma** как ORM
- **PostgreSQL** как основную базу данных
- **NextAuth.js (CredentialsProvider)** для аутентификации
- **Tailwind CSS** для стилизации
- **Vitest** для тестирования

Архитектура разделена на слои:

1. **Интерфейс (UI Layer)** — React‑компоненты, server/client components.
2. **Коммуникационный слой** — tRPC client и server, процедуры, роутеры.
3. **Бизнес‑логика** — серверные роуты tRPC, работа с Prisma, валидация через Zod.
4. **Доступ к данным** — Prisma ORM + PostgreSQL.

## 2. Директории и их назначение

```
src/
 ├── app/                # Next.js App Router, страницы и layout'ы
 │    ├── api/trpc/      # tRPC API handler (Next.js route handler)
 │    └── ...
 │
 ├── shared/             # Типы, схемы Zod, general utils
 │    └── types/
 │
 ├── server/
 │    ├── db.ts          # Инициализация PrismaClient
 │    ├── trpc/
 │    │     ├── context.ts   # Контекст tRPC (Prisma, user)
 │    │     ├── trpc.ts      # router(), publicProcedure(), protectedProcedure()
 │    │     ├── root.ts      # appRouter — объединение всех роутов
 │    │     └── routers/
 │    │            ├── job.ts
 │    │            ├── user.ts
 │    │            └── profile.ts
 │    │
 │    └── auth/         # next-auth конфигурация
 │
 ├── client/
 │    ├── trpc-client.ts     # Настройка tRPC клиента
 │    └── providers/
 │          └── TrpcProvider # Провайдер tRPC
 │
 └── ...
```

## 3. Поток данных в приложении

### UI → tRPC → Prisma → PostgreSQL → обратно в UI

### 1) Клиент вызывает tRPC-процедуру

```ts
client.job.getAll();
```

Где `client` — это tRPC client, созданный в `/src/client/trpc-client.ts`.

### 2) tRPC вызывает соответствующий роут

```ts
export const jobRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.job.findMany()),
});
```

### 3) В роуте используется `ctx.prisma`

Контекст создаётся в `src/server/trpc/context.ts`:

```ts
export async function createTRPCContext() {
  return { prisma };
}
```

### 4) Prisma делает запрос к базе PostgreSQL

`prisma.job.findMany()` → SQL → PostgreSQL.

### 5) Результат возвращается клиенту типобезопасно

Типы автоматически выводятся из tRPC.

## 4. Архитектурные решения

### 4.1. App Router вместо Pages Router

**Причины выбора:**

- Server Components позволяют серверу выполнять основную работу
- Оптимизация запросов и рендеринга
- Более гибкая структура маршрутов
- Лучшее разделение UI и логики

### 4.2. tRPC вместо REST

**Преимущества:**

- Полная типобезопасность: серверные типы → клиент
- Нет лишней сериализации/сложности API
- Меньше кода и меньше точек отказа

### 4.3. Prisma вместо SQL вручную

**Причины выбора:**

- Предсказуемые типы моделей
- Автоматические миграции
- Удобная работа с PostgreSQL

### 4.4. NextAuth (Credentials) для аутентификации

- Лёгкая интеграция с App Router
- Возможность добавлять OAuth при необходимости

### 4.5. Tailwind вместо SCSS/Mantine

- Быстрое прототипирование
- Простые темизация и кастомизация

## 5. Архитектурный стиль

### Backend

- Функциональный подход
- Явное определение роутеров
- Минимум глобального состояния
- Лёгкая масштабируемость: добавление фич = добавление роутера

### Frontend

- Разделение: server components (данные) / client components (интерактивность)
- Провайдеры вынесены отдельно (`TrpcProvider`, `AuthProvider`)

## 6. Принципы расширяемости

### Как добавлять новую сущность

1. Создаёшь модель в `schema.prisma`.
2. Прогоняешь `prisma migrate dev`.
3. Добавляешь Zod‑схемы в `/src/shared/types/`.
4. Создаёшь tRPC-роутер в `src/server/trpc/routers/`.
5. Подключаешь его в `root.ts`.
6. Используешь на клиенте через `client.newEntity.*`.

### Масштабирование

Структура проекта позволяет безболезненно:

- Добавлять роутеры tRPC
- Добавлять server components
- Выносить домены в отдельные модули
- Добавлять новые базы (Redis, ClickHouse)

## 7. Соответствие ТЗ

Архитектура полностью соответствует:

- **требованиям UI/UX** (Next.js)
- **требованиям по API** (tRPC + типизация)
- **требованиям безопасности** (auth + server components)
- **плану разработки** (модульность)

## 8. Возможные улучшения

- Ввод слоя Application Services (аналог UseCases)
- Добавление кеширования (Redis)
- Введение глобального error‑handling в tRPC middleware

## 9. Диаграмма (в текстовом виде)

```
[UI Components]
      ↓
[tRPC Client]
      ↓
[App Router → API Route Handler]
      ↓
[tRPC Router]
      ↓
[Context (Prisma, Auth)]
      ↓
[Prisma ORM]
      ↓
[PostgreSQL]
```

## 10. Вывод

Архитектура проекта построена вокруг строгой типизации, простоты расширения и предсказуемости.
Каждый слой минимален, модульность максимальная.
Проект легко поддерживать, масштабировать и тестировать.
