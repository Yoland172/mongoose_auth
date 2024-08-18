import User from "../models/User";
import { AuthRequest } from "../models/UserRequest";
import { Response } from "express";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      desiredJobTitle: user.desiredJobTitle,
      aboutMe: user.aboutMe,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  const { name, desiredJobTitle, aboutMe } = req.body;

  try {
    const user = await User.findById(req.user!._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (desiredJobTitle) user.desiredJobTitle = desiredJobTitle;
    if (aboutMe) user.aboutMe = aboutMe;

    await user.save();

    res.json({
      message: "User profile updated successfully",
      user: {
        name: user.name,
        desiredJobTitle: user.desiredJobTitle,
        aboutMe: user.aboutMe,
        email: user.email,
      },
    });
  } catch (err) {
    console.error((err as any).message);
    res.status(500).send("Server error");
  }
};
