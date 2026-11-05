const { listar, crear, actualizar, eliminar, listarUsuario } = require("../services/usuariosService")
const listarUsuarios = async(req, res)=>{
    try {
        const usuarios = await listar()
        res.status(200).json({usuarios})
    } catch (error) {
        res.status(500).json({"Error-mensaje": error.message})
    }
}

const crearUsuarios = async(req, res)=>{
    try {
        const {email, username, clave, foto} = req.body
        const usuarios = await crear(email, username, clave, foto)
        res.status(201).json({ usuarioNuevo: usuarios })
    } catch (error) {
        res.status(500).json({"Error-mensaje": error.message})
    }
}

const actualizarUsuarios = async (req, res) => {
    try {
        const { id } = req.params
        const { email, username, clave, foto } = req.body

        const usuarioActualizado = await actualizar(id, email, username, clave, foto)

        res.status(200).json({ usuarioActualizado })
    } catch (error) {
        res.status(500).json({ "Error-mensaje": error.message })
    }
}

const eliminarUsuarios = async (req, res) => {
    try {
        const { id } = req.params

        const usuarioEliminado = await eliminar(id)

        res.status(200).json({ 
            mensaje: "Usuario eliminado correctamente",
            usuarioEliminado 
        })
    } catch (error) {
        res.status(500).json({ "Error-mensaje": error.message })
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params

        const usuario = await listarUsuario(id)

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }

        res.status(200).json({ usuario })
    } catch (error) {
        res.status(500).json({ "Error-mensaje": error.message })
    }
}

module.exports = { listarUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios, obtenerUsuario }