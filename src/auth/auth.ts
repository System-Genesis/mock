import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

export const isAuth = async (
  req: Request,
  response: Response,
  next: NextFunction,
  myToken: string
) => {
  const errorRes = response.status(401).send('Unauthorized');

  const token = req.header('Authorization');
  const key = fs.readFileSync(path.join(__dirname, '../config/key.pem'));

  try {
    if (!token) return errorRes;

    const payload: any = jwt.verify(token, key.toString());

    if (!payload || payload.aud !== myToken) return errorRes;

    return next();
  } catch (err) {
    return next(err);
  }
};

export default { isAuth };
