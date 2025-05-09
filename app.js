//Carregando módulos
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
const app = express();
import admin from './routes/admin.js';
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Configurações
//Session
app.use(session({
    secret: 'cursodenode',
    resave: true,
    saveUninitialized: true
}));
//Flash
app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Mongoose
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/blogapp', {
}).then(() => {
    console.log("Conectado ao banco de dados mongodb")
}).catch((err) => {
    console.log("Erro ao se conectar ao mongodb: ", err)
})
//Public
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
    console.log('Middleware de requisição!')
    next();
})

//Rotas
app.get('/', (req, res) => {
    res.send('Rota principal!');
});

app.get('/posts', (req, res) => {
    res.send('Lista de posts!');
});

app.use('/admin', admin);
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando!');
})