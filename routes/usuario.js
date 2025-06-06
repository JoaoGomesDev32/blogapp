import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';
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
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Já existe uma conta com este e-mail")
                res.redirect("/usuarios/registro")
            } else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                    // eAdmin: 1
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect("/")
                        }

                        novoUsuario.senha = hash
                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error:msg", "Houve um erro ao criar o usuário, tente novamente")
                            res.redirect("/usuarios/registro")
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    }
});

router.get('/login', (req, res) => {
    res.render('usuarios/login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req, res, next)
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'Deslogado com sucesso!')
        res.redirect('/')
    })
})

export default router;