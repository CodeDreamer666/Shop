import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "node:path";

async function createDBTasks() {
    const tasksDB = await open({
        filename: join("database", "tasks", "tasks.db"),
        driver: sqlite3.Database
    });
    await tasksDB.exec(`
        CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id))`);
        
    await tasksDB.close();
    console.log("Database-tasks created");
}

createDBTasks();