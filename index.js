const express = require('express');
const path = require('path');
const config = require('./config/env');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.use('/', indexRoutes);

// Rutas de la API
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
  console.log(`📊 Calculadora de UVAs disponible en: http://localhost:${config.port}`);
  console.log(`🔌 API disponible en: http://localhost:${config.port}/api/valor`);
});
