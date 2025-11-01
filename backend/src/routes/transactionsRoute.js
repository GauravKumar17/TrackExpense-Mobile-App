import express from "express";
const router = express.Router();
import { createTransaction, getTransactionsByUserId,deleteTransaction, getTransactionSummary } from "../controllers/transactionsController.js";

router.post("/",createTransaction)

router.get("/:user_id",getTransactionsByUserId);

router.delete("/:id",deleteTransaction);

router.get("/summary/:user_id",getTransactionSummary)

export default router;

