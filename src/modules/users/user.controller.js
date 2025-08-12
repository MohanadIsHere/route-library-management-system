import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_SECRET_ADMIN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET_ADMIN,
  SALT_ROUNDS,
} from "../../config/env.js";
import User from "../../database/models/user.model.js";
import { compareData, hashData } from "../../utils/hashing/hashing.js";
import { generateToken } from "../../utils/token/token.js";

export const register = async (req, res, next) => {
  try {
    if (await User.findOne({ email: req.body?.email })) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = await hashData({
      plainText: req.body?.password,
      saltRounds: SALT_ROUNDS,
    });
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        user : {
name : user.name , email : user.email, role : user.role},
      },
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body?.email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await compareData({
      plainText: req.body?.password,
      hash: user?.password,
    });
    if (!isPasswordValid) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 400;
throw error
    }
    const accessToken = generateToken({
      payload: {
        email: user?.email,
        role: user?.role,
      },
      secret: user.role == "admin" ? JWT_ACCESS_TOKEN_SECRET_ADMIN : JWT_ACCESS_TOKEN_SECRET,
      options: { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN },
    });
    const refreshToken = generateToken({
      payload: {
        email: user?.email,
        role: user?.role,
      },
      secret:
        user.role == "admin"
          ? JWT_REFRESH_TOKEN_SECRET_ADMIN
          : JWT_REFRESH_TOKEN_SECRET,
      options: { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN },
    });

    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getProfile = async (req,res,next) => {
  try {
    const user = {
      name : req.user?.name,
      email : req.user?.email,
      role : req.user?.role
    }
    return res.status(200).json({message : "User profile retrieved successfully", data : {
      profile : user
    }})
  } catch (error) {
    next(error)
  }
}
