import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "node:path";

async function seeDBTasks() {
    const tasksDB = await open({
        filename: join("database", "tasks", "tasks.db"),
        driver: sqlite3.Database
    });
    const tasksData = await tasksDB.all("SELECT * FROM tasks");
    await tasksDB.close();
    console.log(tasksData);
}

seeDBTasks();