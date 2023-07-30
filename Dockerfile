# ---------------- To develop as a container
FROM node:lts-alpine as development

RUN apk add openssl1.1-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# ---------------- Run Prod Stage
FROM node:lts-alpine as production

RUN apk add openssl1.1-compat

WORKDIR /app

COPY package*.json ./

RUN npm install --production --no-audit --no-save --no-optional --no-fund --no-package-locknpm install

COPY . .

RUN npx prisma generate

RUN npm install typescript

RUN npm run build

RUN npm install -g pm2

COPY pm2.config.json ./

