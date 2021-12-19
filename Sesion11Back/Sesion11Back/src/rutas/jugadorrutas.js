const { Router } = require('express');
const jugadorrutas = Router();
const { jugadormodelos } = require('../modelos/jugadormodelos');

jugadorrutas.post('/guardarjugador', function (req, res) {
    //1.capturar los datos
    const datos = req.body;
    console.log(datos);
    const jug = new jugadormodelos(datos);
    console.log(jug);
    jug.save(function (error) {
        if (error) {
            return res.status(401).send({
                estado: "error",
                msg: "jugador no guardado"
            })
        }
        return res.status(200).send({
            estado: "ok",
            msg: "jugador guardado",
            jug
        })
    })
});

jugadorrutas.post('/consultar', function (req, res) {
    //1. Capturar la información de la caja de texto nombre
    const { nombre } = req.body;
    //Buscar los jugadores
    jugadormodelos.findOne({ nombre }, function (error, jug) {
        if (error) {
            return res.status(401).send({
                estado: "error",
                msg: "jugador no encontrado"
            });
        }
        else {
            if (jug != null) {
                res.status(200).send({
                    estado: "ok",
                    msg: "jugador encontrado",
                    dato: jug
                });
            }
            else {
                res.status(401).send({
                    estado: "error",
                    msg: "jugador no encontrado"
                });
            }
        }

    })
    //Enviar respuesta al cliente teniendo en cuenta si se encontró o no

});

jugadorrutas.post('/editar', function (req, res) {
    const dato = req.body;
    console.log(dato.nombre, dato.posicion, dato.numero);
    if (dato.nombre !== null && dato.nombre !== "") {
        jugadormodelos.updateOne({ nombre: dato.nombre },
            { $set: { posicion: dato.posicion, numero: dato.numero } },
            function (error) {
                console.log(dato);
                console.log(dato.nombre);
                if (error) {
                    return res.status(401).send({
                        estado: "error",
                        msg: "jugador no editado"
                    });
                }
                console.log(dato.numero);
                return res.status(200).send({
                    estado: "ok",
                    msg: "jugador editado"
                });
            })
    }
});

jugadorrutas.post('/eliminar', function (req, res) {
    const { nombre } = req.body;
    jugadormodelos.deleteOne({ nombre }, function (error, jug) {
        if (error) {
            return res.status(401).send({
                estado: "error",
                msg: "jugador no encontrado"
            });
        }
        return res.status(200).send({
            estado: "ok",
            msg: "jugador eliminado"
        });
    })
});


exports.jugadorrutas = jugadorrutas;


// app.post("/editarjugador", function (req, res) {
//     const nom = req.body.nombre;
//     const num = req.body.numero;
//     const pos = req.body.posicion;

//     const j = {
//         nombre: nom,
//         numero: num,
//         posicion: pos
//     }
//     let i = 0;
//     for (const p of jugadores) {
//         if (p.nombre.toLowerCase() == nom.toLowerCase()) {
//             jugadores[i] = j;
//             break;
//         }
//         i++;
//     }
//     res.send({
//         status: "ok",
//         msg: "registro editado",
//         jugadores: jugadores
//     })
// });

// app.post("/eliminarjugador", function (req, res) {
//     const nom = req.body.nombre;

//     let i = 0;
//     for (const p of jugadores) {
//         if (p.nombre.toLowerCase() == nom.toLowerCase()) {
//             jugadores.splice(i, 1);
//             break;
//         }
//         i++;
//     }
//     res.send({
//         status: "ok",
//         msg: "registro eliminado",
//         jugadores: jugadores
//     })
// });


// app.get("/jugadores/:nombre", function (req, res) {
//     const jug = jugadores.find(j => j.nombre === req.params.nombre);
//     res.send(jug);
// });
