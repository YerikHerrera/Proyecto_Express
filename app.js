require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
//configurar para la lectura del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
//importar libreria para subir archivos
const multer = require("multer")


//middleware body-parse, formatea los datos enviados
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

//endpoint para crear aprendices
app.post("/api/aprendices", (req,res)=>{
  //validar que se envien los datos
  const nuevoAprendiz = req.body
  //utilizamos la lectura del archivo
  sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
    if (error){
      return res.json({Error: "No se puede leer los datos."})
    }
    const listaAprendices = JSON.parse(datos)
    //agregar el nuevo aprendiz
    listaAprendices.push(nuevoAprendiz)
    //escribir en el archivo
    sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error)=>{
      if(error){
        res.status(500).json({Error: "No se puede registrar el aprendiz."})
      }
      res.status(201).json({mensaje: "Aprendiz creado con exito."})
    })
  })
})

//El servidor en funcionamiento, la escucha
app.listen(PORT, () => {
  console.log(`SERVIDOR: http://localhost:${PORT}`);
});