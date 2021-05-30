import express = require("express");
import { Request, Response, NextFunction } from "express";
export const router = express.Router();
import eightSocks from "./eightSocks.route";
import akaEmployees from "./aka.route";
import ads from "./ads.route";
import adNn from "./adNn.route";
import city from "./city.route";
import sf from "./sf.route";
import gen, { checkForGenerate } from "../gen/gen";

router.post("/generate", async (_: Request, res: Response) => {
  await gen();

  res.send("<h1>New data has been successfully generated</h1>");
});

router.use(async (__: Request, _: Response, next: NextFunction) => {
  await checkForGenerate();
  next();
});

router.use("/eightSocks", eightSocks);
router.use("/aka", akaEmployees);
router.use("/aD/S", ads);
router.use("/aD/NN", adNn);
router.use("/city", city);
router.use("/sf", sf);

export default router;
