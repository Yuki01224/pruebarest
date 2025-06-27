const mongoose = require('mongoose') //mongoose facilita el uso de comandos de mongo :D
const config = require('./configuracion')

module.exports={
    connection : null,          //cuando entre siempre sera nulo
    connect : ()=>{             //Verifica la conexion
        if(this.connection)return this.connection     //retorena la conexion que hace mongoose       
        return mongoose.connect(config.DB) //esta declarado como config y no como CONGIG error de dedo pero asi lo dejamos
        .then(conn =>{              //Cunado existe dependencia sigie un metodo en este caso CONFIG.DB      Pide un algo, y con conn responde
            this.connection = conn  // se asigna un valor a
            console.log('la conexion se realizo con exito')
        })
        .catch(e => console.log('error en la conexion', e)) // si no escucha carch lo toma y lanza el mensaje
    }//todo es parte de connet y se exporta y ya 

}