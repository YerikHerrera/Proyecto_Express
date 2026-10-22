const listar = require("../services/usuariosService")
const listarUsuarios = async(req, res)=>{
    try {
        const usuarios = await listar()
        res.status(200).json({usuarios})
    } catch (error) {
        res.status(500).json({"Error-mensaje": error.message})
    }
}

module.exports = listarUsuarios
