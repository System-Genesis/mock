import express = require('express');
import { Request, Response } from 'express';
import adNnService from '../service/ad.service';
import { isAuth } from './../auth/auth';
import token from './../config/auth.config';
export const router = express.Router();

router.use((req, res, next) => isAuth(req, res, next, token.audAdNn));

router.get('/', (req: Request, res: Response) => {
  const result = adNnService.all(req.query);

  if (result) res.send(result);
  else res.status(400).send(`didn't find data to send from ad/nn`);
});

router.get('/personalNumber/:personalNumber', (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = adNnService.byPersonalNumber(personalNumber);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with personalNumber: ${personalNumber} isn't exists in ad/nn`;
    res.status(400).send(msg);
  }
});

router.get('/identityCard/:identityCard', (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = adNnService.byIdentityCard(identityCard);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with identityCard: ${identityCard} isn't exists in ad/nn`;
    res.status(400).send(msg);
  }
});

router.get('/domainUser/:domainUser', (req: Request, res: Response) => {
  const domainUser = req.params.domainUser;

  const result = adNnService.byDomainUser(domainUser);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with domainUser: ${domainUser} isn't exists in ad/nn`;
    res.status(400).send(msg);
  }
});

export default router;
