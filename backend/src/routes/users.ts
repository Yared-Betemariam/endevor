import express, { Request, Response } from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";

import User from "../models/User";
import jwt from "jsonwebtoken";

router.post(
  "/register",
  [
    check("email", "email required").isEmail(),
    check("password", "password min length should be 6").isLength({ min: 6 }),
    check("username", "username required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const existingUser = await User.findOne({
        email: req.body.email,
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
