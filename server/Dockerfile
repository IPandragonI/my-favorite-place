ARG NODE_VERSION=25.8.0-alpine3.23

FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json ./

COPY src ./src

RUN yarn build


FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start"]
