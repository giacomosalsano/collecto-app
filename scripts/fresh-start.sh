#!/bin/bash

echo "🧹 Cleaning environment to simulate first execution..."
echo ""

# Stop and remove all containers
echo "🛑 Stopping existing containers..."
docker-compose down -v

# Remove project images
echo "🗑️ Removing project images..."
docker rmi collecto-app_app 2>/dev/null || echo "Image not found (normal on first execution)"

# Clean orphaned volumes
echo "🧽 Cleaning orphaned volumes..."
docker volume prune -f

# Clean Docker cache (optional - uncomment for complete cleanup)
# echo "🧽 Cleaning Docker cache..."
# docker system prune -f

echo ""
echo "✅ Environment cleaned!"
echo ""
echo "🚀 Now run: npm run docker:up"
echo "   This will simulate a complete first execution"
echo ""
echo "📋 What will happen:"
echo "   1. ✅ Download MySQL and Redis images"
echo "   2. ✅ Build application image"
echo "   3. ✅ Create containers"
echo "   4. ✅ Run migrations"
echo "   5. ✅ Run seeders"
echo "   6. ✅ Start API"
echo ""
echo "🌐 Access after startup:"
echo "   - API: http://localhost:3000"
echo "   - MySQL: localhost:3306 (user: user, password: password)"
echo "   - Redis: localhost:6379"
