import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../models/UserRequest";

export const registerUser = async (req: AuthRequest, res: Response) => {
  const { name, email, password, desiredJobTitle, aboutMe } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    desiredJobTitle,
    aboutMe,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      desiredJobTitle: user.desiredJobTitle,
      aboutMe: user.aboutMe,
      token: generateToken(user._id as string),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      desiredJobTitle: user.desiredJobTitle,
      aboutMe: user.aboutMe,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
