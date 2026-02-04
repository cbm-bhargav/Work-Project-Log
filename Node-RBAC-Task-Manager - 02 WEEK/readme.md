# 🔐 Secure RBAC Task Manager (Node.js + Sequelize)

A **Role-Based Access Control (RBAC)** task management system built with **Node.js, Express, Sequelize, JWT, and MySQL**.  
This project demonstrates **authentication, authorization, ownership-based access**, and clean backend architecture.

---

## 🚀 Features

### 👥 Role-Based Access Control (RBAC)

| Role | Capabilities |
|-----|-------------|
| **Admin** | Manage all users, view all tasks |
| **Manager** | Create tasks, assign users, manage own tasks |
| **User** | View assigned tasks, update task status |

---

### 👤 User Management
- Admin-only user creation
- Role validation (`admin`, `manager`, `user`)
- Password hashing using **bcrypt**
- Users can only view permitted peers based on role

---

### 📋 Task Management
- Managers create and assign tasks
- Tasks can only be assigned to users
- Users can update **only task status**
- Ownership checks at controller level
- Authorization at route level

---

### 🔐 Security
- JWT-based authentication
- Role-based authorization middleware
- Controller-level ownership enforcement
- Passwords excluded from API responses

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Sequelize
- **Database**: MySQL
- **Authentication**: JWT
- **Authorization**: Custom RBAC Middleware
- **Password Hashing**: bcrypt / bcryptjs
- **Config**: dotenv

---

## 📂 Project Structure
```
src/
├── config/             # Database connection and environment configuration
│   └── database.js
├── constants/          # Application-wide constants (Roles, Task Status)
│   ├── roles.js
│   └── status.js
├── controllers/        # Request handlers and business logic
│   ├── authController.js
│   ├── userController.js
│   └── taskController.js
├── middlewares/        # Security, JWT, and RBAC authorization guards
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/             # Sequelize/Database schemas and definitions
│   ├── authModel.js
│   ├── userModel.js
│   └── taskModel.js
├── routes/             # API route definitions and middleware mapping
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── taskRoutes.js
├── scripts/            # Automation and initialization scripts
│   └── seedAdmin.js
├── app.js              # Express app setup (Middleware, Route mounting)
└── server.js           # Entry point (Server listener and DB sync)
```
---

## 🔑 Roles

- **ADMIN**
- **MANAGER**
- **USER**

---

## 📌 Task Status

- **PENDING**
- **IN_PROGRESS**
- **COMPLETED**

---

## 🔌 API Endpoints

### 👤 Users

| Method | Endpoint         | Access               |
| ------ | ---------------- | -------------------- |
| GET    | `/api/users`     | Admin, Manager, User |
| GET    | `/api/users/:id` | Admin, Manager, User |
| POST   | `/api/users`     | Admin                |
| PATCH  | `/api/users/:id` | Admin                |
| DELETE | `/api/users/:id` | Admin                |

---

### 📋 Tasks

| Method | Endpoint                | Access               |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/tasks`            | Admin, Manager, User |
| GET    | `/api/tasks/:id`        | Admin, Manager, User |
| POST   | `/api/tasks`            | Manager              |
| PATCH  | `/api/tasks/:id/manage` | Manager              |
| PATCH  | `/api/tasks/:id/status` | User                 |

---

## 🔄 Task Access Rules

| Role    | View Tasks  | Modify Tasks |
| ------- | ----------- | ------------ |
| Admin   | All         | ❌            |
| Manager | Own created | ✅            |
| User    | Assigned    | Status only  |

---

## 🧪 Default Admin Credentials

Seeded using admin seeder:

```json
{
  "email": "admin@system.com",
  "password": "Admin@123"
}
```

⚠️ Change credentials in production.

---

## ▶️ Setup & Run

### Install Dependencies

```bash
npm install
```

### Environment Variables (`.env`)

```env
PORT=5000
DB_NAME=rbac_db
DB_USER=root
DB_PASSWORD=yourpassword
JWT_SECRET=your_secret
```

### Run Migrations

```bash
npx sequelize-cli db:migrate
```

### Seed Admin

```bash
node seed/seedAdmin.js
```

### Start Server

```bash
npm run dev
```

---

## 👨‍💻 Author

**Bhargav Chauhan**
Backend Developer — Node.js | Express.js | MySQL | Sequelize | JsonWebToken | RBAC 

---
