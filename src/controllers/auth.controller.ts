import { Request, Response } from "express";
import User, { IUser } from "../models/User";

import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  // saving a new user
  const { username, email, password } = req.body;

  const user: IUser = new User({
    username,
    email,
    password,
  });
  user.password = await user.encryptPassword(user.password);
  const userSaved = await user.save();

  // token
  const token: string = jwt.sign(
    { _id: userSaved._id },
    process.env.TOKEN_SECRET_KEY ?? "tokentest"
  );

  res.header("auth-token", token).json(userSaved);
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json("Bad credentials");

  const correctPassword: boolean = await user.verifyPassword(password);
  if (!correctPassword) return res.status(400).json("Invalid password");

  const token = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET_KEY ?? "tokentest",
    { expiresIn: 60 * 60 * 24 }
  );

  res.header("auth-token", token).json(user);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json("User not found");

  res.json(user);
};

export const testing = (req: Request, res: Response) => {
  res.json("private");
};
