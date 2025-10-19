# 🚀 Node.js Sequelize Project Setup


---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create a `.env` file based on `.env.example`

Example:

```env
PORT=3000

DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=database_development
DB_HOST=127.0.0.1
DB_DIALECT=postgres
DB_PORT=5432
```

---

### 3. Set up the database

Before running migrations or seeds, make sure you have:
- PostgreSQL installed and running.
- A matching username and password in your `.env` file.

Then, execute:

```bash
# Create the database
npm run db-create

# Run migrations (create tables)
npm run db-migrate

# Seed the database with initial data
npm run db-seed
```

If you ever want to **reset the database**, you can run:

```bash
npm run db-reset
```

This will drop, recreate, migrate, and reseed your database.

---

### 4. Run the development server

```bash
npm run dev
```

Your application should now be running on:
👉 **http://localhost:3000**

---

## 🗃️ Database Commands (Sequelize CLI)

| Command | Description |
|----------|--------------|
| `npm run db-create` | Create the database defined in `.env` |
| `npm run db-drop` | Drop the database |
| `npm run db-migrate` | Run all migrations (create tables) |
| `npm run db-migrate:undo` | Undo the last migration |
| `npm run db-seed` | Run all seeders (insert demo data) |
| `npm run db-seed-undo` | Undo all seed data |
| `npm run db-reset` | Drop, create, migrate, and seed the database in one command |

---

### 💡 Notes

Make sure you have Sequelize CLI installed either globally or locally:

```bash
npm install --save-dev sequelize-cli
```

If installed globally:

```bash
npm install -g sequelize-cli
```
