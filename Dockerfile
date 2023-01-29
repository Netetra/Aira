FROM node:18 as builder
WORKDIR /source

COPY . .

RUN npm ci && npm run build

FROM node:18-slim
WORKDIR /app

COPY --from=builder /source/build ./build
COPY package*.json ./

RUN npm install --only=production

CMD ["node", "./build/index.js"]
