const {Router} = require("express")
//necesita el controller
const { listarUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios, obtenerUsuario } = require("../controllers/usuariosController")
const enrutadorUsuario = new Router()

enrutadorUsuario.get("/listado", listarUsuarios)
enrutadorUsuario.get("/:id", obtenerUsuario)
enrutadorUsuario.post("/crear", crearUsuarios)
enrutadorUsuario.put("/actualizar/:id", actualizarUsuarios)
enrutadorUsuario.delete("/eliminar/:id", eliminarUsuarios)

module.exports = enrutadorUsuario