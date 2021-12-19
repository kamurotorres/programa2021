const express = require("express");
const app = express(); //app queda con todos los poderes de express
//Con app.get especificamos la ruta y el manejador de la ruta
//Esto se muestra en la ruta del navegador
// const { jugadores } = require('./datosJugadores');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
// const jugadores = require('./modelos/jugadormodelos');
const {jugadorrutas} = require ('./rutas/jugadorrutas');
const {usuariosrutas} = require ('./rutas/usuariosrutas');
//Apis
app.use("/jugadores", jugadorrutas);
app.use("/users", usuariosrutas);
require("dotenv").config();

//Conexión con la base de datos de mongo llamada jugadores
mongoose.connect(process.env.SERVER_DB_URL) //colombia es la base de datos
    .then(res => console.log("Conectado a base de datos"))
    .catch(error => console.log("Error al conectar", error))



app.get("/", function (req, res) {
    res.send("Holi");
});

app.listen(8080, function () {
    console.log("Estoy corriendo por el puerto 8080");
});
