const app = require('./app/app')
const config = require('./app/config/configuracion'); 
const conexion = require('./app/config/conexion')

conexion.connect()//cada metodo lleva parentecis asi como aqui, se llamo a connect y solo lo declaramos por asi decirlo


app.listen(config.PORT, ()=>{
    console.log(`Aplicacion corriendo en puerto ${config.PORT}`);
})