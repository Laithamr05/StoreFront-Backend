# StoreFront Backend API

This project is a backend RESTful API for an online storefront application.  
It supports product browsing, user management, and order processing.  
The API is built with **Node.js**, **Express**, **PostgreSQL**, and **db-migrate**.

---

## 📦 Features

### Products
- List all products
- View a single product by ID
- Create a new product (token required)
- Optional: filter by category
- Optional: top 5 popular products

### Users
- Create user (token required)
- View all users (token required)
- View user by ID (token required)

### Orders
- View current (active) order for a user (token required)
- Optional: view completed orders for a user

---

## 🗄️ Database Schema

### Tables
- `users`
- `products`
- `orders`
- `order_products`
- `migrations` (managed by db-migrate)

### Relationships
- A user has many orders
- An order has many products (via `order_products`)
- Each order has a status: `active` or `complete`

---

## ⚙️ Technologies Used

- Node.js
- Express
- PostgreSQL
- db-migrate
- TypeScript
- JSON Web Tokens (JWT)
- bcrypt

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have:
- Node.js (v14+ recommended)
- PostgreSQL
- npm

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Laithamr05/StoreFront-Backend.git
cd StoreFront-Backend
