const express = require('express')
const router = express.Router()
const palapaController = require('../controllers/palapaController')

router.get('/bebidas', palapaController.buscarTodo)//Metodo get y abajo estará el metodo post    LISTA DE BEBIDAS
.post('/bebidas',palapaController.agregar)//AGREGA UNA BEBIDA NUEVA
.get('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.mostrarBebida)// Busca bebida y la muestra//BUSCA LA BEBIDA POR CLAVE/VALOR
.delete('/bebidas/:key/:value',palapaController.buscarBebida, palapaController.eliminarBebida)//Elimina
.put('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.actualizarBebida)//Actualiza




module.exports=router

