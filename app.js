require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send('API Rest - Aprendices');
});

app.listen(PORT, () => {
  console.log(`Servidor en corriendo en el puerto: ${PORT}`);
});
