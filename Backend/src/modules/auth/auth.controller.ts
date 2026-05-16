import { Request, Response } from "express";
import { registerUser } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const register = asyncHandler ( async(req: Request, res: Response ) => {

  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  })
});