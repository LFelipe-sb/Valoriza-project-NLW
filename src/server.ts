import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  return res.status(200).send({message: "Trying first route."});
});

app.listen(3000, () => {
  console.log('Server is running');
});