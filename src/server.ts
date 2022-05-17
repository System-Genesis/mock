import app from './app';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const start = () =>
  app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
  });

start();

export default start;
