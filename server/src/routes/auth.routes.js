import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import check from "../middlewares/check.js";
const authRouter = express.Router();

authRouter.get("/check", check);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
