

# 🔥 Week 1 Structure – Postgres + Prisma + Express + TypeScript

## Your Stack (Simplified)

| Component | Choice |
|-----------|--------|
| **API** | Express + TypeScript |
| **Database** | PostgreSQL (Docker) |
| **ORM** | Prisma (you asked) |
| **Queue** | In-memory array (NO Redis yet) |
| **Worker** | setInterval |
| **Container** | Docker for Postgres only |

---

## Prisma – Yes or No?

| Aspect | Verdict |
|--------|---------|
| **Ease of use** | ✅ Great for beginners |
| **Type safety** | ✅ Excellent (generates TypeScript types) |
| **Learning curve** | ✅ Low |
| **Raw SQL when needed** | ✅ Supports `$queryRaw` |
| **For this project** | ✅ Perfect choice |

**Verdict: YES, use Prisma.**

---

## What Prisma Gives You

- Auto-generated TypeScript types for your tables
- Type-safe queries (no more `any` for DB results)
- Migrations handled for you
- Easy to switch to raw SQL later

---

## Folder Structure (Week 1)

```
backend-observatory/
├── src/
│   ├── index.ts           (Entry point)
│   ├── server.ts          (Express app)
│   ├── worker.ts          (Background processor)
│   ├── queue.ts           (In-memory array)
│   └── routes/
│       └── events.ts      (POST /events)
├── prisma/
│   ├── schema.prisma      (Your DB schema)
│   └── migrations/        (Auto-generated)
├── docker-compose.yml     (Postgres only)
├── package.json
└── tsconfig.json
```

---

## Daily Plan (No Code, Just Structure)

### Day 1 – Setup Infrastructure

| Task | What to do |
|------|------------|
| 1 | Create folder + `npm init -y` |
| 2 | Install Express, TypeScript, Prisma |
| 3 | Run `npx tsc --init` |
| 4 | Write `docker-compose.yml` (Postgres only) |
| 5 | Run `docker compose up -d` |
| 6 | Verify Postgres is running |

**Stop. That's Day 1 done.**

---

### Day 2 – Prisma Setup + First Table

| Task | What to do |
|------|------------|
| 1 | Run `npx prisma init` |
| 2 | Add `DATABASE_URL` to `.env` |
| 3 | Define `Event` model in `schema.prisma` |
| 4 | Run `npx prisma migrate dev` |
| 5 | Run `npx prisma generate` |
| 6 | Test connection with a simple script |

**Table structure (minimal):**

- `id` (auto-increment)
- `type` (string)
- `payload` (JSON)
- `createdAt` (timestamp)

---

### Day 3 – Express + In-Memory Queue

| Task | What to do |
|------|------------|
| 1 | Create `server.ts` with Express |
| 2 | Create `POST /events` endpoint |
| 3 | Create `queue.ts` with array export |
| 4 | On request: validate → push to queue → return |
| 5 | Test with Postman/curl |

**No database yet. Just queue.**

---

### Day 4 – Worker with setInterval

| Task | What to do |
|------|------------|
| 1 | Create `worker.ts` |
| 2 | Add `setInterval` (5 seconds) |
| 3 | Worker: check queue array |
| 4 | If event exists → log it → remove from array |
| 5 | Run worker alongside server |

**Test: Send events → worker consumes them.**

---

### Day 5 – Worker + Prisma (Store in DB)

| Task | What to do |
|------|------------|
| 1 | Import Prisma client in worker |
| 2 | Worker: take event from queue |
| 3 | Use `prisma.event.create()` to store |
| 4 | Handle errors (if DB fails, event stays in queue) |
| 5 | Test: Send event → check DB table |

---

### Day 6 – Health + Stats Endpoints

| Task | What to do |
|------|------------|
| 1 | Add `GET /health` – check DB connection |
| 2 | Add `GET /stats` – return queue size + total events |
| 3 | Use Prisma `count()` for total events |
| 4 | Track `totalReceived` in memory |
| 5 | Test both endpoints |

---

### Day 7 – Batch Processing

| Task | What to do |
|------|------------|
| 1 | Modify worker: take 5 events at once |
| 2 | Use `prisma.event.createMany()` |
| 3 | Remove all processed events from queue |
| 4 | Add logging for batch size |
| 5 | Test with multiple events |

---

## Docker Compose (Day 1)

```yaml
services:
  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: observatory
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Prisma Schema (Day 2)

```prisma
model Event {
  id        Int      @id @default(autoincrement())
  type      String
  payload   Json
  createdAt DateTime @default(now()) @map("created_at")
}
```

---

## What Makes This Backend Heavy

| Concept | How You Learn It |
|---------|------------------|
| Async processing | Worker runs separate from API |
| Queue pattern | In-memory array acts as buffer |
| Batch operations | `createMany` instead of single inserts |
| Error recovery | Failed DB = event stays in queue |
| Type safety | Prisma generates types |
| Containerized DB | Docker Compose |

---

## Why Prisma is Good for This

| Concern | Answer |
|---------|--------|
| **Too abstract?** | You still write schema yourself |
| **Learning curve?** | 1 day max |
| **Production ready?** | Yes |
| **For your goal?** | Perfect for Week 1 |

---

## What NOT to Do

| ❌ Don't | ✅ Instead |
|----------|------------|
| Add Redis | Use array queue |
| Add auth | Skip |
| Add dashboard | Skip |
| Optimize early | Just make it work |
| Add WebSockets | Add later |

---

## Success Check (End of Week 1)

You can answer YES to all:

- [ ] Postgres runs in Docker
- [ ] Prisma connects to Postgres
- [ ] `POST /events` adds to queue
- [ ] Worker picks events every 5 seconds
- [ ] Events saved to Postgres via Prisma
- [ ] `/health` shows DB status
- [ ] `/stats` shows counts
- [ ] Worker processes 5 events at once

---

## Next Week Preview (Week 2)

After Week 1 works, you'll add:

- Real queue (BullMQ with Redis)
- Proper retry logic
- Dead letter queue
- Processing delays simulation

---

**Want me to write the Day 1 Docker + Prisma setup script when you're ready?** 🚀
