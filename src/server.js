import { rateLimit } from "express-rate-limit";
import connectToDatabase from "./database/connection.db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import bookRouter from "./modules/books/book.routes.js";
import transactionRouter from "./modules/transactions/transaction.routes.js";
import userRouter from "./modules/users/user.routes.js";
import helmet from "helmet";
import morgan from "morgan";



const runServer = ({ express, app }) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: (req, res, next) => {
      const error = new Error("Too many requests, please try again later.");
      error.statusCode = 429;
      next(error);
    },
  });
  // Middlewares
  app.use(express.json());
  app.use(limiter);
  app.use(helmet());
  app.use(morgan("common"));
  

  connectToDatabase();

  // Routes & Endpoints
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/books", bookRouter);
  app.use("/api/v1/transactions", transactionRouter);
  app.get("/", (req, res) =>
    res.json({ message: "Welcome to Route Library Management System 👋 !" })
  );

  app.use((req, res, next) => {
    const error = new Error("Invalid Url or Method");
    error.statusCode = 404;
    next(error);
  });

  // Error Middleware
  app.use(errorMiddleware);
};
export default runServer;
