import express from "express";
import morgan from "morgan";
import router from "./routes/route";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use((req, _, next) => {
  if (req.headers["authorization"] === process.env.AUTH) {
    next();
  } else {
    throw "unauthorized";
  }
});

app.use("/api", router);

app.use("/isAlive", (_req, res) => {
  res.status(200).send("alive");
});

app.use("*", (_req, res) => {
  res.status(404).send("Invalid Route");
});

export default app;
