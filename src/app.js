

//Conectar ao Atlas
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//< Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//recuperamos a instância do mongoose para podermos manipular o que acontece em alguns momentos
const db = mongoose.connection;
 
//hora da conexão com o banco de dados (connected), 
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

//Erro
db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

//Usuário mata o processo
db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});
//<


// Load models
const Mentions = require('./models/mentions');


// Load routes
//chamar o Express, em seguida instanciamos a aplicação 
//na constante app e chamamos nossa primeira rota, a ’/’
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

//Rotas do mentions
const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);

module.exports = app;