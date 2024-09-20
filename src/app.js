const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./swagger');
const authRoutes = require('./routes/auth.routes');
const agenteRoutes = require('./routes/agente.routes');
const clienteRoutes = require('./routes/cliente.routes');
const polizaRoutes = require('./routes/poliza.routes');

const app = express();

// Middlewares
app.use(bodyParser.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/agentes', agenteRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/polizas', polizaRoutes);

module.exports = app;