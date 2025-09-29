import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "node:path";

async function createDBUsers() {
    const usersDB = await open({
        filename: join("database", "auth", "users.db"),
        driver: sqlite3.Database
    });
    await usersDB.exec(`
        CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL)`);
    await usersDB.close();
    console.log("Database-tasks created");
}

createDBUsers();