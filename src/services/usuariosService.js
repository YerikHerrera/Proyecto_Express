//utilizar prisma
const ormPrisma = require("../config/conexion")
const listar = async () => {
    const datos = await ormPrisma.usuarios.findMany()
    return datos
}


const crear = async (email, username, clave, foto)=>{
    const userNew = await ormPrisma.usuarios.create({data:{
        email: email,
        username: username,
        clave: clave,
        foto: foto
    }})
    return userNew
}


const actualizar = async (id, email, username, clave, foto) => {
    const usuarioActualizado = await ormPrisma.usuarios.update({
        where: { id: Number(id) },
        data: {
            email: email,
            username: username,
            clave: clave,
            foto: foto
        }
    })
    return usuarioActualizado
}

const eliminar = async (id) => {
    const usuarioEliminado = await ormPrisma.usuarios.delete({
        where: { id: Number(id) }
    })
    return usuarioEliminado
}

const listarUsuario = async (id) => {
    const usuario = await ormPrisma.usuarios.findUnique({
        where: { id: Number(id) }
    })
    return usuario
}

module.exports = {listar, crear, actualizar, eliminar, listarUsuario}