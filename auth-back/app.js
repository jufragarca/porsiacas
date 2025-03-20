
// auth-back/app.js
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esta URL si tu frontend está en otra dirección
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permitir envío de cookies o credenciales
}));

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Middleware para registrar todas las solicitudes (útil para depuración)
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Importación de rutas
app.use('/api/login', require('./routes/login'));
app.use('/api/signup', require('./routes/signup'));
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/cargos', require('./routes/cargos'));
app.use('/api/jefes', require('./routes/jefes'));
app.use('/api/crearEmpleado', require('./routes/crearEmpleado'));
app.use('/api/actualizarEmpleados', require('./routes/actualizarEmpleados'));
app.use('/api/areas', require('./routes/areas'));
app.use('/api/cargosConsultaCrear', require('./routes/cargosConsultaCrear'));
app.use('/api/ListarCargos', require('./routes/ListarCargos'));
app.use('/api/ModificarCargos', require('./routes/ModificarCargos'));
app.use('/api/CrearArea', require('./routes/CrearArea'));
app.use('/api/ListarAreas', require('./routes/ListarAreas'));
app.use('/api/ModificarAreas', require('./routes/ModificarAreas'));
app.use('/api/LoginEmpleado', require('./routes/LoginEmpleado'));
app.use('/api/RecibeAudios', require('./routes/RecibeAudios'));
// 🔎 Borra caché antes de importar
const intermedioAudios = require('./routes/intermedioAudios');

console.log('Contenido de intermedioAudios:', intermedioAudios); // Verifica qué se importa

app.use('/api/intermedioAudios', intermedioAudios);






// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error detectado:', err.stack); // Mostrar el error en la consola
  res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta genérica para el cliente
});

// Inicialización del servidor
const PORT = 3001; // Puerto en el que se ejecutará el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
