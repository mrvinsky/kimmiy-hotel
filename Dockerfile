# Single image running the NestJS backend (3001) and the Next.js frontend (3000).
# Build for both architectures:
#   docker buildx build --platform linux/amd64,linux/arm64 -t mrvinsky31/kimmiy-hotel-app:latest --push .

FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Rewrites are resolved at build time: /api and /uploads are proxied to the backend in the same container
ENV BACKEND_INTERNAL_URL=http://localhost:3001
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY backend/package.json ./backend/package.json
COPY --from=frontend-build /app/frontend/.next/standalone ./frontend/
COPY --from=frontend-build /app/frontend/.next/static ./frontend/.next/static
COPY --from=frontend-build /app/frontend/public ./frontend/public
COPY docker/start.sh ./start.sh
RUN chmod +x ./start.sh && mkdir -p /app/backend/uploads

EXPOSE 3000 3001
CMD ["./start.sh"]
