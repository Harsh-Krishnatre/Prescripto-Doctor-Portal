import express from "express";
import {
  userLogin,
  userRegister,
  getUser,
  userUpdate,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/get-user", authUser, getUser);
userRouter.post("/update-user", upload.single("image"), authUser, userUpdate);

export default userRouter;
