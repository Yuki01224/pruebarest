const express = require('express')
const router = express.Router()
const palapaController = require('../controllers/palapaController')

router.get('/bebidas', palapaController.buscarTodo)//Metodo get y abajo estará el metodo post
.post('/bebidas',palapaController.agregar)


module.exports=router

