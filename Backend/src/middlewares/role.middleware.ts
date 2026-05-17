import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";

export const roleMiddleware = (...roles: string[]) => ( req: Request, res: Response, next: NextFunction ) => {

    if (!req.user) {

      return next(
        new ApiError(
          "Unauthorized access",
          401
        )
      );

    }

    const userRole = req.user.role;

    if (
      !roles.includes(userRole)
    ) {

      return next(
        new ApiError(
          "Access denied",
          403
        )
      );

    }

    next();

  };