import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const register = asyncHandler ( async(req: Request, res: Response ) => {

  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  })
});


export const login = asyncHandler ( async(req: Request, res: Response ) => {

  const user = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: user,
  })
});