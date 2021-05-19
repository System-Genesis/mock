import express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import service from "../service/service";

router.get("/generate", async (_: Request, res: Response) => {
  res.send(service.generate());
});

router.get("/getEightSocks", (req: Request, res: Response) => {
  res.send(service.eightSocks(req.query));
});

router.get("/getAkaTelephone", (req: Request, res: Response) => {
  res.send(service.akaTelephone(req.query));
});

router.get("/getAkaEmployees", (req: Request, res: Response) => {
  res.send(service.akaEmployees(req.query));
});

router.get("/getAkaImgMetaData", (req: Request, res: Response) => {
  res.send(service.akaImgMetaData(req.query));
});

router.get("/getAD/s", (req: Request, res: Response) => {
  res.send(service.aDs(req.query));
});

router.get("/getAD/NN", (req: Request, res: Response) => {
  res.send(service.aDNN(req.query));
});

router.get("/getCity", (req: Request, res: Response) => {
  res.send(service.city(req.query));
});

router.get("/getSf", (req: Request, res: Response) => {
  res.send(service.sf(req.query));
});

export default router;
