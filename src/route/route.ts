import express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import gen from "../gen/gen";
import utils from "../utils";

router.get("/generate", async (_: Request, res: Response) => {
  await gen();
  res.send("<h1>New data has been successfully generated</h1>");
});

router.get("/getEightSocks", (_: Request, res: Response) => {
  res.send(utils.readJson("./mockFiles/eightSocks.json"));
});

router.get("/getAkaTelephone", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/getAkaPhone.json"));
});

router.get("/getAkaEmployees", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/getAkaEmp.json"));
});

router.get("/getAkaImgMetaData", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/pictures.json"));
});

router.get("/getAD/s", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/AD.json"));
});

router.get("/getAD/NN", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/AD.json"));
});

router.get("/getCity", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/city.json"));
});

router.get("/getSf", (_: Request, res: Response) => {
  res.send(utils.readJson("../../mockFiles/sf.json"));
});

export default router;
