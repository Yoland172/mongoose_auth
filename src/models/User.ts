import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserModel extends Document<string> {
  name: string;
  email: string;
  password: string;
  desiredJobTitle?: string;
  aboutMe?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<UserModel> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  desiredJobTitle: {
    type: String,
    required: false
  },
  aboutMe: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre<UserModel>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
