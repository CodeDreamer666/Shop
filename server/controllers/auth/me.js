import getDBUsers from "../../database/auth/getDB-users.js";

export const meController = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.json({ isLoggedIn: false });
        }
        const usersDB = await getDBUsers();
        const user = await usersDB.get("SELECT name FROM users WHERE id = ?", [req.session.userId]);
        res.json({ isLoggedIn: true, name: user.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong " });
    }
}