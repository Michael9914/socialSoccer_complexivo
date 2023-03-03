require('dotenv').config();
var bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
var path = require ('path');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true } ))
app.use(bodyParser.json({ limit: '50mb', extended: true, parameterLimit: 500000 } ))
//app.use(cors({origin: true, credentials:true},{maxHttpHeaderSize:true}))
app.use(express.static(path.join(__dirname,'client')))


app.use('/public', express.static('public'));

var serveIndex2 = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/public',serveIndex2(__dirname + '/public'));


// Lectura y parseo del body
app.use( express.json() );

//verificacion de email 
var verificarRoutes = require('./controllers/verificarEmail');
var loginRoutes = require('./routes/login');
var imagenesRoutes = require('./routes/imagenes');
var uploadRoutes = require('./routes/upload');
var userRoutesdocumentos = require ('./routes/user.route');
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads',serveIndex(__dirname + '/uploads'));
// Base de datos
dbConnection();


// Rutas
app.use('/api', verificarRoutes);
app.use('/api/login', loginRoutes);
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/respondea', require('./routes/responder') );
/* Notification*/
app.use('/api/notification', require('./routes/notification') );
app.use( '/api/reforma', require('./routes/reforma') );
app.use('/api/upload',uploadRoutes); 
app.use('/api', userRoutesdocumentos);
app.use(require("./routes/user.routes"));



app.use('/api/img',imagenesRoutes);
app.listen( process.env.PORT, () => {
    console.log(chalk.bgYellow.black.bold('Servidor funcionando en el puerto :' + process.env.PORT));
});

