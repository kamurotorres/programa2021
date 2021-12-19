const { Router } = require('express');
const usuariosrutas = Router();
const { usuariosmodelo } = require('../modelos/usuariosmodelo');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {userguar} = require('../guardian/guar');

usuariosrutas.post("/login", async function (req, res) {
    try {
        const { usuario, password } = req.body;
        console.log(usuario);
        const user = await usuariosmodelo.findOne({ usuario })
        console.log(user);
        if (!user) {
            return res.status(401).send({
                estado: "error",
                msg: "credenciales inválidas"
            });
        }
        const passok = await compare(password, user.password);
        console.log(passok);
        if (passok) {
            const token = sign({
                usuario:user.usuario,
                rol:user.rol
            },"misecreto")
            return res.status(200).send({
                estado: "ok",
                msg: "Logueado",
                token
            })
        } else {
            return res.status(401).send({
                estado: "error",
                msg: "credenciales pass inválidas"
            })
        }
    } catch (error) {
        console.log(error);

    }
})

usuariosrutas.post("/guardar", function (req, res) {
    const datos = req.body;
    const user = new usuariosmodelo(datos);
    console.log(user);
    user.save(function (error) {
        if (error) {
            return res.status(401).send({
                estado: "error",
                msg: "usuario no guardado"
            })
        }
        return res.status(200).send({
            estado: "ok",
            msg: "usuario guardado"
        })
})
})

exports.usuariosrutas = usuariosrutas;