FROM node:24-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile --filter frontend --prod --ignore-scripts
COPY apps/frontend/ ./apps/frontend/
EXPOSE 4000
CMD ["node", "apps/frontend/server.js"]