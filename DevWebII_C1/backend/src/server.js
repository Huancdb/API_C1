const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

const port = 3000;
const hostname = 'localhost';

const RoutesP = require('./routes/pessoa-routes');
const RoutesA = require('./routes/agendamento-routes');
const RoutesU = require('./routes/undSaude-routes');

app.use(RoutesP);
app.use(RoutesA);
app.use(RoutesU);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Huancdb:faesa123@cluster0.0nq7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', function() {
    console.log("Banco de Dados Mongo conectado com sucesso");
});


app.get('/', function(req, res){
    res.json({
        status: "ok",
        message: "Servidor rodando perfeitamente"
    });
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});