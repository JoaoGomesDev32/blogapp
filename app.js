//Carregando módulos
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
const app = express();
import admin from './routes/admin.js';
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//const mongoose = require('mongoose');

//Configurações
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
//EM BREVE
//Public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

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