import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import {
  createBookValidationSchema,
  deleteBookValidationSchema,
  searchBookValidationSchema,
  updateBookValidationSchema,
} from "./book.validation.js";
import * as bookController from "./book.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const bookRouter = Router();

bookRouter.post(
  "/",
  auth,
  validation(createBookValidationSchema),
  bookController.createBook
);

bookRouter.put(
  "/:id",
  auth,
  validation(updateBookValidationSchema),
  bookController.updateBook
);
bookRouter.delete(
  "/:id",
  auth,
  validation(deleteBookValidationSchema),
  bookController.deleteBook
);
bookRouter.get(
  "/search",
  validation(searchBookValidationSchema),
  bookController.searchBook
);
export default bookRouter;
