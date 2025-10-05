import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "node:path";

let db; // singleton instance

export default async function getDBUsers() {
    if (!db) {
        db = await open({
            filename: join("database", "auth", "users.db"),
            driver: sqlite3.Database
        });
    }
    return db;
}