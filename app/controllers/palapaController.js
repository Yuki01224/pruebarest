const e = require('express');
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

//Entre las llaves siemore vienen con propiedad y atributo, con esto se busca un end poin

function buscarBebida(req, res, next) {//aqui se lleva la llave y el valor llave = kawama valor es 10 ejemplo
    if (!req.body)req.body={}
    let consulta = {}
    consulta[req.params.key] = req.params.value
    console.log(consulta)

    // No existe palapaModel.log(), esto probablemente sea un error
    // Si solo quieres mostrarlo, ya usaste console.log arriba

    palapaModel.find(consulta)
        .then(bebidas => {
            if (!bebidas.length) return next() // pasa al siguiente si no encontró nada
            req.body.bebidas = bebidas
            return next() // continúa con el siguiente middleware
        })
        .catch(e => {
            req.body.e = e
            return next() // pasa el error para que el siguiente middleware lo maneje
        });
}

function mostrarBebida(req, res) {
    if (req.body.e)
      return res.status(404).send({ mensaje: "Error al consultar la información" })

    if (!req.body.bebidas) 
      return res.status(204).send({mensaje: "no hay informacion que mostrar"})


   let bebidas = req.body.bebidas
      return res.status(200).send({bebidas})
}


function eliminarBebida(req, res) {
    var bebidas = {}
    bebidas = req.body.bebidas
    palapaModel.delateOne(bebidas[0])
    .them(inf =>{
        return res.status(200).send({mensaje:"Bebida Eliminada"})
    })
    .catch(e =>{
        return res.status(404).send({mensaje:"error al eliminar la bebida", e})
    })
}

function actualizarBebida(req, res) {
    if (!req.body || !req.body.bebidas || !req.body.bebidas.length) {
        return res.status(400).send({ mensaje: "No se encontró bebida para actualizar" }) 
    }

    const filtro = req.body.bebidas[0]
    const nuevosDatos = req.body

    palapaModel.updateOne(filtro, nuevosDatos)
        .then(info => {
            if (info.modifiedCount === 0) {
                return res.status(304).send({ mensaje: "No se realizaron cambios" })
            }
            return res.status(200).send({ mensaje: "Bebida actualizada con éxito", info })
        })
        .catch(e => {
            return res.status(500).send({ mensaje: `Error al actualizar: ${e}` })
        })
}



module.exports={
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}