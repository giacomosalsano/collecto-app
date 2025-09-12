#!/bin/sh

echo "🚀 Starting Collecto App..."

echo "⏳ Waiting for database to be ready..."
until nc -z "$DB_HOST" 3306; do
    echo "Database is unavailable - sleeping"
    sleep 2
done

echo "✅ Database is ready!"

echo "⏳ Waiting for Redis to be ready..."
until redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping; do
    echo "Redis is unavailable - sleeping"
    sleep 2
done

echo "✅ Redis is ready!"

echo "🔄 Running database migrations..."
NODE_ENV=docker npx sequelize-cli db:migrate

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully!"
else
    echo "❌ Migrations failed!"
    exit 1
fi

echo "🌱 Running database seeders..."
NODE_ENV=docker npx sequelize-cli db:seed:all

if [ $? -eq 0 ]; then
    echo "✅ Seeders completed successfully!"
else
    echo "⚠️ Seeders failed (probably data already exists) - continuing anyway..."
fi

echo "🎯 Starting the application..."
npm run dev
