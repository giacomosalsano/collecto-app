# Collecto App - Docker Setup

This project is configured to run completely with Docker, including database, Redis and the Node.js application.

## 🚀 How to use

### 0. First time setup (copy environment file)

```bash
# Copy the example environment file
cp docker.example.env docker.env
```

### 1. To simulate first execution (or clean environment)

```bash
npm run docker:fresh
```

This command cleans everything and simulates a completely new environment.

### 2. Start the entire application

```bash
npm run docker:up
```

This command will:

- ✅ Build the application image
- ✅ Start MySQL database
- ✅ Start Redis
- ✅ Wait for database to be ready
- ✅ Run migrations automatically
- ✅ Run seeders automatically
- ✅ Start the application in development mode

### 3. Check application logs

```bash
npm run docker:logs
```

### 4. Stop all services

```bash
npm run docker:down
```

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

## 🌐 Access

- **API**: http://localhost:3000
- **MySQL**: localhost:3306
- **Redis**: localhost:6379

## 📋 API Endpoints

The API will be available at `http://localhost:3000` with the following endpoints:

- `GET /` - Health check
- `POST /collecto/auth/login` - Login
- `POST /collecto/auth/register` - Register
- `GET /collecto/products` - List products
- `GET /collecto/user/collection` - User collection
- `POST /collecto/purchase` - Purchase product

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
docker-compose down -v
docker system prune -f
npm run docker:up
```

## 🔐 Environment Variables

The following variables are configured in Docker:

- `NODE_ENV=docker`
- `DB_HOST=db`
- `DB_USER=user`
- `DB_PASSWORD=password`
- `DB_NAME=collecto_db`
- `REDIS_HOST=redis`
- `REDIS_PORT=6379`
- `JWT_SECRET=your_jwt_secret_here`

### Environment Files

- `.env.example` - Example environment file for local development (copy to `.env`)
- `docker.example.env` - Example environment file for Docker (copy to `docker.env`) - **READY TO USE**
- `docker.env` - Environment variables for Docker (used by docker-compose) - **NOT COMMITTED**

### Setup Instructions

1. **For local development:**

   ```bash
   cp .env.example .env
   ```

2. **For Docker:**
   ```bash
   cp docker.example.env docker.env
   ```

**⚠️ Note:** The current configuration uses development values. For production, change sensitive values like `JWT_SECRET`, `DB_PASSWORD`, etc.
