FROM node:21-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build

FROM node:21-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# EXPOSE 3000
# ENTRYPOINT ["npm", "start"]
CMD ["node", "server.js"]