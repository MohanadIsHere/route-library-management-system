import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import { loginValidationSchema, registerValidationSchema } from "./user.validation.js";
import * as userController from "./user.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const userRouter = Router();
userRouter.post(
  "/register",
  validation(registerValidationSchema),
  userController.register
);
userRouter.post(
  "/login",
  validation(loginValidationSchema),
  userController.login
);
userRouter.get("/profile", auth, userController.getProfile)


export default userRouter;
