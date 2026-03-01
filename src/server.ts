import express from "express";
import dotenv from "dotenv";
import transactionsRouter from "./routes/transaction.routes";
import connectDB from "./config/db";
import { errorMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(loggerMiddleware);

app.use("/api/transactions", transactionsRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on the port:http://localhost:${PORT}`);
});
