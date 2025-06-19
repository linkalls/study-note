# Dockerfile

# ---- Dependencies Stage ----
FROM oven/bun:1 as deps
WORKDIR /app

# Install dependencies based on the target environment
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# ---- Development Stage ----
FROM deps as dev
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]

# ---- Build Stage ----
FROM deps as builder
WORKDIR /app
COPY . .
RUN bun run build

# ---- Production Stage ----
FROM oven/bun:1-slim as runner
WORKDIR /app

ENV NODE_ENV=production
# Optionally, set NEXTAUTH_URL for production if it differs
# ENV NEXTAUTH_URL=https://yourdomain.com

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/node_modules ./node_modules
# If you have a standalone server.js, copy it here too
# COPY --from=builder /app/server.js ./server.js

EXPOSE 3000
CMD ["bun", "run", "start"]
