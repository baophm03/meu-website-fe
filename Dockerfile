# ==========================================
# Author:         Quach Dac Duc Manh
# Email:          quachdacducmanhk16@siu.edu.vn
# Phone:          +84 396 677 325
# -----------------------------------
# Created:        2026-11-16
# LastEditTime:   2026-11-16
# Version:        1.0
# Status:         Updated
# ==========================================
#
# Next.js multi-stage build for meu-website frontend.
# Dependencies are installed once in the base stage; the production
# stage installs only production dependencies.
# ==========================================

FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG NEXT_PUBLIC_BACKEND_HOST=https://meu-solutions.com
ARG NEXT_PUBLIC_FRONTEND_HOST=https://meu-solutions.com
ENV NEXT_PUBLIC_BACKEND_HOST=$NEXT_PUBLIC_BACKEND_HOST
ENV NEXT_PUBLIC_FRONTEND_HOST=$NEXT_PUBLIC_FRONTEND_HOST
RUN pnpm run build

FROM node:22-alpine AS production
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
CMD ["pnpm", "run", "start"]
