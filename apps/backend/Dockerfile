FROM node:24-alpine
WORKDIR /app
COPY tsconfig.base.json ./
COPY apps/backend/package*.json ./apps/backend/
RUN cd apps/backend && npm install
COPY apps/backend/tsconfig.json ./apps/backend/
COPY apps/backend/src ./apps/backend/src
RUN cd apps/backend && npm run build
EXPOSE 3000
CMD ["node", "apps/backend/dist/main.js"]