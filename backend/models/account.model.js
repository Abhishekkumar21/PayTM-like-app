import mongoose from "mongoose";
import User from "./user.model.js";

// creating schema for Accounts
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // reference to Model: User
    ref: User,
    required: true,
  },
  balance: { type: Number, required: true },
});

//creating model w.r.t account schema

const Account = mongoose.model("Account", accountSchema);
export default Account;
