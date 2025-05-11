import mongoose from "mongoose";
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true}
})

export default mongoose.model('usuarios', UsuarioSchema);