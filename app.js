require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
//configurar para la lectura del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
//endpoint raiz
app.get("/", function(req, res){
  res.send('API Rest - Aprendices');
})

//endpoint para ver los datos del archivo
app.get("/api/aprendices", (req, res)=>{
  //datos vienen del archivo
  sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
    if (error){
      return res.json({Error: "No se puede leer los datos."})
    }
    const listaAprendices = JSON.parse(datos)
    res.json(listaAprendices)
  })
})

app.listen(PORT, () => {
  console.log(`Servidor en corriendo en el puerto: ${PORT}`);
});
