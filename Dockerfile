FROM node:22-alpine AS test

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

CMD ["npm", "run", "test:unit"]

FROM node:22-alpine AS production

WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN apk update && apk upgrade --no-cache

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=test /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/index.js"]
