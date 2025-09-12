#!/bin/sh
echo ""
echo "🚀 Starting Collecto App..."
echo ""

echo ""
echo "⏳ Waiting for database to be ready..."
echo ""
until nc -z "$DB_HOST" 3306; do
    echo ""
    echo "Database is unavailable - sleeping"
    echo ""
    sleep 2
done

echo ""
echo "✅ Database is ready!"
echo ""

echo ""
echo "⏳ Waiting for Redis to be ready..."
echo ""
until redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping; do
    echo ""
    echo "Redis is unavailable - sleeping"
    echo ""
    sleep 2
done

echo ""
echo "✅ Redis is ready!"
echo ""

echo ""
echo "🔄 Running database migrations..."
echo ""
NODE_ENV=docker npx sequelize-cli db:migrate

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migrations completed successfully!"
    echo ""
else
    echo ""
    echo "❌ Migrations failed!"
    echo ""
    exit 1
fi

echo ""
echo "🌱 Running database seeders..."
echo ""
NODE_ENV=docker npx sequelize-cli db:seed:all

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Seeders completed successfully!"
    echo ""
else
    echo ""
    echo "⚠️ Seeders failed (probably data already exists) - continuing anyway..."
    echo ""
fi

echo ""
echo "🎯 Starting the application..."
echo ""
npm run dev
