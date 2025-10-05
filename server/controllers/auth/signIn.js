import getDBUsers from "../../database/auth/getDB-users.js";
import validator from "validator";
import bcrypt from "bcryptjs";

export const signInController = async (req, res) => {
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
    try {
        const database = await getDBUsers();
        const existing = await database.get(`SELECT id FROM users WHERE name = ? OR email = ?`, [name, email]);
        if (existing) {
            return res.status(400).json({ error: "Email or Name already in use" });
        }
        const result = await database.run(`
        INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashpassword]);
        req.session.userId = result.lastID;
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Registration failed. Please try again.' });
            }
        })
        const user = await database.get(`SELECT name FROM users WHERE id = ?`, [result.lastID])
        res.status(201).json({ message: `Welcome, ${user.name}` });

    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Registration failed. Please try again.' })
    }
}
