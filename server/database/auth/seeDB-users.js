import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "node:path";

async function seeDBUsers() {
    const usersDB = await open({
        filename: join("database", "auth", "users.db"),
        driver: sqlite3.Database
    });
    const usersData = await usersDB.all("SELECT * FROM users");
    await usersDB.close();
    console.log(usersData);
}

seeDBUsers();