# syntax=docker/dockerfile:1.7-labs

FROM --platform=$BUILDPLATFORM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --exclude=Caddyfile . .
RUN npm run build

FROM caddy:2.8.4-alpine AS runtime
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv/portfolio
EXPOSE 80 443
