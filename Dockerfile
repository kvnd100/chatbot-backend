# Stage 1: builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build        # outputs to dist/

# Stage 2: runner
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev    # production deps only (smaller image)
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]