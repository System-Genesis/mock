import express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import dataType from "../types/dataType";

router.get("/getEightSocks", (_: Request, res: Response) => {
  const a = dataType.RANK[Math.floor(Math.random() * dataType.RANK.length)];

  res.send(a);
});

router.get("getAkaTelephone", (_: Request, res: Response) => {
  res.send("1");
});

router.get("getAkaEmployees", (_: Request, res: Response) => {
  res.send("1");
});

router.get("getAkaImgMetaData", (_: Request, res: Response) => {
  res.send("1");
});

router.get("getAD/s", (_: Request, res: Response) => {
  res.send("1");
});

router.get("getAD/NN", (_: Request, res: Response) => {
  res.send("1");
});

router.get("getCity", (_: Request, res: Response) => {
  res.send("1");
});

router.get("getSf", (_: Request, res: Response) => {
  res.send("1");
});

export default router;
