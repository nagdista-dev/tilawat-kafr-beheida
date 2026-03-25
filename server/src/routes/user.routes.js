import express from "express";
import check from "../middlewares/check.js";
import {
  updateProfilePicture,
} from "../controllers/user.controller.js";
import upload from "../configs/multer.js";

const userRouter = express.Router();

userRouter.post(
  "/update-profile-pic",
  check,
  upload.single("profile-pic"),
  updateProfilePicture,
);

export default userRouter;
