const { genSalt, hash } = require("bcrypt");
const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const usuariosSchema = new Schema({
    usuario: {
        type: "string",
        unique: true,
        required: true,
        max: 100
    },
    password: {
        type: "string",
        required: true
    },
    rol: {
        type: "string",
        required: true
    }
})
usuariosSchema.pre("save",async function(next){
    const salt = await genSalt(10);
    console.log(salt);
    this.password = await hash(this.password, salt);
    next();
})

const usuariosmodelo = Mongoose.model("users", usuariosSchema);
exports.usuariosmodelo = usuariosmodelo;