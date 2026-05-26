# WellHome API

REST API for WellHome, a condominium management platform. Handles properties, fees, maintenance components, user roles, authentication, and contact forms.

## Tech Stack

Node.js + Express, PostgreSQL (Sequelize), MongoDB (Mongoose), JWT auth, Winston logging

## Quick Start

```bash
cp .env.example .env
# Edit .env with your database credentials
npm install
npm start
```

The server runs on `http://localhost:3001` by default.

## Environment Variables

See `.env.example` for all required variables: PostgreSQL connection, MongoDB connection, JWT secret, and CORS origins.

## API Endpoints

| Resource | Methods |
|----------|---------|
| `/contactform` | POST, GET, DELETE |
| `/preregister` | POST, GET, DELETE |
| `/managementco` | POST, PUT, DELETE, GET |
| `/mainplace` | POST, PUT, DELETE, GET, PATCH |
| `/property` | POST, PUT, DELETE, GET, PATCH |
| `/fee` | POST, PUT, DELETE, GET |
| `/component` | POST, PUT, DELETE, GET |
| `/usercat` | POST, PUT, DELETE, GET |
| `/users` | POST, PUT, DELETE, GET |
| `/signup` | POST |
| `/login` | POST |

## Database

- **PostgreSQL**: Core relational data (users, properties, fees, components, etc.) via Sequelize
- **MongoDB**: Contact forms and pre-registrations via Mongoose

## Project Status

This is a portfolio project. Core CRUD endpoints are functional. Features marked as pending in the original notes are tracked for future iterations.
