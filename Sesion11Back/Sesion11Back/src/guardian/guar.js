const { verify } = require("jsonwebtoken");

const userguar = (req, res, next) => {
    const authorization = req.headers.authorization; //capturar cabecera del token
    if (!authorization) {
        next(JSON.stringify({
            estado: "error",
            msg: "No autorizado"
        }))
    }
    try {
        const token = authorization.split(' ')[1]
        const payload = verify(token, "misecreto");
        if (payload.rol != admin) {
            next(JSON.stringify({
                estado: "error",
                msg: "No rol autorizado"
            }))
        }

    } catch (e) {
        console.log(e);
    }
}

exports.userguar=userguar;