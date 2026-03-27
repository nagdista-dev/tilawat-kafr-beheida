import express from "express";
import check from "../middlewares/check.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addNewReader } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.post("/add-reader", check, isAdmin, addNewReader);
// adminRouter.post("/add-audio");

export default adminRouter;
