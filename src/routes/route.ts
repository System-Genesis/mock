import express = require("express");
import { Request, Response } from "express";
import service from "../service/service";
const router = express.Router();

router.get("/generate", async (_: Request, res: Response) => {
  res.send(service.generate());
});

router.get("/eightSocks", (req: Request, res: Response) => {
  res.send(service.eightSocks(req.query));
});

router.get("/akaEmployees", (req: Request, res: Response) => {
  res.send(service.akaEmployees(req.query));
});

router.get("/aD/s", (req: Request, res: Response) => {
  res.send(service.aDs(req.query));
});

router.get("/aD/NN", (req: Request, res: Response) => {
  res.send(service.aDNN(req.query));
});

router.get("/city", (req: Request, res: Response) => {
  res.send(service.city(req.query));
});

router.get("/getSf", (req: Request, res: Response) => {
  res.send(service.sf(req.query));
});

export default router;

// {
//   "mi": "534753856",
//   "telephone": "6313419",
//   "ktelephone": "57",
//   "telephoneType": 2
// },

// {
//   "firstName": "Salma",
//   "lastName": "Lesch",
//   "tz": "400152187",
//   "mi": "534753856",
//   "clearance": "3",
//   "rnk": "mega",
//   "nstype": "A",
//   "rld": "2024-10-02T00:03:26.944Z",
//   "hr": "ads5",
//   "birthday": "1996-07-26T13:55:23.884Z",
//   "sex": "f"
// },

// {
//   "personalNumber": "534753856",
//   "path": "8445484",
//   "format": "jpg",
//   "takenAt": "2012-11-07T03:22:57.710Z",
//   "createdAt": "2015-12-18T22:43:19.400Z",
//   "updatedAt": "2016-03-22T23:50:30.096Z"
// },
