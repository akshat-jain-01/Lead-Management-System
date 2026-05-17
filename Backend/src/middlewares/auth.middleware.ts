import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/auth/user.model";
import { ApiError } from "../utils/ApiError";

export const authMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {

  const authHeader = req.headers.authorization;

  if ( !authHeader || !authHeader.startsWith("Bearer ") ) {

    return next(
      new ApiError( "Unauthorized access", 401 ));
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify( token, process.env.JWT_SECRET as string ) as jwt.JwtPayload;

  const user = await User.findById( decoded.id );

  if (!user) {

    return next(
      new ApiError( "User not found", 404 ));
  }

  req.user = user;

  next();

};