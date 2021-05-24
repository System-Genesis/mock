import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { NextFunction, Request, response, Response } from 'express';

const errorRes = response.status(401).send('Unauthorized');

export const isAuth = async (
  req: Request,
  _: Response,
  next: NextFunction,
  myToken: string
) => {
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
