import { Document } from "mongoose";

export type UserRole = "admin" | "sales";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}


export interface LoginInput {
  email: string;
  password: string;
}