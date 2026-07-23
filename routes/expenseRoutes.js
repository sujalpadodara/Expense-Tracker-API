import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getExpenses,
    getExpenseById,
    createExpense,
     updateExpense,
     deleteExpense,
     getTotalExpense,
     getCategorySummary,
     getMonthlySummary,

 } from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", verifyToken,getExpenses);
router.post("/",verifyToken,createExpense)
router.get("/summary/total", verifyToken, getTotalExpense);
router.get("/summary/category", verifyToken, getCategorySummary);
router.get("/summary/monthly", verifyToken, getMonthlySummary);
router.get("/:id", verifyToken,getExpenseById);
router.put("/:id",verifyToken,updateExpense)
router.delete("/:id",verifyToken,deleteExpense)


export default router;