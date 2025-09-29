import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "node:path";

export default function getDBTasks() {
    return open({
        filename: join("database", "tasks", "tasks.db"),
        driver: sqlite3.Database
    });
}