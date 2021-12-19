const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ventajugadorSchema = new Schema({
    total: {
        type: "number",
        required: true
    },
    fecha: {
        type: "date",
        required: true,
        default: new Date
    },
    jugadores: {
        type: Schema.ObjectId,
        ref: "jugadores"
    },
    estado: {
        type: "number",
        required: true,
        default: 1
    }
});
const ventajugadormodelos = Mongoose.model("ventas", ventajugadorSchema);
exports.ventajugadormodelos = ventajugadormodelos;