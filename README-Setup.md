# 🚀 Setup & Run Guide

## Step 0 — Clone the Repository

Before getting started, make sure you have cloned the project to your local machine.

### 📥 Clone the project:

```bash
git clone https://github.com/giacomosalsano/collecto-app.git
```

This command will download all project files and create a folder named `collecto-app` in your current directory

---

## Step 1 — Environment Configuration

1. **Copy the example environment files:**

   ```bash
   cp .env.example .env
   cp docker.example.env docker.env
   ```

2. The default values in both `.env` and `docker.env` are safe for development use.

   ✅ **No sensitive data is included.**

3. The only required change:
   - Update the `JWT_SECRET` field in **both** files to a secure value of your choice.

---

## Step 2 — Start Docker Desktop

Make sure **Docker Desktop** is running before proceeding.

📦 This project uses Docker to manage the API, MySQL, and Redis services.

---

## Step 3 — Start the Application

### 1️⃣ Option 1 — First-Time Setup (Recommended)

Run the following command to reset and start everything fresh:

```bash
npm run docker:fresh && npm run docker:up
```

✅ This will:

- Clean environment
- Build the app
- Run migrations and seeders
- Start all services

Wait until you see:

```
🚀 Server is running on http://localhost:3000
✅ Connected to Redis.
```

**You're ready to go!**

---

### 🔁 Option 2 — Run Commands Separately

#### Step 3.1 — Clean the Environment

```bash
npm run docker:fresh
```

This will:

- Stop and remove all containers related to `collecto-app`
- Clear existing data related to `collecto-app`

Wait for:

```
✅ Environment cleaned!
🚀 Now run: npm run docker:up
```

#### Step 3.2 — Start Services

```bash
npm run docker:up
```

This command will:

1. ✅ Download MySQL and Redis images
2. ✅ Build the application image
3. ✅ Create and run containers
4. ✅ Apply database migrations
5. ✅ Run seed data
6. ✅ Start the API server

You'll see:

```
🚀 Server is running on http://localhost:3000
✅ Connected to Redis.
```

---

### ✅ Once you complete Step 3 you'll be able to access

- **API:** [http://localhost:3000](http://localhost:3000/)
- **Swagger Docs:** http://localhost:3000/api-docs
- **MySQL:** `localhost:3306` (`user: user`, `password: password`)
- **Redis:** `localhost:6379`

The API will be available at `http://localhost:3000` with the following endpoints:

- `POST /collecto/login` - Login
- `GET /collecto/products` - List products
- `POST /collecto/purchase` - Purchase product
- `GET /collecto/user/collection` - User collection

**If you're having problems to connect the API:** Repeat the Step 3 and try again!

---

## Step 4 — Testing the API

### ✅ Option A: Swagger (Recommended)

Open your browser and go to: http://localhost:3000/api-docs

Explore and test all endpoints via **Swagger UI**.

---

### 🧪 Option B: Postman (or other API tools)

#### 🔐 1. Login (Authentication)

- **Method:** `POST`
- **URL:** `http://localhost:3000/collecto/login`
- **Body:**

```json
{
  "email": "tom@email.com",
  "password": "password"
}
```

ℹ️ Save the returned token — you'll need it for authenticated requests.

---

#### 📦 2. Get All Products

- **Method:** `GET`
- **URL:** `http://localhost:3000/collecto/products`
- **Authentication:** Not required
- No params or body needed — just hit `Send` to get the list of products.

---

#### 🛒 3. Purchase Product

- **Method:** `POST`
- **URL:** `http://localhost:3000/collecto/purchase`
- **Headers:** Add the token as `Authorization: Bearer <token_provided_in_login_endpoint>`
- **Body Example:**

```json
{
  "product_id": 1,
  "quantity": 25
}
```

---

#### 🎒 4. Get User's Collection

- **Method:** `GET`
- **URL:** `http://localhost:3000/collecto/user/collection`
- **Headers:** Add the token as `Authorization: Bearer <token_provided_in_login_endpoint>`

Returns the list of products the user owns.
