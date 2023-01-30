FROM node:16-alpine as buildenv

WORKDIR /app

ARG TARGET_ENV=dev

COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY public/ ./public
COPY src/ ./src

RUN yarn --frozen-lockfile

RUN yarn build
RUN rm -rf src/

FROM nginx:1.18.0-alpine AS production
WORKDIR /app

ARG TARGET_ENV=dev

RUN rm -rf /etc/nginx/conf.d

COPY ./config-nginx/conf-${TARGET_ENV}/ /etc/nginx
COPY --from=buildenv /app/build /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]