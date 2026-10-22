const {Router} = require("express")
//necesita el controller
const listarUsuarios = require("../controllers/usuariosController")

const enrutadorUsuario = new Router()

enrutadorUsuario.get("/listado", listarUsuarios)
//enrutadorUsuario.get("/:id")
//enrutadorUsuario.post("/crear")
//enrutadorUsuario.put("/actualizar")
//enrutadorUsuario.delete("/eliminar")

module.exports = enrutadorUsuario