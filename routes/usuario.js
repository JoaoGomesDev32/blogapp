import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Usuario from '../models/Usuario.js';
// const Usuario = mongoose.model("usuarios")
// const UsuarioSchema = mongoose.model('usuarios', Usuario.schema);

router.get('/registro', (req, res) => {
    res.render('usuarios/registro');
});

router.post('/registro', (req, res) => {
    var erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome inválido' });
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'Email inválido' });
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha inválida' });
    }

    if (req.body.senha.length < 4) {
        erros.push({ texto: 'Senha muito curta, mínimo 4 caracteres' });
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: 'As senhas são diferentes, tente novamente!' });
    }

    if (erros.length > 0) {
        res.render('usuarios/registro', { erros: erros });
    } else {
        // res.send('Tudo certo');
        res.send('Usuário registrado com sucesso!');
    }
});

export default router;