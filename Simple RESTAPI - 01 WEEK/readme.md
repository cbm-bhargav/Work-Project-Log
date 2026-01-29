# 🚀 MySQL CRUD API (Raw SQL)

A lightweight **RESTful API** built with **Node.js** and **Express.js**. This project bypasses heavy ORMs to interact directly with **MySQL** using **Raw SQL queries**, focusing on speed, transparency, and deep control over data manipulation.

---

## 🛠️ Tech Stack

* **Runtime:** `Node.js`
* **Framework:** `Express.js`
* **Database:** `MySQL`
* **Driver:** `mysql2`

---

## ✨ Key Features

* **⚡ Raw SQL Power**
    Manual query optimization without the overhead of an ORM, providing a deeper understanding of database logic.

* **🔄 Full CRUD Lifecycle**
    Complete implementation of **Create, Read, Update, and Delete** operations for database records.

* **🛣️ RESTful Architecture**
    Clean, predictable routing using standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).

* **🔗 Secure Connection**
    Robust integration with the MySQL server ensuring efficient data flow.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/data` | Fetch all records |
| **GET** | `/api/data/:id` | Fetch a single record by ID |
| **POST** | `/api/data` | Create a new record |
| **PUT** | `/api/data/:id` | Update an existing record |
| **DELETE** | `/api/data/:id` | Remove a record |
