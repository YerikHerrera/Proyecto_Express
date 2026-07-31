import express from 'express'
import {configDotenv} from "dotenv"

configDotenv()

const app = express();
const puerto = process.env.PUERTO || 3000

app.get("/", function(req, res){
  res.send(`Hola, estoy aprendiendo express, ficha 3407181 programa ADSO, 31 de julio`);
});

app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${puerto}`);
});
