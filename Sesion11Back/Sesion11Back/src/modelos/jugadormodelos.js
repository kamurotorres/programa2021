const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const jugadoreSchema = new Schema({
    nombre: {
        type: "string",
        unique: true,
        required: true
    },
    posicion: {
        type: "string",
        required: true
    },
    numero: {
        type: "string",
        required: true
    }
});
const jugadormodelos = Mongoose.model("jugadores", jugadoreSchema);
exports.jugadormodelos = jugadormodelos;