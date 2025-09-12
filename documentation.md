# Collecto App - Complete Documentation

## 📋 Overview

Collecto App is a sophisticated investment platform that enables users to purchase fractional shares of products through a secure, scalable backend API. The application leverages a microservices architecture with Docker containerization, providing a robust solution for managing product investments, user portfolios, and transaction processing. Built with TypeScript and Node.js, it features real-time caching with Redis, comprehensive authentication with JWT tokens, and a well-structured domain-driven design pattern.

---

## 🏗️ System Architecture

### Tech Stack

- **Framework:** Node.js with Express.js
- **Language:** TypeScript
- **Database:** MySQL 8.0 with Sequelize ORM
- **Caching:** Redis 6.2
- **Authentication:** JWT (JSON Web Tokens) with bcryptjs
- **API Documentation:** Swagger/OpenAPI
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest with TypeScript support
- **Migration Management:** Sequelize CLI
- **Key Libraries/Services:** Express, Sequelize, Redis, JWT, Swagger

<div align="center" style="display: inline_block justify-center"><br>
  <img src="https://skillicons.dev/icons?i=typescript,nodejs,mysql,redis,docker,express,jest,sequelize" alt="icons" /> </div>

### Data Flow

`1. User authentication → 2. JWT token validation → 3. API request processing → 4. Business logic execution → 5. Database transaction → 6. Cache invalidation → 7. Response delivery`

---

## 🗂️ Project Structure

```
collecto-app/
  ├─ src/
  │  ├─ modules/          # Domain modules (auth, products, purchases, collections)
  │  │  ├─ auth/          # Authentication and user management
  │  │  ├─ products/      # Product catalog and share management
  │  │  ├─ purchases/     # Purchase transactions and processing
  │  │  └─ collections/   # User portfolio management
  │  ├─ shared/           # Shared utilities and configurations
  │  │  ├─ config/        # Environment and Swagger configuration
  │  │  ├─ database/      # Database connection setup
  │  │  ├─ middlewares/   # Express middlewares (auth, etc.)
  │  │  ├─ services/      # Shared services (Cache, etc.)
  │  │  ├─ types/         # Global TypeScript type definitions
  │  │  └─ utils/         # Utility functions
  │  ├─ docs/             # API documentation (OpenAPI specs)
  │  ├─ app.ts            # Express application setup
  │  └─ server.ts         # Server entry point
  ├─ database/
  │  ├─ models/           # Sequelize data models
  │  ├─ migrations/       # Database schema migrations
  │  └─ seeders/          # Database seed data
  ├─ config/              # Application configuration
  ├─ scripts/             # Deployment and utility scripts
  └─ docker-compose.yml   # Docker services configuration
```

---

## 🔐 Authentication & Security

- **Auth Flow:** Users authenticate via email/password, receive JWT tokens with 12-hour expiration, tokens are validated on protected routes, and sessions are stateless for scalability.
- **Key Auth Files:** `AuthController.ts` handles login requests, `AuthUseCase.ts` manages authentication logic with bcrypt password hashing, `authMiddleware.ts` validates JWT tokens on protected endpoints, and `UserRepository.ts` manages user data persistence.

---

## 🧑‍💻 Main Features & Flows

### 1. User Authentication & Management

- Users can authenticate with email and password through the `/collecto/login` endpoint
- JWT tokens are generated with user information and 12-hour expiration
- Password hashing is handled with bcryptjs for security
- User balance and profile information are managed through the User model

### 2. Product Catalog & Share Management

- Products are displayed with total value, available shares, and share prices
- Each product has a unique slug for SEO-friendly URLs
- Share availability is tracked through the ProductShare model
- Products can be marked as sold when shares are purchased

### 3. Investment Purchase System

- Users can purchase fractional shares of products through `/collecto/purchase`
- Transaction validation ensures sufficient balance and share availability
- Database transactions ensure data consistency during purchases
- User balance is automatically updated after successful purchases
- Cache invalidation maintains data consistency across the system

### 4. Portfolio Management

- Users can view their investment portfolio through `/collecto/user/collection`
- Collection data is cached in Redis for improved performance
- Portfolio includes purchased shares, quantities, and current values
- Real-time updates reflect recent purchases and market changes

---

## 🧩 Components

- **AuthController:** Handles user authentication requests and JWT token generation
- **ProductController:** Manages product catalog operations and share availability
- **PurchaseController:** Processes investment transactions with validation
- **CollectionController:** Retrieves and displays user portfolio information
- **AuthMiddleware:** Validates JWT tokens and protects authenticated routes
- **CacheService:** Manages Redis caching for improved performance
- **UserRepository:** Handles user data persistence and retrieval operations
- **ProductRepository:** Manages product and share data operations
- **TransactionRepository:** Processes and stores purchase transaction records

---

## 🧮 Core Logic / Key Algorithms

The core business logic revolves around the **fractional share purchase algorithm**:

1. **Share Availability Check:** The system queries available shares for a product, ensuring sufficient quantity exists
2. **Balance Validation:** User balance is verified against the total purchase cost (quantity × share_price)
3. **Atomic Transaction Processing:** All operations (balance deduction, share marking, transaction recording) occur within a database transaction
4. **Cache Invalidation:** User collection cache is invalidated to maintain data consistency
5. **Price Calculation:** Total cost is calculated as `available_shares × price_per_share_in_cents`

This ensures data integrity and prevents race conditions during concurrent purchase attempts.

---

## 📦 Dependencies

### Production

- `express` - Web framework for Node.js
- `sequelize` - SQL ORM for database operations
- `mysql2` - MySQL database driver
- `redis` - Redis client for caching
- `jsonwebtoken` - JWT token generation and validation
- `bcryptjs` - Password hashing and verification
- `dotenv` - Environment variable management
- `swagger-jsdoc` - API documentation generation
- `swagger-ui-express` - Swagger UI for API testing

### Development

- `typescript` - TypeScript compiler and language support
- `@types/express` - TypeScript definitions for Express
- `@types/node` - TypeScript definitions for Node.js
- `@types/jest` - TypeScript definitions for Jest
- `@types/bcryptjs` - TypeScript definitions for bcryptjs
- `@types/jsonwebtoken` - TypeScript definitions for JWT
- `jest` - Testing framework
- `ts-jest` - TypeScript preprocessor for Jest
- `ts-node-dev` - Development server with hot reload
- `sequelize-cli` - Database migration and seeding tools

---

## 🎨 Design & Styling

- **API Design:** RESTful API design with clear endpoint structure and HTTP status codes
- **Error Handling:** Comprehensive error handling with meaningful error messages and proper HTTP status codes
- **Response Format:** Consistent JSON response format across all endpoints
- **Documentation:** OpenAPI/Swagger documentation for all endpoints with examples
- **Code Organization:** Clean Architecture pattern with separation of concerns (Controllers, Use Cases, Repositories)

---

## 🛠️ Utilities

- **createSlug:** Generates URL-friendly slugs for products
- **CacheService:** Manages Redis cache operations with invalidation strategies
- **env:** Centralized environment configuration management
- **swaggerConfig:** Swagger/OpenAPI documentation configuration
- **Database Connection:** Sequelize database connection and configuration management

---

## 🌟 Strengths

1. **Clean Architecture** - Well-structured domain-driven design with clear separation of concerns
2. **Type Safety** - Full TypeScript implementation ensuring compile-time error detection
3. **Scalable Infrastructure** - Docker containerization with MySQL and Redis for production readiness
4. **Comprehensive Testing** - Jest test suite covering use cases and business logic
5. **API Documentation** - Complete Swagger/OpenAPI documentation for all endpoints
6. **Transaction Safety** - Database transactions ensure data consistency during complex operations
7. **Caching Strategy** - Redis integration for improved performance and reduced database load
8. **Security Implementation** - JWT authentication with bcrypt password hashing

---

## 🔧 Suggested Improvements

### High Priority

1. **Enhanced Test Coverage** - While tests exist, they can be improved to be more robust and comprehensive, covering edge cases and integration scenarios
2. **Input Validation** - Implement comprehensive input validation using libraries like Joi or Yup
3. **Error Logging** - Add structured logging with tools like Winston for better error tracking and monitoring
4. **Rate Limiting** - Implement rate limiting to prevent API abuse and ensure system stability

### Medium Priority

1. **Database Indexing** - Add proper database indexes for improved query performance
2. **API Versioning** - Implement API versioning strategy for future compatibility
3. **Health Checks** - Add comprehensive health check endpoints for monitoring
4. **Data Validation** - Implement request/response validation middleware

### Low Priority

1. **CI/CD Pipeline** - Set up automated testing and deployment pipelines
2. **Performance Monitoring** - Add application performance monitoring (APM) tools
3. **API Analytics** - Implement usage analytics and metrics collection
4. **Documentation Enhancement** - Add more detailed API examples and use cases

---

## 🎯 Conclusion

Collecto App represents a robust, well-engineered investment platform that demonstrates modern backend development practices. The application successfully implements a clean architecture pattern with TypeScript, providing type safety and maintainability. The Docker-based infrastructure ensures scalability and deployment flexibility, while the comprehensive API documentation facilitates developer integration. The system is ready for the next phase of development, with a focus on enhanced testing, monitoring, and performance optimization to support production-scale operations.
