import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

const errorRes = (res: Response) => res.status(401).send("Unauthorized");

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
  myToken: string
) => {
  const token = req.header("Authorization");
  const key = fs.readFileSync(path.join(__dirname, "../config/key.pem"));

  try {
    if (!token) return errorRes(res);

    const payload: any = jwt.verify(token, key.toString());

    if (!payload || payload.aud !== myToken) return errorRes(res);

    return next();
  } catch (err) {
    return next(err);
  }
};

export default { isAuth };
