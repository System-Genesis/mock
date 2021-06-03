import express = require('express');
import { Request, Response, NextFunction } from 'express';
export const router = express.Router();
import eightSocks from './eightSocks.route';
import akaEmployees from './aka.route';
import ads from './ads.route';
import adNn from './adNn.route';
import city from './city.route';
import sf from './sf.route';
import gen, { checkForGenerate } from '../gen/gen';
import { createUserFun } from './../utils/utils';

router.post('/generate', async (req: Request, res: Response) => {
  const query = req.query;

  if (Object.keys(query).length === 0) {
    await gen();

    return res.send('<h1>New data has been successfully generated</h1>');
  }

  const users: any[] = [];

  Object.keys(createUserFun).forEach((ds) => {
    if (query[ds]) users.push(createUserFun[ds](users[0]));
  });

  return res.send(users);
});

router.use(async (__: Request, _: Response, next: NextFunction) => {
  await checkForGenerate();
  next();
});

router.use('/eightSocks', eightSocks);
router.use('/aka', akaEmployees);
router.use('/aD/S', ads);
router.use('/aD/NN', adNn);
router.use('/city', city);
router.use('/sf', sf);

export default router;
