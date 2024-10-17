import mongoose from "mongoose";

//creating schema for user data to be stored in MongoDB collections
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxlength: 30,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

//creating mongoose model 'User', after the creating of user schema
const User = mongoose.model("User", userSchema);
export default User; //exporting the 'User' model so it can be used in other parts of the application.
