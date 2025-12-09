import express from 'express';

export default function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/', (req, res) => {
    res.send('Hello World');
  });

  return app;
}