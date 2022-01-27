FROM node:12-alpine AS builder

RUN mkdir -p /node/api/build/node_modules && chown -R node:node /node/api/build

WORKDIR /node/api/build

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN npm build

FROM node:lts-alpine

RUN mkdir -p /node/api/node_modules && chown -R node:node /node/api

WORKDIR /node/api

RUN npm add pm2

USER node

COPY --chown=node:node --from=builder /node/api/build/node_modules ./node_modules
COPY --chown=node:node --from=builder /node/api/build/process.yml .
COPY --chown=node:node --from=builder /node/api/build/dist .

EXPOSE 3333

CMD ["pm2-runtime", "process.yml"]