# --- STAGE 1: Dependency Installation & Build ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- STAGE 2: Production ---
FROM nginx:1.25-alpine

# YENİ ADIM: Kendi özel Nginx yapılandırmamızı kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Builder'dan statik olarak export edilmiş dosyaları kopyala
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]