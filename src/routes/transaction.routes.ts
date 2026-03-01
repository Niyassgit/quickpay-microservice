import express from "express";
import { getAllTransactions } from "../controller/transactions.controller";
const router = express.Router();


router.get("/", getAllTransactions);
router.get

export default router;
