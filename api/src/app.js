require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');
const cookieParser = require('cookie-parser');
const logger = require ('./utils/logger');

const {FRONT_DOMAIN} = process.env;

const app = express();

//Middleware para analizar datos en formato JSON y configuraciones CORS
app.use(express.json({ limit: '10mb' }));

//Middleware para analizar cookies
app.use(cookieParser());

// Middleware para el registro de solicitudes en el entorno de desarrollo
app.use(morgan('dev'));

// Middleware para configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Configuración de rutas principales
app.use(mainRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => { 
logger.error(`Error: ${err.message}`);
const status = err.status || 500;
const message = err.message || 'Internal Server Error';
res.status(status).send(message);
});


module.exports = app;