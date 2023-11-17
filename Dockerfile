# FROM node:18.18-alpine
# WORKDIR /frontend
# COPY package.json /frontend
# RUN npm install
# COPY . /frontend
# EXPOSE 3000
# CMD ["npm", "run", "dev"]






FROM node:18-alpine AS deps
RUN apk add --no-cache curl \
    && curl -L https://unpkg.com/@pnpm/self-installer | node
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN  pnpm install

COPY public ./public

FROM node:18-alpine AS builder
RUN apk add --no-cache curl \
    && curl -L https://unpkg.com/@pnpm/self-installer | node
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/public ./public
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build

FROM node:18-alpine AS runner
RUN apk add --no-cache curl \
    && curl -L https://unpkg.com/@pnpm/self-installer | node
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]