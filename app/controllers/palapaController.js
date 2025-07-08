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

function agregar(req, res) {
   new palapaModel(req.body).save() // Se guarda el nuevo documento en la BD
   .then(info => {
      return res.status(200).send({
         mensaje: "La información se guardó con éxito",
         info
      });
   })
   .catch(e => {
      return res.status(404).send({
         mensaje: `Error al guardar la información: ${e}`
      });
   });
}




module.exports={
    buscarTodo,
    agregar
}