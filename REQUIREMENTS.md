# StoreFront Backend Requirements

## Application Overview
Backend API supporting an online storefront with users, products, and orders.

---

## Requirements
- Node.js v14+
- PostgreSQL
- npm

---

## Environment Variables
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_TEST_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET

---

## Install Packages
npm install

---

## Database Setup

CREATE USER storefront WITH PASSWORD 'storefront';
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;

---

## Database Migration
node node_modules/db-migrate/bin/db-migrate up

---

## Run Server
npm run start

Server runs on port 3000.

---

## Tables
- users
- products
- orders
- order_products
