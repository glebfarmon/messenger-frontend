FROM node:20.19.6-alpine3.22 AS build

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY package*.json .

RUN pnpm i --ignore-scripts

COPY . .

RUN pnpm run build

FROM node:20.19.6-alpine3.22 AS production

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.mjs ./next.config.mjs
COPY --from=build /app/public ./public

RUN pnpm i --prod --ignore-scripts

ENV NODE_ENV=production

CMD [ "pnpm", "start" ]

EXPOSE 3000