import express from "express";
import transactionsRouter from "./routes/transaction.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/transactions", transactionsRouter);
app.use(errorMiddleware);

export default app;