//Conectar ao Atlas
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Database
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

// App
const app = express();



//chamar o Express, em seguida instanciamos a aplicação 
//na constante app e chamamos nossa primeira rota, a ’/’
// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

module.exports = app;