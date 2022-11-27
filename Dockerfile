FROM node:18 AS build-env
COPY . /app
WORKDIR /app

RUN npm install -g pnpm
RUN pnpm fetch
RUN pnpm install -r --offline
RUN pnpm run build

RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /app /app
WORKDIR /app
CMD ["dist/index.js"]