import express from 'express';
const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send(`Hola, estoy aprendiendo express, ficha 3407181 programa ADSO`);
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});
