import { Router } from "express";
import * as transactionController from "./transaction.controller.js";
import auth from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import {
  createTransactionValidationSchema,
  updateTransactionValidationSchema,
} from "./transaction.validation.js";

const transactionRouter = Router();

transactionRouter.post(
  "/borrow",
  auth,
  validation(createTransactionValidationSchema),
  transactionController.borrowBook
);
transactionRouter.put(
  "/return/:id",
  auth,
  validation(updateTransactionValidationSchema),
  transactionController.returnBook
);
transactionRouter.get("/user", auth, transactionController.getUserTransactions);
transactionRouter.get("/all", auth, transactionController.getAllTransactions);
export default transactionRouter;
