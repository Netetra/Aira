FROM node:18 as builder
WORKDIR /source

COPY . .

RUN npm ci && npm run build

FROM archlinux:latest
WORKDIR /app

RUN pacman -Syu --noconfirm && pacman -S archlinux-keyring nodejs-lts-hydrogen npm --noconfirm

COPY --from=builder /source/build ./build
COPY package*.json ./

RUN npm install --only=production

CMD ["npm", "start"]
