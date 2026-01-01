# Klick - URL Shortener Backend

A **scalable, production-style URL shortener backend** built with Node.js, TypeScript, PostgreSQL, Redis, and BullMQ.  
This project demonstrates **high-performance backend design**, **clean architecture principles**, and **eventual consistency handling** for analytics.

---

## Features

- **User Authentication**
  - Signup and login endpoints for authenticated link creation.
- **Short URL Creation**
  - Authenticated users can shorten URLs.
  - Generates unique short codes by leveraging **PostgreSQL sequences**, then encoding them into **base62** for compact, human-friendly URLs.
- **Low-Latency Redirects**
  - Resolves `shortCode` → `longUrl` using **Redis cache** with cache-aside pattern.
- **Analytics Tracking**
  - Counts each URL usage asynchronously for performance.
- **Background Processing**
  - Uses **BullMQ** to flush usage counts from Redis to PostgreSQL in an **eventually consistent** manner.
  - Supports **multiple Node.js instances** with a shared queue for consistent background job processing.
- **Clean Architecture**
  - Domain and application logic are **isolated from infrastructure** (database, cache, message queue), making the backend modular and maintainable.

---

## Tech Stack

| Layer             | Technology                           |
|------------------|--------------------------------------|
| Backend           | Node.js, TypeScript                  |
| Database          | PostgreSQL                           |
| Cache             | Redis                                |
| Message Queue     | BullMQ                               |
| Architecture      | Clean / Hexagonal Architecture       |

---
## System-Overview

1. **Redirect flow**
   - User requests `/:shortCode`.
   - Server checks Redis cache.
   - If hit → return `longUrl`.
   - If miss → query PostgreSQL, store in Redis, return `longUrl`.

2. **Usage count flow**
   - Increment in Redis on each redirect.
   - BullMQ flushes aggregated counts to PostgreSQL asynchronously (every 1 minute).

3. **Url Shortening flow**
   - User sends long Url at `/shorten`.
   - Server generates a unique short code using PostgreSQL sequences and  base 62 encoding.
   - The short URL is saved in the database, cached with its mapping to long Url.
   - Short  URL is sent to the authenticated user.

---

## Installation

```bash
# Clone the repo
git clone https://github.com/taimoorali202/url-shortener-backend.git
cd url-shortener-backend

# Install dependencies
npm install

# Start the server
npm run dev
