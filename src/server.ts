import app from "./app";

const PORT = process.env.PORT || 4000;

const start = () =>
  app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
  });

start();

export default start;
