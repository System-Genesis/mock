import express = require("express");
import { Request, Response } from "express";
import akaService from "../service/aka.service";
export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const result = akaService.all(req.query);

  if (result) res.send(result);
  else res.status(400).send(`didn't find data to send from aka`);
});

router.get("/personalNumber/:personalNumber", (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = akaService.byPersonalNumber(personalNumber);

  if (result) {
    res.send(result);
  } else {
    res
      .status(400)
      .send(
        `person with personalNumber: ${personalNumber} isn't exists in aka`
      );
  }
});

router.get("/identityCard/:identityCard", (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = akaService.byIdentityCard(identityCard);

  if (result) {
    res.send(result);
  } else {
    res
      .status(400)
      .send(`person with identityCard: ${identityCard} isn't exits in aka`);
  }
});

export default router;
