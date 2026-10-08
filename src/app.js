const express = require("express")

const miApp = express()

//mi aplicacion utiliza los middleware
miApp.use(express.json())
miApp.use(express.urlencoded({extended: true}))
//importar middleware propios

//ruta principal de mi api
miApp.get("/", (req,res)=>{
    res.send("Mi API REST ficha 3407181.")
})

module.exports = miApp
