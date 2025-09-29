import express from "express";
import cors from "cors";
import validator from "validator";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs";
import { taskRouter } from "./routes/task/taskRouter.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRouter);

app.post("/api/auth/sign-in", async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All Fields are Required" });
    };
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(name)) {
        return res.status(400).json({ error: 'Name must be 1–20 characters, using letters, numbers, _ or -.' });
    };
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid Email Format" })
    };
    const hashpassword = await bcrypt.hash(password, 10);
    console.log("req.body:" + JSON.stringify({ ...req.body, password: hashpassword }));
    try {
        const database = await open({
            filename: join("DB", "users.db"),
            driver: sqlite3.Database
        });
        const existing = await database.get(`SELECT id FROM users WHERE name = ? OR email = ?`, [name, email]);
        if (existing) {
            return res.status(400).json({ error: "Email or Name already in use" });
        }
        await database.run(`
        INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashpassword]);

        res.status(201).json({ message: "User Registed" });

        await database.close();

    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Registration failed. Please try again.' })
    }
})

app.listen(PORT, () => console.log(`Server is connected at port: ${PORT}`));
