FROM node:21 AS builder

WORKDIR /usr/app

COPY . .

RUN npm ci

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=builder /usr/app/dist /usr/share/nginx/html
