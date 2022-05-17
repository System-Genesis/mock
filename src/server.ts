import app from "./app";
import gen from "./gen/gen";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = () =>
  app.listen(PORT, () => {
    gen();
    console.log("Listening on port: " + PORT);
  });

start();

export default start;
