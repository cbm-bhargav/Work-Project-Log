# 🚀 Secure Auth Todo API

A secure and scalable **RESTful Todo API** built with **Node.js**, **Express**, **MySQL**, and **Sequelize ORM**.

This project focuses on **JWT authentication**, **protected routes**, **database relationships**, and **backend best practices**.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MySQL  
- **ORM:** Sequelize  
- **Authentication:** JWT (JSON Web Tokens)  
- **Environment Management:** dotenv  

---

## ✨ Key Features

- 🔐 **JWT Authentication**  
  Secure user registration and login with token-based authentication.

- 🛡️ **Protected Routes**  
  Only authenticated users can create, update, or delete todos.

- 🗂️ **Sequelize Models & Relationships**  
  Well-structured models with proper associations between **Users** and **Todos**.

- 📝 **Todo CRUD Operations**  
  Full Create, Read, Update, and Delete functionality for todos.

- ⚠️ **Centralized Error Handling**  
  Consistent error responses across the API.

- 🛣️ **RESTful API Design**  
  Clean and predictable endpoints following REST conventions.

---

## 🧩 Database Models

### User
- userId (primary key)
- name  
- email  
- password (hashed)  
- createdAt  
- updatedAt  

### Todo
- id  
- title  
- status  
- userId (foreign key)  
- createdAt  
- updatedAt  

**Relationship:**  
One **User** → Many **Todos**

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login user and receive JWT |

---

### 📝 Todos (Protected Routes)

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/todos` | Get all todos for logged-in user |
| GET | `/api/todos/:id` | Get a single todo |
| POST | `/api/todos` | Create a new todo |
| PATCH | `/api/todos/:id` | Update an existing todo |
| DELETE | `/api/todos/:id` | Delete a todo |

---

## 🔒 Authorization

```http
Authorization: Bearer <JWT_TOKEN>

