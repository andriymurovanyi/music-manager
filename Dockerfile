FROM node:alpine

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node","dist/index.js"]

