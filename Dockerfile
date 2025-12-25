FROM node:20.19.6-alpine3.22 AS build

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./

RUN pnpm i --ignore-scripts --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20.19.6-alpine3.22 AS production

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

EXPOSE 3000

CMD [ "node", "server.js" ]