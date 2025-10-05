import express from "express";
import cors from "cors";
import { signInController } from "../../controllers/auth/signIn.js";
import { meController } from "../../controllers/auth/me.js";
import { loginController } from "../../controllers/auth/login.js";
import { logoutController } from "../../controllers/auth/logout.js";

const app = express();
export const authRouter = express.Router();
app.use(cors());
app.use(express.json());

authRouter.post("/auth/sign-in", signInController);
authRouter.get("/auth/me", meController);
authRouter.post("/auth/login", loginController);
authRouter.post("/auth/logout", logoutController);