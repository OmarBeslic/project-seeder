# syntax=docker/dockerfile:1.6
FROM --platform=$TARGETPLATFORM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Start the SSR server
CMD ["node", "server.js"]
