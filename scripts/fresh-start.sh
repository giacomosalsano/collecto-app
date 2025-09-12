#!/bin/bash

echo "🧹 Cleaning environment..."
echo ""

# Stop and remove all containers
echo ""
echo "🛑 Stopping existing containers..."
echo ""
docker-compose down -v

# Remove project images
echo ""
echo "🗑️ Removing project images..."
echo ""
docker rmi collecto-app_app 2>/dev/null || echo "Image not found (normal on first execution)"

# Clean orphaned volumes
echo ""
echo "🧽 Cleaning orphaned volumes..."
echo ""
docker volume prune -f

# Clean Docker cache (optional - uncomment for complete cleanup)
# echo "🧽 Cleaning Docker cache..."
# docker system prune -f

echo ""
echo "✅ Environment cleaned!"
echo ""
echo "🚀 Now run: npm run docker:up"
echo ""
echo "📋 This command will trigger the following actions:"
echo "   1. ✅ Download MySQL and Redis images"
echo "   2. ✅ Build application image"
echo "   3. ✅ Create containers"
echo "   4. ✅ Run migrations"
echo "   5. ✅ Run seeders"
echo "   6. ✅ Start API"
echo ""
echo "🌐 Access after startup:"
echo "   - API: http://localhost:3000"
echo "   - Swagger Documentation: http://localhost:3000/api-docs"
echo "   - MySQL: localhost:3306 (user: user, password: password)"
echo "   - Redis: localhost:6379"
