import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import Account from "../models/account.model.js";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.status(200).json({
      balance: account.balance,
      message: "Account balance fetched successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching balance.",
      error: err.message,
    });
  }
});

export default router;
