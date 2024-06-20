const mongoose = require("mongoose");

//creating schema for user data to be stored in MongoDB collections
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamp: true,
  }
);

//creating mongoose model 'User', after the creating of user schema
const User = mongoose.model("User", userSchema);
module.exports = User; //exporting the 'User' model so it can be used in other parts of the application.
