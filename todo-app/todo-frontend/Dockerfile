FROM node:21 AS build-stage

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

WORKDIR /usr/src/app

COPY  . .

RUN npm ci

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

