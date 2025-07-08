const palapaModel = require('../models/palapaModel')

function buscarTodo(req, res) {
    palapaModel.find({})
        .then(bebidas => {
            if (bebidas.length) {
                return res.status(200).send({ bebidas });
            }
            return res.status(204).send({ mensaje: "No hay nada que mostrar" })
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al solicitar la información ${e}` })})
}

module.exports={
    buscarTodo
}