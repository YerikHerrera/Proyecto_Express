import express from 'express';
const app = express();
const puerto = process.env.PUERTO || 3030

app.get("/", function(req, res){
  res.send(`Hola, estoy aprendiendo express, ficha 3407181 programa ADSO`);
});

app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${puerto}`);
});
