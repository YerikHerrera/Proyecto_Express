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
//importacion de middleware personales
const registroMiddleware = require("./middleware/registroMiddleware")
//importar validaciones
const {validarNombre, validarCorreo, generarId} = require("./utilidades/validaciones")
//configurar almacenamiento
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "misImagenes/")
  },
  filename: (req, file, cb)=>{
    const extensionArchivo = ruta.extname(file.originalname)
    cb(null, `${Date.now()}${extensionArchivo}`)
  }
})

const subirArchivo = multer({storage: almacenamiento})

//middleware body-parse, formatea los datos enviados
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleware creados, se ejecuta cada ves que hago una petición(GET, POST, PUT, DELETE)
app.use((req, res, next)=>{
  console.log(`tiempo milisegundos: ${Date.now()}`)
  console.log(`fecha: ${new Date().toISOString()}`)
  next()
})

app.use(registroMiddleware)

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
app.post("/api/aprendices", subirArchivo.single("imagen"), (req, res) => {

  const nuevoAprendiz = req.body;

  // Validar nombre
  if (!validarNombre(nuevoAprendiz.nombre)) {
    return res.status(400).json({
      Error: "El nombre debe tener mínimo 3 letras."
    });
  }

  // Validar correo
  if (!validarCorreo(nuevoAprendiz.correo)) {
    return res.status(400).json({
      Error: "El correo electrónico no es válido."
    });
  }

  // Generar ID automático
  nuevoAprendiz.id = generarId();

  // Agregar imagen
  nuevoAprendiz.imagen = req.file
    ? `/misImagenes/${req.file.filename}`
    : "Sin imagen";

  // Leer archivo JSON
  sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {

    if (error) {
      return res.status(500).json({
        Error: "No se puede leer los datos."
      });
    }

    const listaAprendices = JSON.parse(datos);

    // Agregar nuevo aprendiz
    listaAprendices.push(nuevoAprendiz);

    // Guardar información
    sistemaArchivo.writeFile(
      rutaArchivoJson,
      JSON.stringify(listaAprendices, null, 2),
      (error) => {

        if (error) {
          return res.status(500).json({
            Error: "No se puede registrar el aprendiz."
          });
        }

        res.status(201).json({
          mensaje: "Aprendiz creado con éxito.",
          aprendiz: nuevoAprendiz
        });
      }
    );
  });
});

//endpoint para modificar
app.put("/api/aprendices/:id", (req, res)=>{
  res.status(200).json({mensaje: "Endpoint en construccion de modificar."})
})
//endpoint para eliminar
app.delete("/api/aprendices/:id", (req, res)=>{
  res.status(200).json({mensaje: "Endpoint en construccion de eliminar."})
})

//El servidor en funcionamiento, la escucha
app.listen(PORT, () => {
  console.log(`SERVIDOR: http://localhost:${PORT}`);
});