import { Request } from "express";
import { UserModel } from "./User";

export interface AuthRequest extends Request {
    user?: UserModel;
}