# Collecto App - Docker Commands Reference

> **📋 Setup Instructions:** See the main [README.md](./README.md) for complete setup and first-time configuration.

This document contains Docker-specific commands and troubleshooting information for the Collecto App.

## 🔧 Useful commands

### Manage containers

```bash
# Start only database and Redis services
docker-compose up db redis

# Start everything in background
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop and remove volumes
docker-compose down -v
```

### Manage database

```bash
# Run migrations manually
docker-compose exec app npm run migrate

# Run seeders manually
docker-compose exec app npm run seed

# Undo all migrations
docker-compose exec app npm run migrate:undo

# Undo all seeders
docker-compose exec app npm run seed:undo
```

## 🌐 Service Access

- **API**: http://localhost:3000
- **MySQL**: localhost:3306 (user: `user`, password: `password`)
- **Redis**: localhost:6379

## 🐛 Troubleshooting

### If the application doesn't connect to the database:

1. Check if MySQL is running: `docker-compose ps`
2. Check logs: `docker-compose logs db`
3. Wait more time for database to initialize

### If migrations fail:

1. Check if database is accessible: `docker-compose exec db mysql -u user -p collecto_db`
2. Run migrations manually: `docker-compose exec app npm run migrate`

### To clean everything and start from scratch:

```bash
npm run docker:fresh
npm run docker:up
```

## 🔐 Docker Environment Variables

The following variables are automatically configured in the Docker environment:

- `NODE_ENV=docker`
- `DB_HOST=db`
- `DB_USER=user`
- `DB_PASSWORD=password`
- `DB_NAME=collecto_db`
- `REDIS_HOST=redis`
- `REDIS_PORT=6379`

### Environment Files

- `docker.example.env` - Example environment file for Docker (copy to `docker.env`)
- `docker.env` - Environment variables for Docker (used by docker-compose) - **NOT COMMITTED**

**⚠️ Note:** For production deployments, change sensitive values like `JWT_SECRET`, `DB_PASSWORD`, etc.

## 🐳 Advanced Docker Commands

### Container Management

```bash
# View running containers
docker-compose ps

# View container resource usage
docker stats

# Execute commands inside containers
docker-compose exec app sh
docker-compose exec db mysql -u user -p collecto_db
docker-compose exec redis redis-cli

# View detailed container information
docker-compose top
```

### Logs and Debugging

```bash
# View logs for specific services
docker-compose logs -f app
docker-compose logs -f db
docker-compose logs -f redis

# View logs with timestamps
docker-compose logs -f -t app

# View last 100 lines of logs
docker-compose logs --tail=100 app
```

### Data Management

```bash
# Backup database
docker-compose exec db mysqldump -u user -p collecto_db > backup.sql

# Restore database
docker-compose exec -T db mysql -u user -p collecto_db < backup.sql

# Access Redis data
docker-compose exec redis redis-cli
```

### Development Workflow

```bash
# Rebuild only the app container
docker-compose build app

# Start only database services (for local development)
docker-compose up db redis

# Run tests inside container
docker-compose exec app npm test

# Install new dependencies
docker-compose exec app npm install package-name
```
