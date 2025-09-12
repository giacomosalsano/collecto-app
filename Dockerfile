FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build || echo "No build script found, skipping..."

EXPOSE 3000

RUN apk add --no-cache mysql-client netcat-openbsd redis

RUN chmod +x /app/scripts/start.sh

ENV NODE_ENV=development
ENV DB_HOST=db
ENV DB_USER=user
ENV DB_PASSWORD=password
ENV DB_NAME=collecto_db
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

CMD ["sh", "/app/scripts/start.sh"]
