import express from "express";
import dotenv from "dotenv";
import transactionsRouter from "./routes/transaction.routes";
import connectDB from "./config/db";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/transactions", transactionsRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on the port:http://localhost:${PORT}`);
});
