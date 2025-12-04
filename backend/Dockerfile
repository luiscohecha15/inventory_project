FROM node:20-slim AS base
WORKDIR /app

# Install dependencies (production) and build
FROM base AS builder
COPY package*.json ./
# Install dev deps for build step
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim AS runtime
WORKDIR /app
# Install only production dependencies in the runtime image
COPY package*.json ./
RUN npm ci --omit=dev
# Copy built assets
COPY --from=builder /app/dist ./dist
ENV PORT=3000
ENV MONGO_URI=mongodb://mongo:27017/inventory
EXPOSE 3000
CMD ["node", "dist/main.js"]
