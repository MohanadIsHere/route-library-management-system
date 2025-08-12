# 📚 Library Management System (Backend - Node.js)

A backend API for managing books, users, and borrowing transactions.  
Built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, **Joi**, **Bcrypt**, and **JWT**.  

This project is implemented for the **Route Academy Backend Node.js Exam** requirements.  
It includes **secure authentication**, **input validation**, and **CRUD operations** for books, users, and transactions.

---

## 🔗 Postman API Documentation
You can view and test all API endpoints using the Postman collection:  
[📄 API Documentation](https://documenter.getpostman.com/view/37358976/2sB3BGFpCy)

---

## 📌 Features

### User Management
- **Register** with hashed password
- **Login** and receive a JWT token
- **View profile** (JWT protected)

### Book Management
- Add, update, delete, and list books
- Sort by `title` or `publishedYear`
- **Role-based restriction** for admin-only book management (bonus)

### Transaction Management
- Borrow books (decrease available copies)
- Return books (increase available copies)
- View transaction history

### Security & Validation
- JWT authentication middleware
- Joi request validation
- Password hashing with Bcrypt
- Proper error handling with HTTP status codes

---

## 🛠️ Tech Stack
- **Node.js** + **Express** (server)
- **MongoDB** + **Mongoose** (database & ORM)
- **Joi** (validation)
- **Bcrypt** (password hashing)
- **JWT** (authentication)

---

## 📂 Project Structure
```
└── 📁route-library-managment-system
    └── 📁src
        └── 📁config
            ├── env.js
        └── 📁database
            └── 📁models
                ├── book.model.js
                ├── transaction.model.js
                ├── user.model.js
            ├── connection.db.js
        └── 📁middlewares
            ├── auth.middleware.js
            ├── error.middleware.js
            ├── validation.middleware.js
        └── 📁modules
            └── 📁books
                ├── book.controller.js
                ├── book.routes.js
                ├── book.validation.js
            └── 📁transactions
                ├── transaction.controller.js
                ├── transaction.routes.js
                ├── transaction.validation.js
            └── 📁users
                ├── user.controller.js
                ├── user.routes.js
                ├── user.validation.js
        └── 📁utils
            └── 📁encryption
                ├── encryption.js
            └── 📁events
                └── 📁email
                    ├── sendEmail.js
                ├── eventEmitter.js
            └── 📁hashing
                ├── hashing.js
            └── 📁token
                ├── token.js
        ├── server.js
    ├── .env.dev.local
    ├── .gitignore
    ├── app.js
    ├── eslint.config.js
    ├── package-lock.json
    ├── package.json
    └── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MohanadIsHere/route-library-management-system.git
cd route-library-management-system
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables  
Create a `.env.dev.local` file in the root directory and set:
```
PORT
NODE_ENV
DB_URI
JWT_ACCESS_TOKEN_SECRET
JWT_ACCESS_TOKEN_SECRET_ADMIN
JWT_REFRESH_TOKEN_SECRET_ADMIN
JWT_ACCESS_TOKEN_EXPIRES_IN
JWT_REFRESH_TOKEN_SECRET
JWT_REFRESH_TOKEN_EXPIRES_IN
ENCRYPTION_KEY
SALT_ROUNDS

```

### 4️⃣ Run the server
```bash
npm run dev
```
Server will run on: **http://localhost:3000**

---

## 📜 API Endpoints

### User Routes
| Method | Endpoint                 | Description               | Auth |
|--------|--------------------------|---------------------------|------|
| POST   | /api/users/register       | Register a new user       | ❌   |
| POST   | /api/users/login          | Login and get token       | ❌   |
| GET    | /api/users/profile        | Get logged-in user profile| ✅   |

### Book Routes
| Method | Endpoint                 | Description         | Auth |
|--------|--------------------------|---------------------|------|
| POST   | /api/books               | Add a new book      | ✅ Admin |
| GET    | /api/books               | Get all books       | ✅   |
| PUT    | /api/books/:id           | Update book details | ✅ Admin |
| DELETE | /api/books/:id           | Delete a book       | ✅ Admin |

### Transaction Routes
| Method | Endpoint                        | Description                | Auth |
|--------|---------------------------------|----------------------------|------|
| POST   | /api/transactions/borrow        | Borrow a book              |  ✅   |
| PUT    | /api/transactions/return/:id    | Return a borrowed book     |  ✅   |
| GET    | /api/transactions/user          | Get user transaction history| ✅  |

---

## 🏆 Bonus Features Implemented
- ✅ **Role-Based Access Control**
- ✅ **Advanced Search with Pagination** (`GET /api/books/search`)
- ✅ **Admin View All Transactions** (`GET /api/transactions/all`)
- ✅ **Rate Limiting on Login**

---

## 🧪 Testing
- Use **Postman** link above to test routes
- All routes return **JSON** responses
- Protected routes require `Authorization: Bearer <token>` header