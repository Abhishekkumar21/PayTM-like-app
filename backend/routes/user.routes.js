import express from "express";
import z from "zod";
import User from "../models/user.model.js";
import JWT_TOKEN from "../config.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

//1. user SignUp route

// applying zod validation on incoming sigup data through the request body
const signupBody = z.object({
  username: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Email!",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email Already Exists!",
    });
  }

  const user = await User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_TOKEN
  );

  res.json({
    message: "user created successfully!",
    token: token,
  });
});

//2.user signin router

//Lets first do the zod validation for incoming signin data throught request body
const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
}); //validation done

router.get("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_TOKEN
    );

    res.json({
      token: token,
    });

    return;
  }

  res.json({ message: "Error while login!" });
});

//3.Route to update the user information -

//User should be allowed to 'optionally' send either or all of -
//
// lastName
// Wha password
// firstNametever they send, we need to update it in the database for the user.
// Use the middleware we defined in the last section to authenticate the user

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
router.put("/", async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating the information!",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully !",
  });
});

//4.Route to get users from backend, filterable by firstname/last - this is needed so users can search their friends and send them money

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstname: { $regex: filter } }, { lastname: { $regex: filter } }],
  });

  return res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      _id: user._id,
    })),
  });
});
export default router;
