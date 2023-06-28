import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access denied");

  const payloadToken = jwt.verify(
    token,
    process.env.TOKEN_SECRET_KEY ?? "tokentest"
  ) as IPayload;
  req.userId = payloadToken._id;

  next();
};
