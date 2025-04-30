import mongoose from "mongoose"
const { Schema } = mongoose;


const Categoria = new Schema({
    nome: {type: String, require: true},
    slug: {type: String, require: true},
    date: {type: Date, default: Date.now()}
})

mongoose.model('categorias', Categoria)

export default Categoria