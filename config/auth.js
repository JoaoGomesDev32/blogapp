import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Usuario from '../models/Usuario.js';

const Passport = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        Usuario.findOne({ email: email }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe" });
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if (batem) {
                    return done(null, usuario); // Corrigido de "user" para "usuario"
                } else {
                    return done(null, false, { message: "Senha incorreta" });
                }
            });
        }).catch((err) => {
            return done(err);
        });
    }));

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id).then((usuario) => {
            done(null, usuario);
        }).catch((err) => {
            done(err, null);
        });
    });
};

export default Passport;