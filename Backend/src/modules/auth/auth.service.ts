import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { LoginInput, RegisterInput } from "./auth.types";
import { ApiError } from "../../utils/ApiError";

export const registerUser = async ( body: RegisterInput ) => {

  const existingUser = await User.findOne({ email: body.email });

  if (existingUser) {
    throw new ApiError("Email already in use", 400);
  }

  const hashedPassword = await bcrypt.hash(
    body.password,
    10
  );

  const user = await User.create({
    ...body,
    password: hashedPassword,
  });

  const token = jwt.sign({

      id: user._id,
      role: user.role,
    },

    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    });

const userObject = user.toObject();

const { password, ...safeUser } = userObject;

return {
  user: safeUser,
  token,
}
};



export const loginUser = async ( body: LoginInput ) => {

  const user = await User.findOne({ email: body.email }).select("+password");

  if (!user) {
    throw new ApiError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(body.password, user.password);

  if (!isMatch) {
    throw new ApiError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  const userObject = user.toObject();

  const { password, ...safeUser } = userObject;

  return {
    user: safeUser,
    token,
  };
};
