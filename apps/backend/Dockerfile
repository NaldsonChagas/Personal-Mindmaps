FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci 2>/dev/null || true
COPY . .
EXPOSE 3000
CMD ["node", "src/main.js"]