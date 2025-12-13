# StoreFront Backend

## Setup

### Install dependencies
npm install

### Create PostgreSQL database
CREATE DATABASE storefront;

### Run migrations
POSTGRES_HOST=127.0.0.1 \
POSTGRES_DB=storefront \
POSTGRES_USER=storefront \
POSTGRES_PASSWORD=storefront \
npm run migrate:up

### Start server
npm run start
