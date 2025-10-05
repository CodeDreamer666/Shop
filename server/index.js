import express from "express";
import cors from "cors";
import { taskRouter } from "./routes/task/taskRouter.js";
import { authRouter } from "./routes/auth/authRouter.js";
import session from "express-session";
import { SESSION_SECRET } from "./config.js";

const PORT = 8000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}));

app.use("/api", taskRouter);
app.use("/api", authRouter);



app.listen(PORT, () => console.log(`Server is connected at port: ${PORT}`));
