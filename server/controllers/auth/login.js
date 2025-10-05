import getDBUsers from "../../database/auth/getDB-users.js";
import bcrypt from "bcryptjs";

export const loginController = async (req, res) => {
    try {
        const usersDB = await getDBUsers();
        // Check if all input field is empty
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ error: 'All fields are required' })
        }

        email = email.trim();
        password = password.trim();

        // Check if user exists
        const existing = await usersDB.get("SELECT id FROM users WHERE email = ? ", [email]);
        if (!existing) {
            return res.status(401).json({ error: `Invalid credentials` })
        }

        // Check if user types in the password correctly
        const passwordFromDB = await usersDB.get("SELECT password FROM users WHERE email = ?", [email]);
        const isMatch = await bcrypt.compare(password, passwordFromDB.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Password is incorrect. Please try again" })
        }

        // Process of user's login
        req.session.userId = existing.id;
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Login failed. Please try again.' });
            }
        });

        res.json({ message: "Login successfully" });
    } catch (err) {
        console.error(err);
    }
}